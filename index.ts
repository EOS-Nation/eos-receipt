import { getTickerPrice } from "./src/coinmarketcap";
import { getTokenTransfer } from "./src/eosio";
import { parseTokenString } from "./src/utils";
import { Receipt } from "./types";
export * from "./src/coinmarketcap";
export * from "./src/eosio";
export * from "./types";

/**
 * Get Receipt
 *
 * @param {string} id EOSIO Transaction ID
 * @param {string} [currency="USD"] FIAT Currency
 * @param {object} [options={}] Optional Parameters
 * @param {string} [options.api] EOSIO API
 * @returns {Promise<Receipt | null>} Receipt JSON
 * @example
 *
 * const receipt = await getReceipt("b7bf...649f");
 */
export default async function getReceipt(id: string, currency = "USD", options: {
  api?: string,
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
