import { Component } from '@angular/core';


//components
import { AgentDashboardRow1 } from './agent-dashboard-row1/agent-dashboard-row1';
import { AgentDashboardRow2 } from './agent-dashboard-row2/agent-dashboard-row2';
import { AgentDashboardRow3 } from './agent-dashboard-row3/agent-dashboard-row3';
// import { Footer } from '../../components/footer/footer';
import { AgentDeshboardRow0 } from './agent-deshboard-row0/agent-deshboard-row0';

@Component({
  selector: 'app-agent-dashboard',
  imports: [AgentDashboardRow1, AgentDashboardRow2, AgentDashboardRow3, AgentDeshboardRow0],
  templateUrl: './agent-dashboard.html',
  styleUrl: './agent-dashboard.css'
})
export class AgentDashboard {

}
