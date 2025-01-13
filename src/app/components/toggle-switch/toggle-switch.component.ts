import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  imports: [],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss'
})
export class ToggleSwitchComponent {
  @Input() isOn: boolean = true; // Initial state
  @Output() toggleState = new EventEmitter<boolean>(); // Emit state change

  toggle(): void {
    this.isOn = !this.isOn;
    this.toggleState.emit(this.isOn);  // Emit the updated state
  }
}
