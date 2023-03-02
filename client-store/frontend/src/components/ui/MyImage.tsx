import { identifyURL, UrlType } from "../../utils/url";
import { PackageInfo } from "../../data";
import IpfsImage from "./IpfsImage";

export const MyImage = (props:PackageInfo) => {
    const imageType = identifyURL(props.icon)
    return (
        <>
            {imageType === UrlType.IPFS && <IpfsImage
                ipfsPath={props.icon}
                alt={props.name}
                style={{ 
                    width: '100%', height: '100%', 
                    borderRadius: 10
                }}
            />}
            {imageType === UrlType.Http && <img
                src={props.icon}
                alt={props.name}
                style={{ 
                    width: '100px', 
                    borderRadius: 10
            }}
        />}
        </>
    )
}
