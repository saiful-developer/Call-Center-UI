import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login-agnet',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-agnet.html',
  styleUrl: './login-agnet.css'
})
export class LoginAgnet {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';
  loginTime: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required]],
      extension: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
        const parseedToken = JSON.parse(res.data)
        sessionStorage.setItem('user', JSON.stringify(parseedToken))
        sessionStorage.setItem('jwt', parseedToken.token)
        this.router.navigateByUrl('/agent/dashboard');
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Login failed. Please check credentials.';
        window.alert(this.errorMessage)
      }
    });

    //snapshort of login time
    const now = new Date();
    // store in sessionStorage if you want it after reload
    sessionStorage.setItem('loginTime', now.getTime().toString());
  }
}