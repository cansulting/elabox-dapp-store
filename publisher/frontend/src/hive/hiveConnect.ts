
//import { Claims, DIDDocument, JWTHeader, JWTParserBuilder, VerifiablePresentation } from "@elastosfoundation/did-js-sdk"
import * as did from "@elastosfoundation/did-js-sdk"
//import { Vault, VaultSubscription, AppContext, AppContextProvider, DIDResolverAlreadySetupException, Backup, VaultInfo, AlreadyExistsException, NotFoundException } from "@elabox/hive-js-sdk"
import * as hive from "@elastosfoundation/hive-js-sdk"
//import "@elabox/hive-js-sdk"
import { DID as ConnDID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { HiveConfig } from "./hiveConfig"
import dayjs from "dayjs"
import { Claims, DefaultDIDAdapter, DIDBackend, VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { HIVE_CONFIG } from "../constants";
import { getCache, putCache } from "./cache";
//var hv = require("@elabox/hive-js-sdk")
const DID_CACHE_DIR = "/didstores"


export default class HiveConnect {
    static _vault : hive.Vault
    static _backup : hive.Backup
    static _config : HiveConfig 
    static _appContext : hive.AppContext
    static _didAccess : ConnDID.DIDAccess

    static async initialize(config? : HiveConfig) {
        if (HiveConnect._config)
            return
        if (!config)
            config = HIVE_CONFIG
        this._config = config
        await this._initAppContext()
        this._initVault()
        this._initBackup()
    }

    static async _initAppContext() {
        console.log("initializing App Context")
        DIDBackend.initialize(new DefaultDIDAdapter(this._config.resolverUrl));
        try {
            
            hive.AppContext.setupResolver(this._config.resolverUrl, DID_CACHE_DIR)
        } catch(e) {
           
            if (e instanceof hive.DIDResolverAlreadySetupException) {
                // silent error, it's ok
            }
            else {
                console.error("AppContext.setupResolver() exception:", e);
            }
        }
        this._didAccess = new ConnDID.DIDAccess()
        let didInfo = await this._didAccess.getExistingAppInstanceDIDInfo()
        let appIdCredentials : any = await this._didAccess.getExistingAppIdentityCredential()
        if (!appIdCredentials) {
            appIdCredentials = await this._generateAppIdCredential()
            if (!appIdCredentials) {
                throw new Error("Unable to generate App ID Credentials")
            }
        }
        console.log("APP ID CREDENTIALS", appIdCredentials)
        let appInstanceDid =  await this._didAccess.getOrCreateAppInstanceDID()
        let didDocument = await appInstanceDid.didStore.loadDid(appInstanceDid.did.toString())
        console.log("Generate DID Document", didDocument)
        let appContextProvider : hive.AppContextProvider = {
            getLocalDataDir: function (): string {
                return "/"
            },
            getAppInstanceDocument: function (): Promise<did.DIDDocument> {
                return Promise.resolve(didDocument)
            },
            getAuthorization: function (authenticationChallengeJWtCode: string): Promise<string> {
                /**
                 * Generates/Sign a JWT token needed by hive vaults to authenticate users and app.
                 * That JWT contains a verifiable presentation that contains server challenge info, and the app id credential
                 * issued by the end user earlier.
                 */
                return new Promise( async(resolve, reject) => {
                    try {
                        console.log("!!!!!!!!!!!!!!parse auth challenge", authenticationChallengeJWtCode)
                        let claims: did.Claims = (await new did.JWTParserBuilder()
                            .setAllowedClockSkewSeconds(300)
                            .build()
                            .parse(authenticationChallengeJWtCode))
                            .getBody();
                        let realm = claims.getIssuer() as string
                        let nonce = claims.get("nonce") as string
                        let builder = await did.VerifiablePresentation.createFor(appInstanceDid.did.toString(), null, appInstanceDid.didStore)
                        // generate presentation for jwtoken
                        console.log("!!!!!!!!!!!!!!building credentials", didInfo.storePassword)
                        let presentation = await builder.credentials(appIdCredentials)
                            .realm(realm)
                            .nonce(nonce)
                            .seal(didInfo.storePassword)
                        
                        if (!presentation) {     
                            reject("no presentation generated")
                            return
                        }  
                        // generate/sign jwttoken             
                        let jwtoken = await didDocument.jwtBuilder()
                            .addHeader(did.JWTHeader.TYPE, did.JWTHeader.JWT_TYPE)
                            .addHeader("version", "1.0")
                            .setSubject("DIDAuthResponse")
                            .setAudience(claims.getIssuer())
                            .setIssuedAt(dayjs().unix())
                            .setExpiration(dayjs().add(3, 'month').unix())
                            .setNotBefore(dayjs().unix())
                            .claimsWithJson("presentation", presentation.toString(true))
                            .sign(appInstanceDid.storePassword);
                        resolve(jwtoken)
                    }catch (e) {
                        reject(new Error("failed generating jwt token with error " + new String(e)))
                    }
                })
            }
        }
        console.log("building App context", this._config)
        this._appContext = await hive.AppContext.build(appContextProvider, this.getLastUserDID(), this._config.appId)
       
    }

    static _initVault() {
        console.log("!!!!init hive vault", this._config.providerAddress)
        this._vault = new hive.Vault(this._appContext, this._config.providerAddress)
        
        //  this._vault.getFilesService().list("/").then( files => {
        //     console.log("FILES", files)
        //  }).catch( err => {
        //     console.log("ERROR VAULT", err)
        //  })
    }

    static _initBackup() {
        this._backup = new hive.Backup(this._appContext, this._config.providerAddress)
    }

    static getLastUserDID(): string {
        const res = localStorage.getItem("userdid")
        if (res)
            return res
        return ""
    }

    static setLastUserDID(userDid: string) {
        localStorage.setItem("userdid", userDid)
    }

    static subscribeVault() : Promise<hive.VaultInfo> {
        return new Promise( async (resolve, reject) => {
            console.log("subscriving to vault")
            const vaultsub = new hive.VaultSubscription(this._appContext, this._config.providerAddress)
            let vaultinfo : any = null
            try {    
                vaultinfo = await vaultsub.subscribe()
            }
            catch (e) {
                if (e instanceof hive.AlreadyExistsException) {
                    console.log("Already exist")
                } else {
                    reject(e)
                    return
                }
            }
            resolve(vaultinfo)
        })
    }

    static async unsubcribeVault() {
        const vaultsub = new hive.VaultSubscription(this._appContext, this._config.providerAddress)
        try {    
            await vaultsub.unsubscribe()
        }
        catch (e) {
            if (e instanceof hive.NotFoundException) {
                throw "vault does not exist"
            } else {
                throw e
            }
        }
    }

    static _generateAppIdCredential(): Promise<VerifiableCredential | null> {
        // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-misused-promises
        return new Promise(async (resolve) => {
          let storedAppInstanceDID = await this._didAccess.getOrCreateAppInstanceDID();
          if (!storedAppInstanceDID) {
            resolve(null);
            return;
          }
    
          // No such credential, so we have to create one. Send an intent to get that from the did app
          console.log("hiveauthhelper", "Starting to generate a new App ID credential.");
    
          // Ask the identity wallet (eg: Essentials) to generate an app id credential.
          let didAccess = new ConnDID.DIDAccess();
          let appIdCredential = await didAccess.generateAppIdCredential();
    
          // Save this issued credential for later use.
          await storedAppInstanceDID.didStore.storeCredential(appIdCredential);
    
          // This generated credential must contain the following properties:
          // TODO: CHECK THAT THE RECEIVED CREDENTIAL CONTENT IS VALID
          // appInstanceDid
          // appDid
    
          resolve(appIdCredential);
        });
    }

    static async checkValid(jwtCode: string, expectationDid: string): Promise<string> {
        let claims: Claims;
        //const result = UnsecuredJWT.decode(token, this.options);
        //return new JWT(result.header, result.payload);
        try {
            claims = (await new did.JWTParserBuilder().setAllowedClockSkewSeconds(300).build().parse(jwtCode)).getBody();

            console.log("Claims->getExpiration(): " + (claims.getExpiration() * 1000 > Date.now()).toString());
            console.log("Claims->getAudience(): " + claims.getAudience() + ":" + expectationDid);
            console.log("is equal:" + (claims.getAudience() === expectationDid).toString());
        } catch (e) {
            console.log("ERROR ", e)
            throw new Error(`failed to parse jwt string: ${JSON.stringify(e)}`);
        }

        if (claims.getExpiration() * 1000 < Date.now()) {
            throw new Error('jwt string expired');
        }
        if (claims.getAudience() !== expectationDid) {
            //throw new Error(`jwt string with invalid audience: ${claims.getAudience()}, expected: ${expectationDid}`);
        }

        return jwtCode;
	} 

    static fileStat(path: string) {
        return this._vault.getFilesService().stat(path)
    }

    static async pathExist(path: string) {
        try {
            await HiveConnect.fileStat(path)
            return true
        }catch (err: any) {
            const errmsg = err.message
            //console.log("$$$$$$$$$$$$$$$$$$", errmsg.match(STORE_INFO_PATH + " does not exist").index)
            if (errmsg.match(path + " does not exist").index >= 0) {
                return false
            }
            throw err
        }
    }

    static async uploadBuffer(path: string, data: Buffer, callback?: (process: number) => void, useCache:boolean = false ) : Promise<string> {
        if (useCache) await putCache(data, path)
        return this._vault.getFilesService()
            .upload(path, data, callback, true, "public")
    }

    static async downloadBuffer(path: string, callback?: (process:number) => void, useCache:boolean = false) : Promise<Buffer> {
        if (useCache) {
            const buf = await getCache(path)
            if (buf !== null) return Buffer.from(buf)
        }
        if (!(await HiveConnect.pathExist(path)))
            return null
        const buf = await this._vault.getFilesService().download(path, callback)
        if (useCache) await putCache(buf, path)
        return buf
    }

    // return cid if successfull
    static uploadJson(path: string, data: {} ) : Promise<string> {
        return HiveConnect.uploadBuffer(path, Buffer.from(JSON.stringify(data)))
    }

    // @path: path to delete
    // @pathCheck: true check first before deleting to avoid issue
    static async deletePath(path: string) {
        if (!(await HiveConnect.pathExist(path)))
            return 
        return HiveConnect._vault.getFilesService().delete(path)
    }

    static downloadJson(path: string, defaultValue?: any ): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await HiveConnect.fileStat(path)
            }catch (err: any) {
                const errmsg = err.message
                //console.log("$$$$$$$$$$$$$$$$$$", errmsg.match(STORE_INFO_PATH + " does not exist").index)
                if (errmsg.match(path + " does not exist").index >= 0) {
                    resolve(defaultValue)
                    return
                }
                reject(err)
                return
            }
            const storeDataBuf = await HiveConnect.downloadBuffer(path)
            if (storeDataBuf.length === 0) {
                resolve(defaultValue)
                return
            }
            const parsed = JSON.parse( storeDataBuf.toString())
            resolve(parsed)
        })
    }
}