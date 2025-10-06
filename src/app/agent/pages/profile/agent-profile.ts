import { Component, OnInit } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';

//services
import { LoginTimeAndDuration } from '../../../services/login-timeAndduration';
import { ApiService } from '../../services/api.service';
import { DecodeToken } from '../../../services/jwt-decode.service';


@Component({
  selector: 'app-agent-profile',
  imports: [PageHeader],
  templateUrl: './agent-profile.html',
  styleUrl: './agent-profile.css'
})
export class AgentProfile implements OnInit {

  pageTitle: string = 'Profile'
  profileDetails: any = {};
  lgoinDate: string | null = '';
  loginTime: string = '';
  publicIp: string = '';
  docodedToken: any = '';

  constructor(
    private loginTimeAndDuration: LoginTimeAndDuration,
    private apiService: ApiService,
    private decodeToken : DecodeToken) { }


  ngOnInit(): void {
    this.getUserInfo()
    this.getLoginDateAndTime();
    // this.getLoginDeviceIpPublic();
    

    //check
    this.decodeTokenFn();
    console.log('hi, ', this.profileDetails);
    console.log(this.loginTimeAndDuration.getLoginTime())
    console.log(sessionStorage.getItem('loginDate'))
    console.log(this.publicIp);
    

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

  getLoginDeviceIpPublic() {
    this.apiService.getPublicIp().subscribe({
      next: (res) => this.publicIp = res.ip,
      error: (err) => console.error('Failed to fetch IP', err)
    });
  }

  decodeTokenFn() {
    const token = this.profileDetails.token;
    console.log( 'test', this.profileDetails.token);
    
    this.docodedToken = this.decodeToken.decodeToken(token);
    console.log(this.docodedToken);

    console.log(this.decodeToken.decodeToken(this.docodedToken.info));
    
    
  }


}
