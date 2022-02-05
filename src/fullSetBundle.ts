import {LiteSetBundle} from "./liteSetBundle";

export class FullSetBundle extends LiteSetBundle {
    /**
     * Returns a full (ie large) card image blob for the given card ID
     * @param cardCode Code for the card for which to return the image
     */
    async getFullCardImage(cardCode: string): Promise<Buffer> {
        return this.getBuffer(`${this.props.locale}/img/cards/${cardCode}-full.png`);
    }
}