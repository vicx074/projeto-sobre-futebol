import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceChartsComponent } from './performance-charts.component';

describe('PerformanceChartsComponent', () => {
  let component: PerformanceChartsComponent;
  let fixture: ComponentFixture<PerformanceChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
