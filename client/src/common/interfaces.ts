export type CurrencyContextType = {
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
};

export interface Transaction {
  block_id: number;
  id: number;
  hash: string;
  date: string;
  time: string;
  size: number;
  weight: number;
  version: number;
  lock_time: number;
  is_coinbase: boolean;
  has_witness: boolean;
  input_count: number;
  output_count: number;
  input_total: number;
  input_total_usd: number;
  output_total: number;
  output_total_usd: number;
  fee: number;
  fee_usd: number;
  fee_per_kb: number;
  fee_per_kb_usd: number;
  fee_per_kwu: number;
  fee_per_kwu_usd: number;
  cdd_total: number;
  is_rbf: boolean;
}

export interface Context {
  code: number;
  source: string;
  results: number;
  state: number;
  market_price_usd: number;
  cache: any;
  api: any;
  servers: string;
  time: number;
  render_time: number;
  full_time: number;
  request_cost: number;
}

export interface Address {
  type: string;
  script_hex: string;
  balance: number;
  balance_usd: number;
  received: number;
  received_usd: number;
  spent: number;
  spent_usd: number;
  output_count: number;
  unspent_output_count: number;
  first_seen_receiving: Date;
  last_seen_receiving: Date;
  first_seen_spending: Date;
  last_seen_spending: Date;
  scripthash_type: null;
  transaction_count: number;
}

export interface AddressInfo extends Address {
  address: string;
}

export interface Currency {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: { [key: string]: number };
}

export type IApiResponse<T> = {
  code: number;
  status: string;
  result: T;
};

export type SubscribeType = (method: string, data: any) => void;

