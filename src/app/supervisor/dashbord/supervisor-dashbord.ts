import { Component } from '@angular/core';
// components

@Component({
  selector: 'app-supervisor-dashbord',
  imports: [],
  templateUrl: './supervisor-dashbord.html',
  styleUrl: './supervisor-dashbord.css'
})
export class SupervisorDashbord {
  secondsPassed = 0;
  houres = 0;
  minutes = 0;
  seconds = 0;
  currentTime: string = '';
  clockInterval: any;

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

}
