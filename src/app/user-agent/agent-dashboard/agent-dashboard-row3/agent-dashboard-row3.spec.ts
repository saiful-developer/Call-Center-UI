import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDashboardRow3 } from './agent-dashboard-row3';

describe('AgentDashboardRow3', () => {
  let component: AgentDashboardRow3;
  let fixture: ComponentFixture<AgentDashboardRow3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentDashboardRow3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentDashboardRow3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
