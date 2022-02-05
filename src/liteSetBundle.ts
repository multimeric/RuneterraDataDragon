import {Card, Locale, Set} from "./types";
import {ZipWrapper, ZipWrapperProps} from "./zipWrapper"

export interface SetBundleProps extends ZipWrapperProps {
    locale: Locale,
    set: Set
}

export class LiteSetBundle extends ZipWrapper {
    declare props: SetBundleProps
    constructor(props: SetBundleProps) {
        super(props);
    }

    /**
     * Returns a list of Card objects for a given set
     */
    async getCards(): Promise<Card[]> {
        const blob = await this.getBuffer(`${this.props.locale}/data/set${this.props.set}-${this.props.locale}.json`);
        return JSON.parse(blob.toString());
    }

    /**
     * Returns a card image blob for the given card ID
     * @param cardCode Code for the card for which to return the image
     */
    async getCardImage(cardCode: string): Promise<Buffer> {
        return this.getBuffer(`${this.props.locale}/img/cards/${cardCode}.png`);
    }
}
