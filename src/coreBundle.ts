import {GlobalData, Locale, Region, Set} from "./types";
import {ZipWrapper, ZipWrapperProps} from "./zipWrapper"

export interface CoreBundleProps extends ZipWrapperProps {
    locale: Locale,
}

export class CoreBundle extends ZipWrapper {
    declare props: CoreBundleProps
    constructor(props: CoreBundleProps) {
        super(props);
    }

    /**
     * Gets a region image as a buffer
     * @param region Region name as a lower case string with no spaces, e.g. "shadowisles"
     */
    async getRegionImage(region: string): Promise<Buffer>{
        return this.getBuffer(`${this.props.locale}/img/regions/icon-${region}.png`);
    }

    /**
     * Gets a set image as a buffer
     * @param set Set for which to fetch the icon
     */
    async getSetImage(set: Set): Promise<Buffer>{
        return this.getBuffer(`${this.props.locale}/img/sets/set${set}.png`);
    }

    /**
     * Get the core JSON data
     */
    async getGlobalData(): Promise<GlobalData> {
        const blob = await this.getBuffer(`${this.props.locale}/data/globals-${this.props.locale}.json`);
        return JSON.parse(blob.toString());
    }
}