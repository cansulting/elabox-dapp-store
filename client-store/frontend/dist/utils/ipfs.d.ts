/// <reference types="node" />
export declare function upload(buf: Buffer): Promise<string>;
export declare function retrieve(ipfsUrl: string): Promise<Buffer>;
