import { getTransaction } from "./src/utils";
import { EosioTokenData } from "./types";

/**
 * Get Token Transfer
 *
 * @param trx_id Transaction ID
 *
 * @example
 *
 * const tokenTransfer = await getTokenTransfer("b7bf...649f");
 */
export async function getTokenTransfer(trx_id: string) {
  const transaction = await getTransaction<EosioTokenData>(trx_id);
  const {block_num, block_time, trx} = transaction;
  let data: EosioTokenData | null = null;

  for (const action of trx.trx.actions) {
    data = action.data;
  }

  if (data) {
    return {
      block_num,
      block_time,
      data
    }
  }
  return null;
}

/**
 * Get Currency
 *
 * @param quantity EOS Quantity
 * @param [currency="USD"] Type of Currency
 * @example
 *
 * const currency = await getCurrency("27.6406 EOS", "USD");
 */
export async function getCurrency(quantity: string, currency = "USD") {

}

(async () => {
  const tokenTransfer = await getTokenTransfer("b7bf6f77fb8749652d8fd23eb10e5173e3eb4914ea91e81488f76f914a96649f")

  if (tokenTransfer) {
    tokenTransfer.data
  }
  // console.log(receipt);
})()
