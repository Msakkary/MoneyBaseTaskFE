import { Component, OnInit, OnDestroy } from '@angular/core';
import { RealtimeDataService } from '../../services/realtime-data.service';
import { StockCardComponent } from '../../components/stock-card/stock-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-real-time-data-page',
  imports: [StockCardComponent, CommonModule],
  templateUrl: './real-time-data-page.component.html',
  styleUrl: './real-time-data-page.component.scss'
})

export class RealtimePageComponent implements OnInit, OnDestroy {
  stocks: any[] = [];
  statuses: string[] = [];
  enabledStates: boolean[] = [];
  loading = true; // Track loading state
  symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA']; // Stock symbols

  constructor(private realtimeService: RealtimeDataService) {}

  ngOnInit(): void {
    setTimeout(() => {
      // Fetch initial data
      this.realtimeService.fetchStockData(this.symbols);

      // Subscribe to stock updates
      this.realtimeService.getStockUpdates().subscribe((data) => {
        if (this.stocks.length === 0) {
          // Initialize stocks and statuses on first load
          this.stocks = this.symbols.map((symbol) => data[symbol] || {});
          this.enabledStates = this.symbols.map(() => true); // Default to enabled
          this.statuses = this.symbols.map(() => 'green'); // Default to green
          this.loading = false; // Hide loader
        } else {
          // Update existing stocks without replacing the array
          this.stocks.forEach((stock, index) => {
            const symbol = this.symbols[index];
            if (data[symbol]) {
              Object.assign(stock, data[symbol]); // Update stock properties
            }
          });
        }

        // Update statuses
        this.updateStatuses();
      });

      // Connect to WebSocket
      this.realtimeService.connectWebSocket(this.symbols);
    }, 1000); // 1-second fake delay for loader
  }

  toggleStock(index: number, isOn: boolean): void {
    const symbol = this.symbols[index];
    this.enabledStates[index] = isOn; // Update local state
    this.realtimeService.updateEnabledState(symbol, isOn); // Update state in the service

    if (!isOn) {
      // Set status to gray if toggled OFF
      this.statuses[index] = 'gray';
    } else {
      // Reapply status based on dp value if toggled ON
      const stock = this.stocks[index];
      this.statuses[index] = stock.dp > 0 ? 'green' : 'red';
    }
  }

  private updateStatuses(): void {
    this.statuses = this.stocks.map((stock, index) => {
      if (!this.enabledStates[index]) return 'gray'; // Disabled cards are gray
      return stock.dp > 0 ? 'green' : 'red'; // Use dp directly
    });
  }

  // Track stocks by symbol to prevent full re-renders
  trackBySymbol(index: number, stock: any): string {
    return stock?.symbol || index;
  }

  ngOnDestroy(): void {
    this.realtimeService.disconnectWebSocket();
  }
}
