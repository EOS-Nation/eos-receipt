import axios from "axios";
import { GetTicker } from "../types/coinmarketcap/getTicker"

/**
 * Get Ticker
 *
 * @param [ticker=1765] Ticker
 * @param [options={}] Optional Parameters
 * @param [options.structure="dictionary"] Specify the structure for the main data field.
 * Possible values are dictionary and array (default is dictionary).
 * @param [options.convert] return pricing info in terms of another currency.
 */
export async function getTicker(ticker = 1765, options: {
  structure?: string,
  convert?: string,
} = {}) {
  let url = `https://api.coinmarketcap.com/v2/ticker/${ticker}/`
  if (options.convert) url += `convert=${options.convert}`
  const {data} = await axios.get<GetTicker>(url);
  return data;
}

(async () => {
  const ticker = await getTicker()
  console.log(ticker);
})()