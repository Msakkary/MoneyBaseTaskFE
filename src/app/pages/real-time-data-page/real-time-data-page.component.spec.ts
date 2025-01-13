import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeDataPageComponent } from './real-time-data-page.component';

describe('RealTimeDataPageComponent', () => {
  let component: RealTimeDataPageComponent;
  let fixture: ComponentFixture<RealTimeDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealTimeDataPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealTimeDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
