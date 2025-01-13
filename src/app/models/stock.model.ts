export interface Stock {
  symbol: string;
  name: string;              // Name of the stock
  currentPrice: number;      // Current price of the stock
  dailyHigh: number;         // Daily high price
  dailyLow: number;          // Daily low price
  weekHigh52: number;        // 52-week high price
  weekLow52: number;         // 52-week low price
}
