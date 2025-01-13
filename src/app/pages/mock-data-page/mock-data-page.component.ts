import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockCardComponent } from '../../components/stock-card/stock-card.component';
import { Stock } from '../../models/stock.model';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-mock-data-page',
  imports: [StockCardComponent, CommonModule],
  templateUrl: './mock-data-page.component.html',
  styleUrl: './mock-data-page.component.scss'
})
export class MockDataPageComponent {
  stocks: Stock[] = [];
  statuses: string[] = [];
  enabledStates: boolean[] = [];

  constructor(private mockDataService: MockDataService) {}
  ngOnInit(): void {
    this.mockDataService.getMockData().subscribe((data) => {
      if (this.stocks.length === 0) {
        // Initialize stocks and enable all by default
        this.stocks = data;
        this.enabledStates = data.map(() => true); // All enabled initially
        this.mockDataService.setEnabledStates(this.enabledStates);

        // Set initial statuses to green for all stocks
        this.statuses = data.map(() => 'green');
      } else {
        // Only update enabled stocks
        this.stocks.forEach((stock, index) => {
          if (this.enabledStates[index]) {
            Object.assign(stock, data[index]); // Update stock data
          }
        });
      }

      // Update statuses for cards
      this.statuses = this.stocks.map((stock, index) => {
        if (!this.enabledStates[index]) {
          return 'gray'; // Disabled cards are gray
        }
        const previousPrice = this.mockDataService.getPreviousPrice(index);
        return stock.currentPrice >= previousPrice ? 'green' : 'red'; // Compare for green/red
      });
    });
  }

  // Handle toggle action from the child component
  toggleStock(index: number, isOn: boolean): void {
    this.enabledStates[index] = isOn; // Update the enabled state
    console.log(`Stock ${this.stocks[index].name} is now ${isOn ? 'enabled' : 'disabled'}`);

    if (isOn) {
      // If toggled back ON, immediately reapply the latest stock data
      const latestData = this.mockDataService.getLatestStockData(index);
      Object.assign(this.stocks[index], latestData);

      // Recalculate the status immediately
      const previousPrice = this.mockDataService.getPreviousPrice(index);
      this.statuses[index] = this.stocks[index].currentPrice > previousPrice ? 'green' : 'red';
    } else {
      // If toggled OFF, set the status to gray
      this.statuses[index] = 'gray';
    }
  }
}
