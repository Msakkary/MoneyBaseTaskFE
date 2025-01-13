import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Stock } from '../../models/stock.model';
import { ToggleSwitchComponent } from "../toggle-switch/toggle-switch.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-card',
  imports: [ToggleSwitchComponent, CommonModule],
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.scss'
})
export class StockCardComponent {
  @Input() stock!: Stock;
  @Input() backgroundClass!: string; // Green/red
  @Input() isEnabled: boolean = true; // Default to enabled
  @Output() toggle = new EventEmitter<boolean>(); // Notify parent on toggle

  // Emit the toggle state to the parent component
  onToggle(isOn: boolean): void {
    this.toggle.emit(isOn);
  }
}
