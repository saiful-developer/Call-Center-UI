import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallBack } from './call-back';

describe('CallBack', () => {
  let component: CallBack;
  let fixture: ComponentFixture<CallBack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallBack]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallBack);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
