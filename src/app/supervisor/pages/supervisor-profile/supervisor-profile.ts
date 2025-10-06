import { Component, OnInit } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';
import { LoginTimeAndDuration } from '../../../services/login-timeAndduration';

@Component({
  selector: 'app-supervisor-profile',
  imports: [PageHeader],
  templateUrl: './supervisor-profile.html',
  styleUrl: './supervisor-profile.css'
})
export class SupervisorProfile implements OnInit {

  profileDetails: any = {};
  lgoinDate: string | null = '';
  loginTime: string = '';

  constructor(
    private loginTimeAndDuration: LoginTimeAndDuration,

  ) {
    
  }

  ngOnInit(): void {
    this.getLoginDateAndTime()
    this.getUserInfo();
    console.log(this.profileDetails);

  }


  getUserInfo() {
    const value = sessionStorage.getItem('user');
    if (value) {
      this.profileDetails = JSON.parse(value)
    }
  }

  getLoginDateAndTime() {
    this.lgoinDate = sessionStorage.getItem('loginDate');
    this.loginTime = this.loginTimeAndDuration.getFormattedLoginTime();

  }


}
