import axios from "axios";
import * as config from "./config";
import { GetAccount, GetTableRows, GetTransaction } from "../types";

/**
 * Parse Token String
 *
 * @param {string} tokenString Token String (eg: "10.0 EOS")
 * @returns {object} Amount & Symbol
 * @example
 * parseTokenString("10.0 EOS") //=> {amount: 10.0, symbol: "EOS"}
 */
export function parseTokenString(tokenString: string) {
    const [amountString, symbol] = tokenString.split(" ");
    const amount = parseFloat(amountString);
    return {amount, symbol};
}

/**
 * Parse string to JSON
 * @param {string} str String
 * @returns {object} JSON
 * @example
 * parseJSON("{foo: 'bar'}") //=> {foo: "bar"}
 */
export function parseJSON(str: string | undefined): object {
    // Try to parse JSON
    if (str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return  {};
        }
    }
    return {};
}

/**
 * Get Account
 */
export async function getAccount(account_name: string, options: {
    maxRetries?: number,
    api?: string,
} = {}): Promise<GetAccount | null> {
    const maxRetries = options.maxRetries || 5;
    const api = options.api || config.EOSIO_API;
    const url = api + "/v1/chain/get_account";
    try {
        const {data} = await axios.post<GetAccount>(url, {account_name});
        return data;
    } catch (e) {
        console.error(e);
        if (maxRetries > 0) {
            return await getAccount(account_name, {maxRetries: maxRetries - 1});
        }
        return null;
    }
}

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
 * Get Table Rows
 *
 * @param {string} code Provide the smart contract name
 * @param {string} scope Provide the account name
 * @param {string} table Provide the table name
 * @param {object} [options={}] Optional parameters
 * @param {number} [options.lower_bound] Provide the lower bound
 * @param {number} [options.upper_bound] Provide the upper bound
 * @param {number} [options.limit] Provide the limit
 * @param {number} [options.api] EOSIO API
 * @returns {object} Table Rows
 */
export async function getTableRows<T = any>(code: string, scope: string, table: string, options: {
    lower_bound?: number,
    upper_bound?: number,
    limit?: number,
    api?: string,
} = {}) {
    const api = options.api || config.EOSIO_API;
    const url = api + "/v1/chain/get_table_rows";
    const params: any = {code, scope, table, json: true};

    // optional parameters
    if (options.lower_bound) { params.lower_bound = params.lower_bound; }
    if (options.upper_bound) { params.upper_bound = params.upper_bound; }
    if (options.limit) { params.limit = options.limit; }

    try {
        const {data} = await axios.post<GetTableRows<T>>(url, params);
        return data;
    } catch (e) {
        throw new Error(e);
    }
}

// (async () => {
//     const trx = await getTransaction("b7bf6f77fb8749652d8fd23eb10e5173e3eb4914ea91e81488f76f914a96649f");
//     console.log(JSON.stringify(trx, null, 4));
// })();