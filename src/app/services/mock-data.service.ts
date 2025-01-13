import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private mockDataUrl = 'assets/mocks/stocks.json';

  constructor(private http: HttpClient) {}

  getMockData(): Observable<any[]> {
    return this.http.get<any[]>(this.mockDataUrl);
  }
}
