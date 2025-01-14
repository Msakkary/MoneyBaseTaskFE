import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { MockDataPageComponent } from './app/pages/mock-data-page/mock-data-page.component';
import { RealtimePageComponent } from './app/pages/real-time-data-page/real-time-data-page.component';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: '', redirectTo: '/real-time', pathMatch: 'full' },
  { path: 'mock-data', component: MockDataPageComponent },
  { path: 'real-time', component: RealtimePageComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),provideHttpClient()],
}).catch((err) => console.error(err));
