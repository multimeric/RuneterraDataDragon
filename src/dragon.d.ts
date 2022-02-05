/// <reference types="node" />
import { Locale, Set } from "./types";
import { CoreBundle } from "./coreBundle";
import { FullSetBundle } from "./fullSetBundle";
import { LiteSetBundle } from "./liteSetBundle";
interface DataDragonProps {
    /**
     * Directory in which to cache downloaded data
     */
    cacheDir?: string;
}
export declare class DataDragon {
    cacheDir: string | null;
    constructor(props: DataDragonProps);
    recoverFromCache(url: string): Promise<Buffer | null>;
    storeToCache(url: string, data: Buffer): Promise<any>;
    /**
     * Fetches a Buffer given a URL, caching if necessary
     * @param url The URL to fetch
     */
    getUrlBuffer(url: string): Promise<Buffer>;
    /**
     * Gets the zip file URL for a given set
     * @param set The set for which to find the URL
     * @param version The bundle version to use
     * @param lite If true, request the lite version of the zip file
     */
    static getSetUrl(set: Set, version?: string, lite?: boolean): string;
    /**
     * Returns an object representing a full set bundle
     * @param set The set for which to download data
     * @param locale The locale (language etc) for which to fetch the bundle
     * @param version The bundle version to use
     */
    getFullSetBundle(set: Set, locale: Locale, version?: string): Promise<FullSetBundle>;
    /**
     * Returns an object representing a lite set bundle
     * @param set The set for which to download data
     * @param locale The locale (language etc) for which to fetch the bundle
     * @param version The bundle version to use
     */
    getLiteSetBundle(set: Set, locale: Locale, version?: string): Promise<LiteSetBundle>;
    /**
     * Gets the URL for the core bundle
     */
    static getCoreUrl(locale: Locale, version?: string): string;
    /**
     * Downloads the core bundle and returns an object that can be used to access its contents
     * @param locale The locale (language etc) for which to fetch the bundle
     * @param version The bundle version to use. Defaults to the latest version.
     */
    getCoreBundle(locale: Locale, version?: string): Promise<CoreBundle>;
}
export {};
