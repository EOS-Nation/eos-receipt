import axios from "axios";
import { EosioTokenData, GetTransaction } from "../types";
import { axiosConfig, EOSIO_API } from "./config";

/**
 * Get Transaction
 *
 * @param {string} id Transaction ID
 * @param {object} [options={}] Optional Parameters
 * @param {string} [options.api] EOSIO API
 * @returns {Promise<GetTransaction>} EOSIO Transaction
 * @example
 *
 * const transaction = await getTransaction("b7bf...649f");
 */
export async function getTransaction<T = unknown>(id: string, options: {
  api?: string,
} = {}): Promise<GetTransaction<T>> {
  const api = options.api || EOSIO_API;
  const url = api + "/v1/history/get_transaction";
  const {data} = await axios.post<GetTransaction<T>>(url, {id}, axiosConfig);
  return data;
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
  api?: string,
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
