import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-agent-dashboard-row1',
  imports: [],
  templateUrl: './agent-dashboard-row1.html',
  styleUrl: './agent-dashboard-row1.css'
})
export class AgentDashboardRow1 implements OnInit {
  loginDuration = '';
  private intervalId: any;
  showLoginTime: string | null = null;

  constructor(private sessionService: SessionService) { }


  ngOnInit() {
    this.showLoginTime = this.sessionService.getFormattedLoginTime();



    this.updateDuration();
    this.intervalId = setInterval(() => {
      this.updateDuration();
    }, 1000); // update every second
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateDuration() {
    this.loginDuration = this.sessionService.getLoginDuration();
  }


}
