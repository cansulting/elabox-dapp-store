import { create, IPFSHTTPClient } from 'ipfs-http-client'
import { IPFS_PEERS } from '../constants'
import { getCache, putCache } from './cache'

let ipfsClients : IPFSHTTPClient[] = null

function init() {
    if (ipfsClients) return
    ipfsClients = []
    for (const peer of IPFS_PEERS) {
        ipfsClients.push(create({url:peer}))
    }
}

export async function upload(buf: Buffer) :  Promise<string> {
    init()
    for (const client of ipfsClients) {
        try {
            const res = await client.add(buf)
            return res.cid.toString()
        }
        catch(err) {
            console.log("unable to connect to client")
        }
    }
    throw new Error("failed to upload file, unable to connect to clients")
}

export async function retrieve(ipfsUrl: string): Promise<Buffer> {
    // load from cache
    const buf = await getCache(ipfsUrl)
    if (buf) {
        return Buffer.from((buf))
    }
    // retrieve via http
    init()
    for (const client of ipfsClients) {
        try {
            //;console.log("TTTt", ipfsUrl)
            const outputs = client.cat(ipfsUrl)
            for await (const output of await outputs) {
                //console.log("####", output.buffer)
                await putCache(output.buffer, ipfsUrl)
                return Buffer.from(output.buffer)
            }
            return null
        } catch( err ) {
            console.warn("unable to connect to client",err)
        }
    }
    throw new Error("failed to retrieve " + ipfsUrl + ", unable to connect to clients")
}