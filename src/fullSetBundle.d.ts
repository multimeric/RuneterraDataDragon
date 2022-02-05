/// <reference types="node" />
import { LiteSetBundle } from "./liteSetBundle";
export declare class FullSetBundle extends LiteSetBundle {
    /**
     * Returns a full (ie large) card image blob for the given card ID
     * @param cardCode Code for the card for which to return the image
     */
    getFullCardImage(cardCode: string): Promise<Buffer>;
}
