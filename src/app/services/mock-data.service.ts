import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { Stock } from '../models/stock.model';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private mockDataUrl = 'assets/mocks/stocks.json';

  private stocks: { stock: Stock; previousPrice: number }[] = []; // Track stocks with previous prices
  private stockSubject = new BehaviorSubject<Stock[]>([]); // Subject for observable updates
  private enabledStates: boolean[] = [];

  constructor(private http: HttpClient) {
    this.fetchMockData();
    interval(8000).subscribe(() => this.updateStockPrices()); // Update every 5 seconds
  }

  // Fetch initial data
  fetchMockData(): void {
    this.http.get<Stock[]>(this.mockDataUrl).subscribe((data) => {
      // Initialize stocks with previousPrice set to the initial currentPrice
      this.stocks = data.map((stock) => ({
        stock,
        previousPrice: stock.currentPrice,
      }));

      this.enabledStates = data.map(() => true);
      // Emit the initial stock data
      this.stockSubject.next(this.stocks.map((s) => s.stock));
    });
  }

  // Update prices and track previous prices
  private updateStockPrices(): void {
    this.stocks.forEach((entry, index) => {
      // Update the previous price before changing the current price
      entry.previousPrice = entry.stock.currentPrice;
      if (this.enabledStates[index]) {
        // Randomize the stock price
        entry.stock.currentPrice = this.randomizeValue(entry.stock.currentPrice);
        entry.stock.dailyHigh = this.randomizeValue(entry.stock.dailyHigh);
        entry.stock.dailyLow = this.randomizeValue(entry.stock.dailyLow);
      }
      // Keep the 52-week values unchanged
      entry.stock.weekHigh52 = entry.stock.weekHigh52;
      entry.stock.weekLow52 = entry.stock.weekLow52;
    });

    // Emit the updated stock data
    this.stockSubject.next(this.stocks.map((s) => s.stock));
  }

  // Randomize a value within ±1% of its current value
  private randomizeValue(value: number): number {
    const randomChange = (Math.random() * 2 - 1) * 0.01 * value;
    return parseFloat((value + randomChange).toFixed(2)); // Limit to 2 decimals
  }

  // Return an observable for stock data
  getMockData(): Observable<Stock[]> {
    return this.stockSubject.asObservable();
  }

  // Update the enabled states from the view component
  setEnabledStates(enabledStates: boolean[]): void {
    this.enabledStates = enabledStates;
  }

  // Get the previous price for a specific stock by index
  getPreviousPrice(index: number): number {
    return this.stocks[index]?.previousPrice || 0;
  }

  // Fetch the latest stock data for a specific index in case of long "OFF"
  getLatestStockData(index: number): Stock {
    return this.stocks[index].stock;
  }
}
