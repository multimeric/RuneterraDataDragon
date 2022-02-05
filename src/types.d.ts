export declare enum Set {
    Foundations = 1,
    RisingTides = 2,
    CallOfTheMountain = 3,
    EmpiresOfTheAscended = 4,
    BeyondTheBandlewood = 5
}
export declare enum Locale {
    German = "de_de",
    English = "en_us",
    SpanishSpain = "es_es",
    SpanishMexico = "es_mx",
    French = "fr_fr",
    Italian = "it_it",
    Japanese = "ja_jp",
    Korean = "ko_kr",
    Polish = "pl_pl",
    Portuguese = "pt_br",
    Thai = "th_th",
    Turkish = "tr_tr",
    Russian = "ru_ru",
    Chinese = "zh_tw"
}
export interface Asset {
    gameAbsolutePath: string;
    fullAbsolutePath: string;
}
export declare enum Rarity {
    Common = "common",
    Rare = "rare",
    Epic = "epic",
    Champion = "champion"
}
export declare enum SpellSpeed {
    Burst = "burst",
    Fast = "fast",
    Slow = "slow",
    Focus = "focus"
}
export interface Card {
    associatedCards: any[];
    associatedCardRefs: string[];
    assets: Asset[];
    regions: string[];
    regionRefs: string[];
    attack: number;
    cost: number;
    health: number;
    description: string;
    descriptionRaw: string;
    levelUpDescription: string;
    levelUpDescriptionRaw: string;
    flavorText: string;
    artistName: string;
    name: string;
    cardCode: string;
    keywords: string[];
    keywordRefs: string[];
    spellSpeed: SpellSpeed;
    spellSpeedRef: SpellSpeed;
    rarity: Rarity;
    rarityRef: Rarity;
    subtypes: string[];
    supertype: string;
    type: string;
    collectible: boolean;
    set: string;
}
export interface GlobalEntry {
    name: string;
    nameRef: string;
}
export interface Keyword extends GlobalEntry {
    description: string;
}
export interface Region extends GlobalEntry {
    abbreviation: string;
    iconAbsolutePath: string;
}
export interface SetData extends GlobalEntry {
    iconAbsolutePath: string;
}
export interface GlobalData {
    vocabTerms: Keyword[];
    keywords: Keyword[];
    regions: Region[];
    spellSpeeds: GlobalEntry[];
    rarities: GlobalEntry[];
    sets: SetData;
}
