import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrunkStatus } from './trunk-status';

describe('TrunkStatus', () => {
  let component: TrunkStatus;
  let fixture: ComponentFixture<TrunkStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrunkStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrunkStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
