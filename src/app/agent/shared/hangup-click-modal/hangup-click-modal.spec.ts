import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangupClickModal } from './hangup-click-modal';

describe('HangupClickModal', () => {
  let component: HangupClickModal;
  let fixture: ComponentFixture<HangupClickModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HangupClickModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HangupClickModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
