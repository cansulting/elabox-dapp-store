import Adm from "adm-zip"

const INFO = "info.json"

export function LoadZip(buf: Buffer) : Adm {
    const zip = new Adm(buf)
    return zip
}

export function ReadAsTextFromZip(zip: Adm, name: string): Promise<string> {
    return new Promise((res, rej) => {
        const entry = zip.getEntry(name)
        zip.readAsTextAsync(entry, (data, err) => {
            if (err) {
                rej(err)
                return
            }
            res(data)
        })

    })
}

export async function LoadPkgInfo(zip: Adm): Promise<any> {
    const info = await ReadAsTextFromZip(zip, INFO)
    return JSON.parse(info)
}