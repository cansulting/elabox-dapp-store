
const CACHE_NAME = "hive_cache"

export function isExpired(url: string): boolean {
    const val = localStorage.getItem(url)
    if (!val || val.length === 0) return false
    const expiration = parseInt(val, 10)
    if ( Date.now() >= expiration ) return true
    return false
}

export async function putCache(buf:ArrayBuffer, url: string) {
    const s = new Date(Date.now())
    s.setHours(s.getHours() + (24 * 3))
    //console.log("PUT CACHE")
    //s.setSeconds(s.getSeconds() + 30)
    localStorage.setItem(url, s.getTime().toString())
    const cac = await caches.open(CACHE_NAME)
    await cac.put(url, new Response(buf))
}

export async function getCache( url: string): Promise<ArrayBuffer> {
    if (isExpired(url)) {
        //console.log("CACHE EXPIRED")
        return null
    }
    const cac = await caches.open(CACHE_NAME)
    const res = await cac.match(url)
    if (!res)
        return null
    //console.log("CACHE RESTRIEVED")
    return await res.arrayBuffer()
}
