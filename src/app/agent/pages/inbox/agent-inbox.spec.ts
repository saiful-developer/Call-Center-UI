import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentInbox } from './agent-inbox';

describe('AgentInbox', () => {
  let component: AgentInbox;
  let fixture: ComponentFixture<AgentInbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentInbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentInbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
