import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockDataPageComponent } from './mock-data-page.component';

describe('MockDataPageComponent', () => {
  let component: MockDataPageComponent;
  let fixture: ComponentFixture<MockDataPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockDataPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
