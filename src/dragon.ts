import fetch from 'cross-fetch';
import AdmZip from "adm-zip";
import {Locale, Set} from "./types";
import {URL} from "url";
import * as path from "path";
import * as fs from "fs/promises";
import {CoreBundle} from "./coreBundle";
import {FullSetBundle} from "./fullSetBundle";
import {LiteSetBundle} from "./liteSetBundle";

interface DataDragonProps {
    /**
     * Directory in which to cache downloaded data
     */
    cacheDir?: string,
}

export class DataDragon {
    cacheDir: string | null

    constructor(props: DataDragonProps) {
        this.cacheDir = props?.cacheDir || null;
    }

    async recoverFromCache(url: string): Promise<Buffer | null> {
        if (!this.cacheDir) {
            return null;
        }
        const pathname = new URL(url).pathname;
        const filepath = path.join(this.cacheDir, pathname);
        const dirname = path.dirname(filepath);

        await fs.mkdir(dirname, {recursive: true});
        try {
            return await fs.readFile(filepath);
        } catch {
            return null;
        }
    }

    async storeToCache(url: string, data: Buffer): Promise<any> {
        if (!this.cacheDir) {
            return;
        }
        const pathname = new URL(url).pathname;
        const filepath = path.join(this.cacheDir, pathname);
        return await fs.writeFile(filepath, data);
    }

    /**
     * Fetches a Buffer given a URL, caching if necessary
     * @param url The URL to fetch
     */
    async getUrlBuffer(url: string): Promise<Buffer> {
        let buff;
        const cached = await this.recoverFromCache(url);
        if (cached) {
            return cached;
        } else {
            // Request the zip if we don't have it
            const res = await fetch(url);
            const arr = await res.arrayBuffer();
            buff = Buffer.from(new Uint8Array(arr));
        }

        if (this.cacheDir) {
            await this.storeToCache(url, buff);
        }

        return buff;
    }

    /**
     * Gets the zip file URL for a given set
     * @param set The set for which to find the URL
     * @param version The bundle version to use
     * @param lite If true, request the lite version of the zip file
     */
    static getSetUrl(set: Set, version?: string, lite?: boolean): string {
        version = version || "latest";
        if (lite) {
            return `https://dd.b.pvp.net/${version}/set${set}-lite-en_us.zip`;
        }
        return `https://dd.b.pvp.net/${version}/set${set}-en_us.zip`;
    }

    /**
     * Returns an object representing a full set bundle
     * @param set The set for which to download data
     * @param locale The locale (language etc) for which to fetch the bundle
     * @param version The bundle version to use
     */
    async getFullSetBundle(set: Set, locale:Locale, version?: string): Promise<FullSetBundle> {
        const url = DataDragon.getSetUrl(set, version, false);
        const buff = await this.getUrlBuffer(url);
        return new FullSetBundle({
            zip: new AdmZip(buff),
            locale: locale,
            set: set
        })
    }

    /**
     * Returns an object representing a lite set bundle
     * @param set The set for which to download data
     * @param locale The locale (language etc) for which to fetch the bundle
     * @param version The bundle version to use
     */
    async getLiteSetBundle(set: Set, locale:Locale, version? : string): Promise<LiteSetBundle> {
        const url = DataDragon.getSetUrl(set,  version, true);
        const buff = await this.getUrlBuffer(url);
        return new LiteSetBundle({
            zip: new AdmZip(buff),
            locale: locale,
            set: set
        })
    }

    /**
     * Gets the URL for the core bundle
     */
    static getCoreUrl(locale: Locale, version?: string): string {
        version = version || "latest";
        return `https://dd.b.pvp.net/${version}/core-${locale}.zip`;
    }

    /**
     * Downloads the core bundle and returns an object that can be used to access its contents
     * @param locale The locale (language etc) for which to fetch the bundle
     * @param version The bundle version to use. Defaults to the latest version.
     */
    async getCoreBundle(locale: Locale, version?: string): Promise<CoreBundle> {
        const url = DataDragon.getCoreUrl(locale, version);
        const buff = await this.getUrlBuffer(url);
        return new CoreBundle({
            zip: new AdmZip(buff),
            locale: locale,
        });
    }

}