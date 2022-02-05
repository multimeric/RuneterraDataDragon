# RuneterraDataDragon

This is a small package for providing a JavaScript/TypeScript API for the [Runeterra Data Dragon](https://developer.riotgames.com/docs/lor), which is a static database of Runeterra card and image data.
Please note that this package only works in node.js environments, and will not work in the browser (sorry, I tried!)

## Features

* Detailed TypeScript types
* Caching layer to ensure you don't download duplicate files
* Async API
* Support for different locales and data versions
* Automatically tested

## Installation

```bash
npm install lor-data-dragon
```

## Usage

```typescript
import * as rune from "lor-data-dragon";

// Instantiate a client
const dd = new rune.DataDragon({
    cacheDir: "./testCache"
});

// Access to the per-set data
const setBundle = await dd.getLiteSetBundle(rune.Set.BeyondTheBandlewood, rune.Locale.English);
const cards: rune.Card[] = await setBundle.getCards();
const cardImage: Buffer = await setBundle.getCardImage(cards[0].cardCode)

// Access to the global game data
const bundle = await dd.getCoreBundle(rune.Locale.English);
const global: rune.GlobalData = await bundle.getGlobalData();
const regionImage: Buffer = await bundle.getRegionImage("bilgewater");
```

Additional methods and parameters are fully documented, and the use of TypeScript is strongly recommended to autocomplete all of these.

## Changelog

### 2.0.0

* Export renaming. You are now encouraged to `import * as rune from "lor-data-dragon";` namespace the exports sensibly
    * `LorDataDragon` renamed to `DataDragon`
    * `RuneterraSet` renamed to `Set`
* Reworked interface:
  * The `DataDragon` now returns wrapper objects which themselves can be used to fetch card/image data
