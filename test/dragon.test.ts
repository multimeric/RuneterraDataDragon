import * as rune from "../src";

const dd = new rune.DataDragon({
    cacheDir: "./testCache"
});

describe("liteSetBundle", () => {

    it("can fetch single card images", async () => {
        const bundle = await dd.getLiteSetBundle(rune.Set.BeyondTheBandlewood, rune.Locale.English);
        const image  = await bundle.getCardImage("05BC004");
        expect(image.length).toBeGreaterThan(1000);
    }, 100_000)

    it("can return an array of cards", async () => {
        const bundle = await dd.getLiteSetBundle(rune.Set.RisingTides, rune.Locale.English);
        const cards = await bundle.getCards();
        expect(cards.length).toBeGreaterThan(100);
        expect(cards[0]).toEqual({
                "associatedCards": [],
                "associatedCardRefs": [],
                "assets": [
                    {
                        "gameAbsolutePath": "http://dd.b.pvp.net/3_2_0/set2/en_us/img/cards/02PZ001.png",
                        "fullAbsolutePath": "http://dd.b.pvp.net/3_2_0/set2/en_us/img/cards/02PZ001-full.png"
                    }
                ],
                "regions": [
                    "Piltover & Zaun"
                ],
                "regionRefs": [
                    "PiltoverZaun"
                ],
                "attack": 1,
                "cost": 5,
                "health": 5,
                "description": "When I'm summoned, draw 1.\r\nThen, if you've played at least 10 other cards with different names, grant me +4|+0. <style=Variable></style>",
                "descriptionRaw": "When I'm summoned, draw 1.\r\nThen, if you've played at least 10 other cards with different names, grant me +4|+0. ",
                "levelupDescription": "",
                "levelupDescriptionRaw": "",
                "flavorText": "Nothing could stop his escape from those simpering humans. Not even a little water...",
                "artistName": "SIXMOREVODKA",
                "name": "Subpurrsible",
                "cardCode": "02PZ001",
                "keywords": [
                    "Elusive"
                ],
                "keywordRefs": [
                    "Elusive"
                ],
                "spellSpeed": "",
                "spellSpeedRef": "",
                "rarity": "EPIC",
                "rarityRef": "Epic",
                "subtypes": [],
                "supertype": "",
                "type": "Unit",
                "collectible": true,
                "set": "Set2"
            },
        );
    }, 100_000)
})

describe("coreBundle", () => {
    it("can fetch single region images", async () => {
        const bundle = await dd.getCoreBundle(rune.Locale.English);
        const regionImage = await bundle.getRegionImage("bilgewater");
        expect(regionImage.length).toBeGreaterThan(1000);
    }, 100_000)

    it("can fetch single set images", async () => {
        const bundle = await dd.getCoreBundle(rune.Locale.English);
        const regionImage = await bundle.getSetImage(rune.Set.CallOfTheMountain);
        expect(regionImage.length).toBeGreaterThan(1000);
    }, 100_000)

    it("can return global data", async () => {
        const bundle = await dd.getCoreBundle(rune.Locale.English);
        const global = await bundle.getGlobalData();
        expect(global.spellSpeeds.length).toEqual(3);
        expect(global.vocabTerms[0]).toEqual(
            {
                "description": "When you summon this, it gets its allegiance bonus if the top card of your deck matches its region.",
                "name": "Allegiance",
                "nameRef": "Allegiance"
            },
        )
    }, 100_000)
})
