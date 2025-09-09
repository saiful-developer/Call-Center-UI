import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbandonReports } from './abandon-reports';

describe('AbandonReports', () => {
  let component: AbandonReports;
  let fixture: ComponentFixture<AbandonReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbandonReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbandonReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
