import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserService } from '../../services/jwt-decode.service';
//components
import { AgentDashboardRow1 } from './agent-dashboard-row1/agent-dashboard-row1';
import { AgentDashboardRow2 } from './agent-dashboard-row2/agent-dashboard-row2';
import { AgentDashboardRow3 } from './agent-dashboard-row3/agent-dashboard-row3';
import { AgentDeshboardRow0 } from './agent-deshboard-row0/agent-deshboard-row0';
import { ConnectableObservable } from 'rxjs';





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

  currentTime: string = '';
  clockInterval: any;


  constructor(

  ) { }

  ngOnInit() {

    this.updateCurrentTime();
    this.clockInterval = setInterval(() => {
      this.updateCurrentTime();
    }, 1000);
    // console.log(localStorage.getItem('auth_token'))

    // if (localStorage.getItem('auth_token')) {
    //   this.apiService.loginAgent('hridoy', 'abcBD987!', 4002).subscribe(agent => {
    //     this.userService.setAgent(agent);
    //   });
    // } else {
    //   this.loginAgent();
    // }

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

  //login to agent api 
  // private agentData!: AgentData 

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
