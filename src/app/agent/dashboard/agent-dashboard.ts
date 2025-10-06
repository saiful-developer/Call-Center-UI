import { Component, OnInit } from '@angular/core';
//components
import { AgentDashboardRow1 } from './agent-dashboard-row1/agent-dashboard-row1';
import { AgentDashboardRow2 } from './agent-dashboard-row2/agent-dashboard-row2';
import { AgentDashboardRow3 } from './agent-dashboard-row3/agent-dashboard-row3';
import { AgentDeshboardRow0 } from './agent-deshboard-row0/agent-deshboard-row0';
import { ConnectableObservable } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { SocketService, IncomingMessage } from '../../services/socket.service';





@Component({
  selector: 'app-agent-dashboard',
  imports: [AgentDashboardRow1, AgentDashboardRow2, AgentDashboardRow3, AgentDeshboardRow0],
  templateUrl: './agent-dashboard.html',
  styleUrl: './agent-dashboard.css'
})
export class AgentDashboard implements OnInit {
  secondsPassed = 0;
  houres = 0;
  minutes = 0;
  seconds = 0;
  counterInterval: any;
  campaingList: string[] = [];

  currentTime: string = '';
  clockInterval: any;



  ngOnInit() {
    this.updateCurrentTime();
    this.clockInterval = setInterval(() => {
      this.updateCurrentTime();
    }, 1000);

  }





  updateCurrentTime() {
    const now = new Date();
    let hrs = now.getHours();
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');

    const ampm = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12; // 0 should be 12 in 12h format

    this.currentTime = `${hrs}h : ${mins}m : ${secs}s ${ampm}`;
  }












  ngOnDestroy() {
    clearInterval(this.clockInterval);
  }

}
