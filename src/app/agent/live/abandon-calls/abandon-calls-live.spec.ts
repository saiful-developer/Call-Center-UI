import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbandonCallsLive } from './abandon-calls-live';

describe('AbandonCallsLive', () => {
  let component: AbandonCallsLive;
  let fixture: ComponentFixture<AbandonCallsLive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbandonCallsLive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbandonCallsLive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
