import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../agent/services/api.service';
import { Router } from '@angular/router';
import { DecodeToken } from '../../services/jwt-decode.service';
import { NgZone } from '@angular/core';
import { LoginTimeAndDuration } from '../../services/login-timeAndduration';


@Component({
  selector: 'app-login-agnet',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';
  loginTime: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private decodeToken: DecodeToken,
    private zone: NgZone,
    private loginTimeAndDuration: LoginTimeAndDuration
  ) {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required]],
      extension: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) return;

    const { userId, extension, password } = this.loginForm.value;


    //getting data
    this.apiService.loginAgent(userId, password, extension).subscribe({
      next: (res: any) => {
        try {
          const parsedToken = JSON.parse(res.data);
          console.log((parsedToken.token));


          if (parsedToken.token) {
            sessionStorage.setItem('user', JSON.stringify(parsedToken));
            sessionStorage.setItem('user_role', parsedToken.user_type);
            console.log(sessionStorage.getItem('user_role'))
            sessionStorage.setItem('jwt', parsedToken.token);

            this.zone.run(() => {
              if (parsedToken.user_type === 'AGENT') {
                this.router.navigate(['/agent/dashboard']);
              } else if (parsedToken.user_type === 'SUPERVISOR') {
                this.router.navigate(['/supervisor/dashboard']);
              } else {
                this.router.navigate(['/login']);
              }
            });

          } else {
            this.errorMessage = 'Invalid login response.';
            window.alert(this.errorMessage);
          }
        } catch (e) {
          this.errorMessage = 'Login failed. Invalid response format.';
          window.alert(this.errorMessage);
        }
      },
      error: (err) => {
        console.error(err);
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('user');
        this.errorMessage = 'Login failed. Please check credentials.';
        window.alert(this.errorMessage);
      }
    });

    //snapshort of login time
    const now = new Date();
    // store in sessionStorage if you want it after reload
    sessionStorage.setItem('loginTime', now.getTime().toString());
    this.loginTimeAndDuration.saveLoginDate();

    //save public ip in sesson

  }
}