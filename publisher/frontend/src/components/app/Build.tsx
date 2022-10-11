import { useRef, useState } from "react"
import { BuildProps } from "../../interfaces/build"


function Build(props:BuildProps) {
    const [selectedFile, setSelectedFile] = useState(null)
    //const fileInput = useRef(null)
    const onPressUpload = (evnt:any) => {
        //const selectedFile = evnt.target.files[0] as File
        //console.log("upload", selectedFile)
        if (selectedFile && props.onUpload) {
            const fr = new FileReader()
            fr.onload = (event) => {
                const buf = Buffer.from(event.target.result as ArrayBuffer)
                //console.log(buf)
                props.onUpload( buf)
            }
            fr.onerror = (err) => {
                console.error("failed loading file", err)
            }
            fr.readAsArrayBuffer(selectedFile)
        }
    }
    return (
        <div>
            <input
                type="file"
                //value={selectedFile}
                onChange={ (evnt) => {
                    setSelectedFile(evnt.target.files[0])
                }}
            />
            <button onClick={onPressUpload}>Upload</button>
        </div>
    )
}

export default Build