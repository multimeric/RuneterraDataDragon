/// <reference types="node" />
import AdmZip from "adm-zip";
export interface ZipWrapperProps {
    zip: AdmZip;
}
/**
 * Abstract class that wraps a zip file and can be used to retrieve blobs from it, with a helpful error message
 */
export declare abstract class ZipWrapper {
    props: ZipWrapperProps;
    getBuffer(path: string): Promise<Buffer>;
    protected constructor(props: ZipWrapperProps);
}
