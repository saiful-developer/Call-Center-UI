import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentStatus } from './agent-status';

describe('AgentStatus', () => {
  let component: AgentStatus;
  let fixture: ComponentFixture<AgentStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
