import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDeshboardRow0 } from './agent-deshboard-row0';

describe('AgentDeshboardRow0', () => {
  let component: AgentDeshboardRow0;
  let fixture: ComponentFixture<AgentDeshboardRow0>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentDeshboardRow0]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentDeshboardRow0);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
