import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorMessage } from './supervisor-message';

describe('SupervisorMessage', () => {
  let component: SupervisorMessage;
  let fixture: ComponentFixture<SupervisorMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervisorMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
