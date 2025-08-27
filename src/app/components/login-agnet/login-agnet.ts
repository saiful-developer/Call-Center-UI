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
  loading = false;
  errorMessage = '';

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

    this.loading = true;
    const { userId, extension, password } = this.loginForm.value;

    this.apiService.loginAgent(userId, password, extension).subscribe({
      next: (res: any) => {

        const parseedToken = JSON.parse(res.data)
        console.log(parseedToken.token)
        sessionStorage.setItem('jwt',parseedToken.token)
        // store token
        this.router.navigateByUrl('/agent/dashboard');
        this.loading = false;

        

      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Login failed. Please check credentials.';
        this.loading = false;
      }
    });
  }
}
