/// <reference types="node" />
import AdmZip from "adm-zip";
import { Card, GlobalData, Locale, RuneterraSet } from "./types";
interface DataDragonProps {
    /**
     * The version of the core bundle to use. This can be a specific version such as `1.0.0`, or
     * it can be "latest" (the default)
     */
    coreVersion?: string;
    /**
     * An object that maps set numbers to versions. For example `{"5": "2.14.0"}` indicates to
     * use version 2.14 of "Beyond the Bandlewood"
     */
    setVersions?: Record<string, string>;
    /**
     * Directory in which to cache downloaded data
     */
    cacheDir?: string;
    /**
     * The locale (language etc.) to fetch data for
     */
    locale?: Locale;
}
export declare class LorDataDragon {
    coreVersion: string;
    setVersions: Record<string, string>;
    cacheDir: string | null;
    locale: Locale;
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
     * @param lite If true, request the lite version of the zip file
     */
    getSetUrl(set: RuneterraSet, lite?: boolean): string;
    /**
     * Asynchronously returns an array of zipfile entries
     * @param set The set for which to download data
     * @param lite If true, return the lite bundle
     */
    getSetBundle(set: RuneterraSet, lite?: boolean): Promise<AdmZip>;
    /**
     * Returns a list of Card objects for a given set
     * @param setNumber The set index to query
     */
    getSetCards(setNumber: number): Promise<Card[]>;
    /**
     * Gets the URL for the core bundle
     */
    getCoreUrl(): string;
    /**
     * Returns the downloaded zip file
     */
    getCoreBundle(): Promise<AdmZip>;
    getGlobalData(): Promise<GlobalData>;
}
export {};
