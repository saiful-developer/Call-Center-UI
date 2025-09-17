import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangupSuccess } from './hangup-success';

describe('HangupSuccess', () => {
  let component: HangupSuccess;
  let fixture: ComponentFixture<HangupSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HangupSuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HangupSuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
