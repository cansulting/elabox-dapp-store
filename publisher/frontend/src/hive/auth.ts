//import { VerifiableCredential } from '@elaboxfoundation/did-js-sdk';
import { VerifiablePresentation } from '@elastosfoundation/did-js-sdk';
import { connectivity, DID } from '@elastosfoundation/elastos-connectivity-sdk-js';
import { EssentialsConnector } from '@elastosfoundation/essentials-connector-client-browser';
import { HIVE_CONFIG } from '../constants';
import wait from "./wait"  

let instance : Auth;
console.log(connectivity)
export default class Auth {
    connector: EssentialsConnector;
    static waiting = false

    _initConnector(appDid : string) {
        return new Promise( async (resolve, rej) => {
            console.log("initConnector", appDid)
            connectivity.setApplicationDID(appDid)
            let connector = connectivity.getActiveConnector()
            //console.log("CONNECTORS", connectors)
            if (connector !== null ) {
                this.connector = connector as EssentialsConnector
                resolve(null)
            } else { 
                //console.log("register connector")
                this.connector = new EssentialsConnector()
                await connectivity.registerConnector(this.connector).then(async () => {
                    console.log("lllll"," connector registered", this.connector.name)
                    const walletConnectProvider = this.connector.getWalletConnectProvider();
                    if (!walletConnectProvider.connected)
                        await walletConnectProvider.enable();
                    
                    resolve(null)
                });
            }
        })
        
    }

    static async getInstance(appDid : string ) : Promise<Auth> {
        if (this.waiting) {
            do {
                await wait(1)
            } while (this.waiting);
        }
        if (!instance) {
            instance = new Auth();
            this.waiting = true
            await instance._initConnector(appDid)
            this.waiting = false
        }
        return instance 
    }

    static async isConnected(appDid? : string) : Promise<boolean> {
        if (!appDid) 
            appDid = HIVE_CONFIG.appId
        const inst = await this.getInstance(appDid)
        return inst.connector.hasWalletConnectSession()
    }

    static async signin(appId: string) : Promise<VerifiablePresentation> {
        const inst = await this.getInstance(appId)
        if (inst.connector.hasWalletConnectSession())
            await inst.connector.disconnectWalletConnect()
        const didAccess = new DID.DIDAccess()
        
        try {
            const presentation = await didAccess.requestCredentials(
                {claims: [DID.simpleIdClaim("Activate elabox", "name", false)]}
            );
            return presentation
        } catch (error) {
            await inst.connector.disconnectWalletConnect()
            console.log(error);
            return null
        }
    }

    isConnected() : boolean {
        if (!this.connector)
            return false
        return this.connector.hasWalletConnectSession()
    }
    static async onConnected(callback : () => void) {
        // let timer : NodeJS.Timer
        // timer = setInterval(async () => {
 
            const connected = await Auth.isConnected(HIVE_CONFIG.appId)
            if (connected) {
                //clearInterval(timer)
                callback()
                return 
            }
        // }, 1000)
        // return timer
    }

    disconnectConnector() {
        if (this.connector) {
            
            this.connector.disconnectWalletConnect()
            this.connector = null
        }
    }
}