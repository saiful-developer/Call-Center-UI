import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentMessage } from './agent-message';

describe('AgentMessage', () => {
  let component: AgentMessage;
  let fixture: ComponentFixture<AgentMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
