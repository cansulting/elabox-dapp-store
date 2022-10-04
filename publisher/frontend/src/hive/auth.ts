//import { VerifiableCredential } from '@elaboxfoundation/did-js-sdk';
import { connectivity, DID } from '@elastosfoundation/elastos-connectivity-sdk-js';
import { EssentialsConnector } from '@elastosfoundation/essentials-connector-client-browser';
import wait from "./wait"  

let instance : Auth;
console.log(connectivity)
export default class Auth {
    connector: any;
    static waiting = false

    _initConnector(appDid : string) {
        return new Promise( async (resolve, rej) => {
            console.log("initConnector")
            connectivity.setApplicationDID(appDid)
            let connectors = connectivity.getAvailableConnectors()
            if (connectors !== null && connectors.length > 0) 
                this.connector = connectors[0] as EssentialsConnector 
            else { 
                this.connector = new EssentialsConnector()
                await connectivity.registerConnector(this.connector).then(async () => {
                    const walletConnectProvider = this.connector.getWalletConnectProvider();
                    if (!walletConnectProvider.connected)
                        await walletConnectProvider.enable();
                });
            }
            console.log("Done")
            resolve(null)
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

    static async isConnected(appDid : string) : Promise<boolean> {
        const inst = await this.getInstance(appDid)
        return inst.connector.hasWalletConnectSession()
    }

    async signin() {
        if (this.connector.hasWalletConnectSession())
            await this.connector.disconnectWalletConnect()
        const didAccess = new DID.DIDAccess()
        
        try {
            const presentation = await didAccess.requestCredentials(
                {claims: [DID.simpleIdClaim("Activate elabox", "name", false)]}
            );
            return presentation
        } catch (error) {
            console.log(error);
            return null
        }
    }

    isConnected() : boolean {
        if (!this.connector)
            return false
        return this.connector.hasWalletConnectSession()
    }

    disconnectConnector() {
        if (this.connector) {
            
            this.connector.disconnectWalletConnect()
            this.connector = null
        }
    }
}