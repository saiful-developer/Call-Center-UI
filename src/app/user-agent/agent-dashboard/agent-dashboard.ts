import { Component, OnInit, NgZone } from '@angular/core';
import { DecimalPipe } from '@angular/common';

// import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { AgentData } from '../../models/agent.model';
import { UserService } from '../../services/user.service';


//components
import { AgentDashboardRow1 } from './agent-dashboard-row1/agent-dashboard-row1';
import { AgentDashboardRow2 } from './agent-dashboard-row2/agent-dashboard-row2';
import { AgentDashboardRow3 } from './agent-dashboard-row3/agent-dashboard-row3';
// import { Footer } from '../../components/footer/footer';
import { AgentDeshboardRow0 } from './agent-deshboard-row0/agent-deshboard-row0';
import { ConnectableObservable } from 'rxjs';





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

  constructor(
    private ngZone: NgZone,
    private apiService: ApiService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // Load saved time from localStorage if exists
    const savedSeconds = sessionStorage.getItem('timerSeconds');
    if (savedSeconds) {
      this.secondsPassed = +savedSeconds;
      this.calculateTimeParts();
    }

    this.startCounter();
    // console.log(localStorage.getItem('auth_token'))

    // if (localStorage.getItem('auth_token')) {
    //   this.apiService.loginAgent('hridoy', 'abcBD987!', 4002).subscribe(agent => {
    //     this.userService.setAgent(agent);
    //   });
    // } else {
    //   this.loginAgent();
    // }

  }

  startCounter() {
    if (this.counterInterval) return;
    this.ngZone.run(() => {
      this.counterInterval = setInterval(() => {
        this.secondsPassed++;
        this.calculateTimeParts();

        // Save the updated time to localStorage
        sessionStorage.setItem('timerSeconds', this.secondsPassed.toString());
      }, 1000);
    });
  }

  calculateTimeParts() {
    this.houres = Math.floor(this.secondsPassed / 3600);
    this.minutes = Math.floor((this.secondsPassed % 3600) / 60);
    this.seconds = this.secondsPassed % 60;
  }

  //login to agent api 
  private agentData!: AgentData //interface

  // loginAgent() {
  //   this.apiService.loginAgent('hridoy', 'abcBD987!', 4002).subscribe({
  //     next: (res) => {
  //       window.alert('login successfull. login feature will be added');

  //       //consvert json data to js object and save token in local server 
  //       const parsedRes = JSON.parse(res.data);
  //       this.agentData = parsedRes;

  //       //use it for access data in multiple components
  //       console.log(this.agentData);
  //       this.userService.setAgent(this.agentData);

  //       // console.log("asdfasdf" + parsedRes)

  //       localStorage.setItem('auth_token', parsedRes.token);

  //     },
  //     error: (err) => {

  //       // console.log(err)

  //     }
  //   })
  // }

}
