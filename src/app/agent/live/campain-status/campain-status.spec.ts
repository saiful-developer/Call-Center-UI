import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampainStatus } from './campain-status';

describe('CampainStatus', () => {
  let component: CampainStatus;
  let fixture: ComponentFixture<CampainStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampainStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampainStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
