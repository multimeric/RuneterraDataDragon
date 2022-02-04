import {LiteSetBundle} from "./liteSetBundle";

export class FullSetBundle extends LiteSetBundle {
    /**
     * Returns a full (ie large) card image blob for the given card ID
     * @param cardCode Code for the card for which to return the image
     */
    async getFullCardImage(cardCode: number): Promise<Blob> {
        const blob = this.getBlob(`${this.props.locale}/img/cards/${cardCode}-full.png`);
        return JSON.parse(blob.toString());
    }
}