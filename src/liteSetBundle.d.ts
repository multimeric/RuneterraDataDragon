/// <reference types="node" />
import { Card, Locale, Set } from "./types";
import { ZipWrapper, ZipWrapperProps } from "./zipWrapper";
export interface SetBundleProps extends ZipWrapperProps {
    locale: Locale;
    set: Set;
}
export declare class LiteSetBundle extends ZipWrapper {
    props: SetBundleProps;
    constructor(props: SetBundleProps);
    /**
     * Returns a list of Card objects for a given set
     */
    getCards(): Promise<Card[]>;
    /**
     * Returns a card image blob for the given card ID
     * @param cardCode Code for the card for which to return the image
     */
    getCardImage(cardCode: string): Promise<Buffer>;
}
