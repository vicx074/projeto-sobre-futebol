import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedStatsComponent } from './detailed-stats.component';

describe('DetailedStatsComponent', () => {
  let component: DetailedStatsComponent;
  let fixture: ComponentFixture<DetailedStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
