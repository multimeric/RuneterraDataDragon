import AdmZip from "adm-zip";

export interface ZipWrapperProps {
    zip: AdmZip
}

/**
 * Abstract class that wraps a zip file and can be used to retrieve blobs from it, with a helpful error message
 */
export abstract class ZipWrapper {
    props: ZipWrapperProps

    async getBuffer(path: string): Promise<Buffer> {
        const entry = this.props.zip.getEntry(path);
        if (!entry){
            throw new Error(`${path} could not be found in zip file!`);
        }
        return entry.getData();
    }

    protected constructor(props: ZipWrapperProps){
        this.props = props;
    }
}