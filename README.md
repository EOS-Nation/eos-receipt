# EOS Receipt

[![Build Status](https://travis-ci.org/EOS-Nation/eos-receipt.svg?branch=master)](https://travis-ci.org/EOS-Nation/eos-receipt)
[![npm version](https://badge.fury.io/js/eos-receipt.svg)](https://badge.fury.io/js/eos-receipt)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/EOS-Nation/eos-receipt/master/LICENSE)

[EOSReceipt.io](https://eosreceipt.io) is where you can generate receipts for your EOS based crypto purchases.

> A collaboration of [EOS Tribe](https://eostribe.io) + [EOS Nation](https://www.eosnation.io) at the [2018 Wyoming Hackathon](https://wyominghackathon.devpost.com).

![image](https://user-images.githubusercontent.com/550895/45269259-194e3180-b448-11e8-8f00-ba8c08ad323b.png)

## Install

**npm**

```bash
$ yarn add eos-receipt
```

**web**

```html
<script src="https://wzrd.in/standalone/eos-receipt@latest"></script>
```

## Quickstart

```javascript
import eosReceipt from "eos-receipt";

(async () => {
    const receipt = await eosReceipt("31e684605dadf43894ef1bde2f59a5995dabf3e249ddf6f691a44f6641403566")
    // {
    //   block_num: 15393068,
    //   block_time: '2018-09-08T16:20:50.000',
    //   from: 'eosnationdon',
    //   to: 'giftexchange',
    //   quantity: '30.0000 EOS',
    //   memo: 'EOS Nation Community Engagement Fund to EOS Gift Exchange',
    //   amount: 30,
    //   symbol: 'EOS',
    //   price: 5.1286650606,
    //   currency: 'USD',
    //   value: 153.859951818
    // }
})();
```

## Related

-   [eos-receipt](https://github.com/eos-nation/eos-receipt) Javascript Library API
-   [eos-receipt-UI](https://github.com/EOSTribe/eos-receipt-UI) React UI Front-end

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [getReceipt](#getreceipt)
    -   [Parameters](#parameters)
    -   [Examples](#examples)
-   [getTicker](#getticker)
    -   [Parameters](#parameters-1)
    -   [Examples](#examples-1)
-   [tickerTable](#tickertable)
-   [getTickerPrice](#gettickerprice)
    -   [Parameters](#parameters-2)
    -   [Examples](#examples-2)
-   [getTransaction](#gettransaction)
    -   [Parameters](#parameters-3)
    -   [Examples](#examples-3)
-   [getTokenTransfer](#gettokentransfer)
    -   [Parameters](#parameters-4)
    -   [Examples](#examples-4)

### getReceipt

Get Receipt

#### Parameters

-   `id` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** EOSIO Transaction ID
-   `currency` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** FIAT Currency (optional, default `"USD"`)
-   `options` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional Parameters (optional, default `{}`)
    -   `options.endpoint` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** EOSIO endpoint API

#### Examples

```javascript
const receipt = await getReceipt("b7bf...649f");
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;(Receipt | null)>** Receipt JSON

### getTicker

Get Ticker

#### Parameters

-   `options`  Optional Parameters (optional, default `{}`)
    -   `options.ticker`  Ticker (optional, default `1765`)
    -   `options.structure`  Specify the structure for the main data field.
        Possible values are dictionary and array (default is dictionary). (optional, default `"dictionary"`)
    -   `options.convert`  return pricing info in terms of another currency.

#### Examples

```javascript
const ticker = await getTicker({ticker: 1765});
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;GetTicker>** Coinmarketcap GetTicker

### tickerTable

Ticker Table

### getTickerPrice

Get Ticker Price

#### Parameters

-   `symbol`  Ticker Symbol (optional, default `"EOS"`)
-   `convert`  Type of Currency (optional, default `"USD"`)

#### Examples

```javascript
const currency = await getTickerPrice("EOS", "USD");
//=> 4.7717692928
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** Price of Ticker

### getTransaction

Get Transaction

#### Parameters

-   `id` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Transaction ID
-   `options` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional Parameters (optional, default `{}`)
    -   `options.endpoint` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** EOSIO endpoint API

#### Examples

```javascript
const transaction = await getTransaction("b7bf...649f");
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;GetTransaction>** EOSIO Transaction

### getTokenTransfer

Get Token Transfer

#### Parameters

-   `trx_id`  Transaction ID
-   `options` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional Parameters (optional, default `{}`)
    -   `options.api` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** EOSIO API

#### Examples

```javascript
const tokenTransfer = await getTokenTransfer("b7bf...649f");
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;EosioTokenData>** EOSIO Token Data
