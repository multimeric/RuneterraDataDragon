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
     * The version of the core bundle to use. This can be a specific version such as `1.0.0`, or
     * it can be "latest" (the default)
     */
    coreVersion?: string,
    /**
     * An object that maps set numbers to versions. For example `{"5": "2.14.0"}` indicates to
     * use version 2.14 of "Beyond the Bandlewood"
     */
    setVersions?: Record<string, string>,
    /**
     * Directory in which to cache downloaded data
     */
    cacheDir?: string,

    /**
     * The locale (language etc.) to fetch data for
     */
    locale?: Locale
}

export class LorDataDragon {
    coreVersion: string
    setVersions: Record<string, string>
    cacheDir: string | null
    locale: Locale

    constructor(props: DataDragonProps) {
        this.coreVersion = props?.coreVersion || "latest";
        this.setVersions = props?.setVersions || {};
        this.cacheDir = props?.cacheDir || null;
        this.locale = props?.locale || Locale.English;
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
     * @param lite If true, request the lite version of the zip file
     */
    getSetUrl(set: Set, lite?: boolean): string {
        const setString = set.toString();
        const version = setString in this.setVersions ? this.setVersions[setString] : "latest";
        if (lite) {
            return `https://dd.b.pvp.net/${version}/set${set}-lite-en_us.zip`;
        }
        return `https://dd.b.pvp.net/${version}/set${set}-en_us.zip`;
    }

    /**
     * Returns an object representing a full set bundle
     * @param set The set for which to download data
     */
    async getFullSetBundle(set: Set): Promise<FullSetBundle> {
        const url = this.getSetUrl(set, false);
        const buff = await this.getUrlBuffer(url);
        return new FullSetBundle({
            zip: new AdmZip(buff),
            locale: this.locale,
            set: set
        })
    }

    /**
     * Returns an object representing a lite set bundle
     * @param set The set for which to download data
     */
    async getLiteSetBundle(set: Set): Promise<LiteSetBundle> {
        const url = this.getSetUrl(set, true);
        const buff = await this.getUrlBuffer(url);
        return new LiteSetBundle({
            zip: new AdmZip(buff),
            locale: this.locale,
            set: set
        })
    }

    /**
     * Gets the URL for the core bundle
     */
    getCoreUrl(): string {
        return `https://dd.b.pvp.net/${this.coreVersion}/core-${this.locale}.zip`;
    }

    /**
     * Returns the downloaded zip file
     */
    async getCoreBundle(): Promise<CoreBundle> {
        const url = this.getCoreUrl();
        const buff = await this.getUrlBuffer(url);
        return new CoreBundle({
            zip: new AdmZip(buff),
            locale: this.locale,
        });
    }

}