
export interface BuildInfo {
    id: string;
    number : number;
    ipfsCID: string;
    minRuntime?: string;
    dependencies?: [string];
}