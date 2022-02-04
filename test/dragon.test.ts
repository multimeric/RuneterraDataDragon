import {LorDataDragon, RuneterraSet} from "../src";

const dd = new LorDataDragon({
    cacheDir: "./testCache"
});

describe("getSetCards", () => {
    it("Should return an array of cards", async () => {
        const cards = await dd.getSetCards(2);
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

describe("getGlobalData", () => {
    it("Should return global data", async () => {
        const global = await dd.getGlobalData();
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

describe("getSetBundle", () => {
    it("can fetch single images", async () => {
        const image: Buffer | undefined = (await dd.getSetBundle(RuneterraSet.BeyondTheBandlewood)).getEntry("en_us/img/cards/05BC004.png")?.getData();
        expect(image).not.toBeUndefined();
    }, 100_000)
})

describe("getCoreBundle", () => {
    it("can fetch single images", async () => {
        const regionImage: Buffer | undefined = (await dd.getCoreBundle()).getEntry("en_us/img/regions/icon-bilgewater.png")?.getData();
        expect(regionImage).not.toBeUndefined();
    }, 100_000)
})
