import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  time: string = '';

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000); // Update time every second
  }

  updateTime() {
    const now = new Date();
    // Format the time in GMT
    this.time = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'GMT',
      hour12: false, // 24-hour format
    }).format(now);
  }
}
