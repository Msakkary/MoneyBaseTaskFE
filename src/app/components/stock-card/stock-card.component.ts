import { Component, Input } from '@angular/core';
import { Stock } from '../../models/stock.model';
import { ToggleSwitchComponent } from "../toggle-switch/toggle-switch.component";

@Component({
  selector: 'app-stock-card',
  imports: [ToggleSwitchComponent],
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.scss'
})
export class StockCardComponent {
  @Input() stock!: Stock;

  onToggle(isOn: boolean): void {
    console.log(`Toggle is now ${isOn ? 'ON' : 'OFF'}`);
  }
}
