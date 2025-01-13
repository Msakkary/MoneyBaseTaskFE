import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockCardComponent } from '../../components/stock-card/stock-card.component';
import { Stock } from '../../models/stock.mode';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-mock-data-page',
  imports: [StockCardComponent, CommonModule],
  templateUrl: './mock-data-page.component.html',
  styleUrl: './mock-data-page.component.scss'
})
export class MockDataPageComponent {
  stocks: Stock[] = [];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.mockDataService.getMockData().subscribe((data: Stock[]) => {
      this.stocks = data;
    });
  }
}
