export interface OrderBook {
  lastUpdateId: number;
  bids: [string[]];
  asks: [string[]];
}
export interface CurrencyPair {
  symbol: string;
  price: string;
}
