"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const dd = new src_1.LorDataDragon({
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
        });
    }, 100000);
});
describe("getGlobalData", () => {
    it("Should return global data", async () => {
        const global = await dd.getGlobalData();
        expect(global.spellSpeeds.length).toEqual(3);
        expect(global.vocabTerms[0]).toEqual({
            "description": "When you summon this, it gets its allegiance bonus if the top card of your deck matches its region.",
            "name": "Allegiance",
            "nameRef": "Allegiance"
        });
    }, 100000);
});
describe("getSetBundle", () => {
    it("can fetch single images", async () => {
        var _a;
        const image = (_a = (await dd.getSetBundle(src_1.RuneterraSet.BeyondTheBandlewood)).getEntry("en_us/img/cards/05BC004.png")) === null || _a === void 0 ? void 0 : _a.getData();
        expect(image).not.toBeUndefined();
    }, 100000);
});
describe("getCoreBundle", () => {
    it("can fetch single images", async () => {
        var _a;
        const regionImage = (_a = (await dd.getCoreBundle()).getEntry("en_us/img/regions/icon-bilgewater.png")) === null || _a === void 0 ? void 0 : _a.getData();
        expect(regionImage).not.toBeUndefined();
    }, 100000);
});
