import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDashboardRow2 } from './agent-dashboard-row2';

describe('AgentDashboardRow2', () => {
  let component: AgentDashboardRow2;
  let fixture: ComponentFixture<AgentDashboardRow2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentDashboardRow2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentDashboardRow2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
