import { identifyURL, UrlType } from "src/utils/url";
import { PackageInfo } from "../../data";
import IpfsImage from "./IpfsImage";

export const MyImage = (props:PackageInfo) => {
    const imageType = identifyURL(props.icon)
    return (
        <div style={{ 
            width: '100%', height: '100%', 
            borderRadius: 10
        }}>
        {imageType === UrlType.IPFS && <IpfsImage
            ipfsPath={props.icon}
            alt={props.name}
        />}
        {imageType === UrlType.Http && <img
            src={props.icon}
            alt={props.name}
            style={{ 
            width: '150px', height: '150px', 
            borderRadius: 10
        }}
        />}
        </div>
    )
}
