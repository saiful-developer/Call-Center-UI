import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingReports } from './outgoing-reports';

describe('OutgoingReports', () => {
  let component: OutgoingReports;
  let fixture: ComponentFixture<OutgoingReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutgoingReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutgoingReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
