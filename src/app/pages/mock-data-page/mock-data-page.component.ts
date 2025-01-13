import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockCardComponent } from '../../components/stock-card/stock-card.component';
import { Stock } from '../../models/stock.model';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-mock-data-page',
  standalone: true,
  imports: [StockCardComponent, CommonModule],
  templateUrl: './mock-data-page.component.html',
  styleUrls: ['./mock-data-page.component.scss'],
})
export class MockDataPageComponent implements OnInit {
  stocks: Stock[] = [];
  statuses: string[] = [];
  enabledStates: boolean[] = [];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.initializeStocks();
  }

  private initializeStocks(): void {
    this.mockDataService.getMockData().subscribe((data) => {
      if (!this.stocks.length) {
        this.setupInitialState(data);
      } else {
        this.updateEnabledStocks(data);
      }
      this.updateStatuses();
    });
  }

  private setupInitialState(data: Stock[]): void {
    this.stocks = [...data];
    this.enabledStates = data.map(() => true); // All enabled initially
    this.mockDataService.setEnabledStates(this.enabledStates);
    this.statuses = this.stocks.map(() => 'green'); // All start as green
  }

  private updateEnabledStocks(data: Stock[]): void {
    this.stocks.forEach((stock, index) => {
      if (this.enabledStates[index]) {
        Object.assign(stock, data[index]);
      }
    });
  }

  private updateStatuses(): void {
    this.statuses = this.stocks.map((stock, index) => {
      if (!this.enabledStates[index]) return 'gray'; // Disabled cards are gray
      const previousPrice = this.mockDataService.getPreviousPrice(index);
      return stock.currentPrice >= previousPrice ? 'green' : 'red';
    });
  }

  toggleStock(index: number, isOn: boolean): void {
    this.enabledStates[index] = isOn;
    this.mockDataService.setEnabledStates(this.enabledStates);

    if (isOn) {
      this.handleToggleOn(index);
    } else {
      this.statuses[index] = 'gray';
    }
  }

  private handleToggleOn(index: number): void {
    const latestData = this.mockDataService.getLatestStockData(index);
    Object.assign(this.stocks[index], latestData);

    const previousPrice = this.mockDataService.getPreviousPrice(index);
    this.statuses[index] = this.stocks[index].currentPrice >= previousPrice ? 'green' : 'red';
  }
}
