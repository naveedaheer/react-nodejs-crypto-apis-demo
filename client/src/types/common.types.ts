export interface OrderBook {
  lastUpdateId: number;
  bids: [string[]];
  asks: [string[]];
}
export interface CurrencyPair {
  symbol: string;
}

export interface filters {
  pair: string;
  limit: number;
}

