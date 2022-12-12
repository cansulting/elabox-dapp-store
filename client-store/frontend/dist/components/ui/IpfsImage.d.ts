/// <reference types="react" />
import { ImageProps } from 'react-bootstrap';
export interface IpfsImageProps {
    uploadEnable?: boolean;
    ipfsPath?: string;
    onUploaded?: (ipfsCID: string) => void;
}
declare function IpfsImage(props: IpfsImageProps & ImageProps & React.RefAttributes<HTMLImageElement>): JSX.Element;
export default IpfsImage;
