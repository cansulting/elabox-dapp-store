//import { ImageProps } from "react-bootstrap"
import { useState, useEffect } from 'react'
import { ImageProps, Image} from 'react-bootstrap'
import HiveConnect from '../hive/hiveConnect'
import BlankImage from '../assets/images/icon.png'

export interface IpfsImageProps {
    uploadEnable?: boolean                  // if enabled, this enables to change the image
    hivePath?: string                       // where the image reside to hive. when provided it will download and upload the file automatically
    onUploaded?: (ipfsCID:string) => void   // callback when image was uploaded to hive
}

function IpfsImage(props:IpfsImageProps & ImageProps & React.RefAttributes<HTMLImageElement>) {
    const [base64Str, setBase64Str] = useState("" as string)
    const [loadingFromHive, setLoadFromHive] = useState(false)
    let fileInput : any
    const setFile = async (file: File) => {
        if (!file) {
            setBase64Str("")
            return
        }
        const buf = await file.arrayBuffer()
        setBase64Str(Buffer.from(buf).toString("base64"))
        // if path provided, upload it to target path
        if (props.hivePath) {
            console.log("start uploading", props.hivePath)
            HiveConnect.uploadBuffer(
                props.hivePath, 
                Buffer.from(buf),
                (progres) => {
                    //console.log("Uploaidng", progres)
                },
                true)
                .then( cid => props.onUploaded && props.onUploaded(cid))
        }
    }
    const onLoadFile = (evnt: any) => {
        if (props.uploadEnable && fileInput) 
            fileInput.click()
    }
    useEffect( () => {
        // if no image yet has been loaded and hive path was provided, load image from hive
        if (!loadingFromHive /*&& !base64Str*/ && props.hivePath) {
            //console.log(props)
            setLoadFromHive(true)
            HiveConnect.downloadBuffer(props.hivePath, null, true)
                .then( buf => {
                    if (buf)
                        setBase64Str(buf.toString("base64"))
                    else    
                        setBase64Str("")
                })
                .catch( err => {
                    console.error("Failed loading image", err)
                })
                .finally( () => setLoadFromHive(false))
        }
    }, [props.hivePath])
    const str = base64Str === ""? BlankImage : "data:image/png;base64," + base64Str
    return (
        <>
        {props.uploadEnable && <input 
            ref={ ref => fileInput = ref} 
            multiple={false} 
            type="file" 
            onChange={evnt => setFile(evnt.target.files[0])} 
            hidden/>}
        <Image {...props} src={str} onClick={onLoadFile}/>
        </>
    )
}

export default IpfsImage