import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartJs } from './chart-js';

describe('ChartJs', () => {
  let component: ChartJs;
  let fixture: ComponentFixture<ChartJs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartJs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartJs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
