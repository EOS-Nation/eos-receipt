export interface Receipt {
  block_num: number;
  block_time: string;
  from: string;
  to: string;
  quantity: string;
  memo: string;
  amount: number;
  symbol: string;
  price: number;
  currency: string;
  value: number;
}
