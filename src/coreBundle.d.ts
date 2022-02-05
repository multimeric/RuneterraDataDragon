/// <reference types="node" />
import { GlobalData, Locale, Set } from "./types";
import { ZipWrapper, ZipWrapperProps } from "./zipWrapper";
export interface CoreBundleProps extends ZipWrapperProps {
    locale: Locale;
}
export declare class CoreBundle extends ZipWrapper {
    props: CoreBundleProps;
    constructor(props: CoreBundleProps);
    /**
     * Gets a region image as a buffer
     * @param region Region name as a lower case string with no spaces, e.g. "shadowisles"
     */
    getRegionImage(region: string): Promise<Buffer>;
    /**
     * Gets a set image as a buffer
     * @param set Set for which to fetch the icon
     */
    getSetImage(set: Set): Promise<Buffer>;
    /**
     * Get the core JSON data
     */
    getGlobalData(): Promise<GlobalData>;
}
