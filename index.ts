import { JsonRpc, RpcError } from "eosjs";
import fetch from "node-fetch";
import { EosioTokenData, GetTransaction } from "./types";
import { Receipt } from "./types";
import { GetTicker } from "./types/coinmarketcap/getTicker";

// Typescript issues
const args: any = { fetch };

// Example issues
const endpoint = "https://eos.greymass.com";

/**
 * Get Receipt
 *
 * @param {string} id EOSIO Transaction ID
 * @param {string} [currency="USD"] FIAT Currency
 * @param {object} [options={}] Optional Parameters
 * @param {string} [options.endpoint] EOSIO endpoint API
 * @returns {Promise<Receipt | null>} Receipt JSON
 * @example
 *
 * const receipt = await getReceipt("b7bf...649f");
 */
export default async function getReceipt(id: string, currency = "USD", options: {
  endpoint?: string,
} = {}): Promise<Receipt | null> {
  const transfer = await getTokenTransfer(id, options);
  if (transfer) {
    const { block_num, block_time } = transfer;
    const { from, to, quantity, memo } = transfer.data;
    const { amount, symbol } = parseTokenString(quantity);
    const price = await getTickerPrice(symbol, currency);
    const value = amount * price;

    return {
      block_num,
      block_time,
      from,
      to,
      quantity,
      memo,
      amount,
      symbol,
      price,
      currency,
      value,
    };
  }
  return null;
}

/**
 * Get Ticker
 *
 * @param [options={}] Optional Parameters
 * @param [options.ticker=1765] Ticker
 * @param [options.structure="dictionary"] Specify the structure for the main data field.
 * Possible values are dictionary and array (default is dictionary).
 * @param [options.convert] return pricing info in terms of another currency.
 * @returns {Promise<GetTicker>} Coinmarketcap GetTicker
 * @example
 *
 * const ticker = await getTicker({ticker: 1765});
 */
export async function getTicker(options: {
  ticker?: number
  structure?: string,
  convert?: string,
} = {}): Promise<GetTicker> {
  const ticker = options.ticker || 1765;
  let url = `https://api.coinmarketcap.com/v2/ticker/${ticker}/?`;
  if (options.convert) { url += `convert=${options.convert}`; }
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

/**
 * Ticker Table
 */
export const tickerTable: {[symbol: string]: number} = {
  EOS: 1765,
};

/**
 * Get Ticker Price
 *
 * @param [symbol="EOS"] Ticker Symbol
 * @param [convert="USD"] Type of Currency
 * @returns {Promise<number>} Price of Ticker
 * @example
 *
 * const currency = await getTickerPrice("EOS", "USD");
 * //=> 4.7717692928
 */
export async function getTickerPrice(symbol = "EOS", convert = "USD") {
  const ticker = tickerTable[symbol];
  if (!ticker) { throw new Error("symbol not found"); }
  const value = await getTicker({ticker, convert});
  return value.data.quotes[convert].price;
}

/**
 * Get Transaction
 *
 * @param {string} id Transaction ID
 * @param {object} [options={}] Optional Parameters
 * @param {string} [options.endpoint] EOSIO endpoint API
 * @returns {Promise<GetTransaction>} EOSIO Transaction
 * @example
 *
 * const transaction = await getTransaction("b7bf...649f");
 */
export async function getTransaction<T = unknown>(id: string, options: {
  endpoint?: string,
} = {}): Promise<GetTransaction<T>> {
  const rpc = new JsonRpc(options.endpoint || endpoint, args);
  return await rpc.history_get_transaction(id);
}

/**
 * Get Token Transfer
 *
 * @param trx_id Transaction ID
 * @param {object} [options={}] Optional Parameters
 * @param {string} [options.api] EOSIO API
 * @returns {Promise<EosioTokenData>} EOSIO Token Data
 * @example
 *
 * const tokenTransfer = await getTokenTransfer("b7bf...649f");
 */
export async function getTokenTransfer(trx_id: string, options: {
  endpoint?: string,
} = {}) {
  const transaction = await getTransaction<EosioTokenData>(trx_id, options);
  const {block_num, block_time, trx} = transaction;
  let data: EosioTokenData | null = null;

  for (const action of trx.trx.actions) {
    data = action.data;
  }

  if (data) {
    return {
      block_num,
      block_time,
      data,
    };
  }
  return null;
}

/**
 * Parse Token String
 *
 * @private
 * @param {string} tokenString Token String (eg: "10.0 EOS")
 * @returns {object} Amount & Symbol
 * @example
 *
 * parseTokenString("10.0 EOS") //=> {amount: 10.0, symbol: "EOS"}
 */
export function parseTokenString(tokenString: string) {
    const [amountString, symbol] = tokenString.split(" ");
    const amount = parseFloat(amountString);
    return {amount, symbol};
}
