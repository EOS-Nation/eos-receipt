import { getTokenTransfer } from "./src/eosio";
import { parseTokenString } from "./src/utils";
import { getTickerPrice } from "./src/coinmarketcap";
export * from "./src/coinmarketcap";
export * from "./src/eosio";

export interface Receipt {
  block_num: number,
  block_time: string,
  from: string,
  to: string,
  quantity: string,
  memo: string,
  amount: number,
  symbol: string,
  price: number,
  currency: string,
  value: number,
}

/**
 * Get Receipt
 *
 * @param id EOSIO Transaction ID
 * @param currency Currency
 * @example
 *
 * const receipt = await getReceipt("b7bf...649f");
 */
export default async function getReceipt(id: string, currency = "USD"): Promise<Receipt | null> {
  const transfer = await getTokenTransfer(id);
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
      value
    }
  }
  return null;
}
