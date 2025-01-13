import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealtimeDataService {
  private apiKey = 'cu2h2vpr01qh0l7ha2sgcu2h2vpr01qh0l7ha2t0';
  private apiUrl = 'https://finnhub.io/api/v1';
  private wsUrl = `wss://ws.finnhub.io?token=${this.apiKey}`;

  private stocks: { [symbol: string]: any } = {};
  private stockSubject = new BehaviorSubject<{ [symbol: string]: any }>({});
  private socket!: WebSocket;

  private enabledStates: { [symbol: string]: boolean } = {}; // Track enabled/disabled states

  constructor(private http: HttpClient) {}

  // Fetch initial stock data
  fetchStockData(symbols: string[]): void {
    symbols.forEach((symbol) => {
      this.http.get(`${this.apiUrl}/quote?symbol=${symbol}&token=${this.apiKey}`).subscribe((quote: any) => {
        this.stocks[symbol] = {
          ...this.stocks[symbol],
          symbol: symbol,
          currentPrice: quote.c,
          dailyHigh: quote.h,
          dailyLow: quote.l,
          dp: quote.dp,
        };
        this.fetchFundamentalData(symbol);
      });
      this.enabledStates[symbol] = true; // Initialize as enabled
    });
  }

  // Fetch stock fundamental data
  fetchFundamentalData(symbol: string): void {
    this.http.get(`${this.apiUrl}/stock/metric?symbol=${symbol}&metric=price&token=${this.apiKey}`).subscribe((fundamental: any) => {
      this.stocks[symbol] = {
        ...this.stocks[symbol],
        weekHigh52: fundamental.metric['52WeekHigh'],
        weekLow52: fundamental.metric['52WeekLow'],
      };
      this.stockSubject.next(this.stocks);
    });
  }

  // Open WebSocket connection
  connectWebSocket(symbols: string[]): void {
    this.socket = new WebSocket(this.wsUrl);

    this.socket.onopen = () => {
      symbols.forEach((symbol) => {
        this.socket.send(JSON.stringify({ type: 'subscribe', symbol }));
      });
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'trade') {
        const symbol = data.data[0].s;
        const price = data.data[0].p;

        // Skip updates for stocks that are toggled OFF
        if (!this.enabledStates[symbol]) {
          return; // Ignore this update if the stock is disabled
        }

        // Update stock data and emit changes
        if (this.stocks[symbol]) {
          this.stocks[symbol] = {
            ...this.stocks[symbol],
            currentPrice: price,
          };
          this.stockSubject.next(this.stocks);
        }
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket closed');
    };
  }

  // Close WebSocket connection
  disconnectWebSocket(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  // Return an observable for stock data
  getStockUpdates(): Observable<{ [symbol: string]: any }> {
    return this.stockSubject.asObservable();
  }

  // Update enabled/disabled states
  updateEnabledState(symbol: string, isEnabled: boolean): void {
    this.enabledStates[symbol] = isEnabled;
  }
}
