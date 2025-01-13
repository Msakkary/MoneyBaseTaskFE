import { Component, Input } from '@angular/core';
import { Stock } from '../../models/stock.mode';

@Component({
  selector: 'app-stock-card',
  imports: [],
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.scss'
})
export class StockCardComponent {
  @Input() stock!: Stock;
}
