import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallWaiting } from './call-waiting';

describe('CallWaiting', () => {
  let component: CallWaiting;
  let fixture: ComponentFixture<CallWaiting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallWaiting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallWaiting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
