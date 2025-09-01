import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakReports } from './break-reports';

describe('BreakReports', () => {
  let component: BreakReports;
  let fixture: ComponentFixture<BreakReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
