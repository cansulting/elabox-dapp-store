import { useEffect, useRef, useState } from "react"
import { FormLabel, ListGroup, Modal } from "react-bootstrap"
import { BuildInfo, BuildList } from "../../data/buildInfo"
import { PackageInfo } from "../../data/packageInfo"
import { useUtilState } from "../../states/utils"
import { LoadPkgInfo, LoadZip } from "../../utils/zip"

export interface BuildProps {
    info: PackageInfo
    retrieveBuilds: () => Promise<BuildList>
    onUpload: (buf:Buffer, packageInfo?: any) => void
}

// use to validate zip package
async function ValidatePackageFile(pkg: PackageInfo, buf: Buffer) : Promise<Object> {
    const zip = LoadZip(buf)
    const pkginfo = await LoadPkgInfo(zip)
    if (!pkginfo) 
        throw new Error("package file not found")
    if (!pkginfo.build || !pkginfo.packageId)
        throw new Error("unable to find correct package info")
    if (pkginfo.packageId !== pkg.id) {
        throw new Error("invalid package id")
    }
    return pkginfo
}

// display build list
function BuildListView(props:BuildProps) {
    const [builds, setBuilds] = useState(null as BuildList)
    const [selectedBuild, setSelectedBuild] = useState(null as BuildInfo)
    useEffect( () => {
        if (!builds) {
            props.retrieveBuilds().then( _builds => setBuilds(_builds))
        }
    }, [])
    const onView = (build: BuildInfo) => {
        setSelectedBuild(build)
    }
    //console.log(builds)
    return (
        <>
        <h2>Uploaded Builds</h2>
        {!builds && <p>No Uploads</p>}
        <ListGroup>
            {builds && Object.values(builds).map( (item) => (
                <ListGroup.Item action onClick={ _ => onView(item)}>
                    {"Build " + item.number}
                </ListGroup.Item>
            ))}
        </ListGroup>
        <Modal show={selectedBuild !== null} 
            onHide={ () => setSelectedBuild(null)}>
            {selectedBuild && <Modal.Header closeButton>
                <Modal.Title>{"Build " + selectedBuild.number}</Modal.Title>
            </Modal.Header>}
            {selectedBuild && <Modal.Body>
                <p><b>Build</b> {selectedBuild.number}</p>
                <p><b>IPFS CID</b> {selectedBuild.ipfsCID}</p>
            </Modal.Body>}
        </Modal>
        </>
    )
}

function Build(props:BuildProps) {
    const [selectedFile, setSelectedFile] = useState(null)
    const { addToast } = useUtilState()
    //const fileInput = useRef(null)
    const onPressUpload = (evnt:any) => {
        //const selectedFile = evnt.target.files[0] as File
        //console.log("upload", selectedFile)
        if (selectedFile && props.onUpload) {
            // load file
            const fr = new FileReader()
            fr.onload = (event) => {
                const buf = Buffer.from(event.target.result as ArrayBuffer)
                // validate as package and resolve request
                ValidatePackageFile(props.info, buf).then( pkginfo => {
                    //console.log(pkginfo)
                    props.onUpload( buf, pkginfo)
                }).catch( err => {
                    addToast(
                        "unable to upload package file, " + err.message, 
                        "Upload build failed", 
                        "danger")
                    console.error(err)
                })
            }
            fr.onerror = (err) => {
                addToast(
                    "unable to upload invalid package file", 
                    "Upload package failed", 
                    "danger")
            }
            fr.readAsArrayBuffer(selectedFile)
        }
    }
    return (
        <div>
            <BuildListView {...props} />
            <h2>New Build</h2>
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