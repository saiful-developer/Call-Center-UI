import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDashboardRow1 } from './agent-dashboard-row1';

describe('AgentDashboardRow1', () => {
  let component: AgentDashboardRow1;
  let fixture: ComponentFixture<AgentDashboardRow1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentDashboardRow1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentDashboardRow1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
