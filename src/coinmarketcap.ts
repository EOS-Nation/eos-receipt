import axios from "axios";
import { GetTicker } from "../types/coinmarketcap/getTicker"

/**
 * Get Ticker
 *
 * @param [options={}] Optional Parameters
 * @param [options.ticker=1765] Ticker
 * @param [options.structure="dictionary"] Specify the structure for the main data field.
 * Possible values are dictionary and array (default is dictionary).
 * @param [options.convert] return pricing info in terms of another currency.
 */
export async function getTicker(options: {
  ticker?: number
  structure?: string,
  convert?: string,
} = {}) {
  const ticker = options.ticker || 1765;
  let url = `https://api.coinmarketcap.com/v2/ticker/${ticker}/?`;
  if (options.convert) url += `convert=${options.convert}`;
  const {data} = await axios.get<GetTicker>(url);
  return data;
}

/**
 * Ticker Table
 */
export const tickerTable: {[symbol: string]: number} = {
  EOS: 1765
}

/**
 * Get Ticker Price
 *
 * @param [symbol="EOS"] Ticker Symbol
 * @param [convert="USD"] Type of Currency
 * @example
 *
 * const currency = await getTickerPrice("EOS", "USD");
 * //=> 4.7717692928
 */
export async function getTickerPrice(symbol = "EOS", convert = "USD") {
  const ticker = tickerTable[symbol];
  if (!ticker) throw new Error("symbol not found");
  const value = await getTicker({ticker, convert});
  return value.data.quotes[convert].price;
}

// (async () => {
//   const price = await getTickerPrice("EOS", "CAD")
//   console.log(price);
// })()
