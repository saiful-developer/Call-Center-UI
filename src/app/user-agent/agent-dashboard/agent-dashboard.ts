import { Component, OnInit, NgZone } from '@angular/core';
import { DecimalPipe } from '@angular/common';


//components
import { AgentDashboardRow1 } from './agent-dashboard-row1/agent-dashboard-row1';
import { AgentDashboardRow2 } from './agent-dashboard-row2/agent-dashboard-row2';
import { AgentDashboardRow3 } from './agent-dashboard-row3/agent-dashboard-row3';
// import { Footer } from '../../components/footer/footer';
import { AgentDeshboardRow0 } from './agent-deshboard-row0/agent-deshboard-row0';

@Component({
  selector: 'app-agent-dashboard',
  imports: [AgentDashboardRow1, AgentDashboardRow2, AgentDashboardRow3, AgentDeshboardRow0, DecimalPipe],
  templateUrl: './agent-dashboard.html',
  styleUrl: './agent-dashboard.css'
})
export class AgentDashboard implements OnInit {
  secondsPassed = 0;
  houres = 0;
  minutes = 0;
  seconds = 0;
  counterInterval: any;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    // Load saved time from localStorage if exists
    const savedSeconds = localStorage.getItem('timerSeconds');
    if (savedSeconds) {
      this.secondsPassed = +savedSeconds;
      this.calculateTimeParts();
    }

    this.startCounter();
  }

  startCounter() {
    if (this.counterInterval) return;
    this.ngZone.run(() => {
      this.counterInterval = setInterval(() => {
        this.secondsPassed++;
        this.calculateTimeParts();

        // Save the updated time to localStorage
        localStorage.setItem('timerSeconds', this.secondsPassed.toString());
      }, 1000);
    });
  }

  calculateTimeParts() {
    this.houres = Math.floor(this.secondsPassed / 3600);
    this.minutes = Math.floor((this.secondsPassed % 3600) / 60);
    this.seconds = this.secondsPassed % 60;
  }
}
