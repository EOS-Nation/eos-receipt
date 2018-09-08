import axios from "axios";
import * as config from "./config";
import { EosioTokenData, GetTransaction } from "../types";

/**
 * Get Transaction
 */
export async function getTransaction<T = unknown>(id: string, options: {
  api?: string,
} = {}): Promise<GetTransaction<T>> {
  const api = options.api || config.EOSIO_API;
  const url = api + "/v1/history/get_transaction";
  const {data} = await axios.post<GetTransaction<T>>(url, {id});
  return data;
}

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