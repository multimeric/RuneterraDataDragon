# RuneterraDataDragon

This is a small package for providing a JavaScript/TypeScript API for the [Runeterra Data Dragon](https://developer.riotgames.com/docs/lor), which is a static database of Runeterra card and image data.
Please note that this package only works in node.js environments, and will not work in the browser (sorry, I tried!)

## Features

* Detailed TypeScript types
* Caching layer to ensure you don't download duplicate files
* Async API

## Installation

```bash
npm install lor-data-dragon
```

## Usage

```typescript
import {LorDataDragon, RuneterraSet, Card, GlobalData} from "lor-data-dragon";

// Instantiate a client
const dd = new LorDataDragon({
    cacheDir: "./testCache"
});

// High-level access to JSON data
const globalData: GlobalData = await dd.getGlobalData();
const setData: Card[] = await dd.getSetCards(RuneterraSet.RisingTides);

// Low-level access to the zip file
const cardImage: Buffer | undefined = (await dd.getSetBundle(RuneterraSet.BeyondTheBandlewood)).getEntry("en_us/img/cards/05BC004.png")?.getData();
const regionImage: Buffer | undefined = (await dd.getCoreBundle().getEntry("en_us/img/regions/icon-bilgewater.png"))?.getData();
```