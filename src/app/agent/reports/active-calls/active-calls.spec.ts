import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCalls } from './active-calls';

describe('ActiveCalls', () => {
  let component: ActiveCalls;
  let fixture: ComponentFixture<ActiveCalls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveCalls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveCalls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
