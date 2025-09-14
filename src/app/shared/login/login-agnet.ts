import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../agent/services/api.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/jwt-decode.service';
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-login-agnet',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-agnet.html',
  styleUrl: './login-agnet.css'
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
    private userService: UserService,
    private zone: NgZone
  ) {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required]],
      extension: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) return;

    const { userId, extension, password, role } = this.loginForm.value;
    sessionStorage.setItem('role', role);

    // console.log(role)

    //getting data
    this.apiService.loginAgent(userId, password, extension).subscribe({
      next: (res: any) => {
        try {
          const parsedToken = JSON.parse(res.data);
          console.log((parsedToken.token));


          if (parsedToken.token) {
            sessionStorage.setItem('user', JSON.stringify(parsedToken));
            sessionStorage.setItem('jwt', parsedToken.token);
            console.log('inside if')

            this.zone.run(() => {
              this.router.navigate(['/agent/dashboard']);
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
  }
}