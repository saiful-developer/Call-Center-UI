import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingCallsLive } from './waiting-calls-live';

describe('WaitingCallsLive', () => {
  let component: WaitingCallsLive;
  let fixture: ComponentFixture<WaitingCallsLive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitingCallsLive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingCallsLive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
