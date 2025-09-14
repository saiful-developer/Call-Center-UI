import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout-modal',
  imports: [CommonModule],
  templateUrl: './logout-modal.html',
  styleUrl: './logout-modal.css'
})
export class LogoutModal {
  isVisible = false;

  constructor(private router: Router) { }

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }

  confirmLogout() {
    this.isVisible = false;
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('user');
    sessionStorage.clear();
    localStorage.clear()
    this.router.navigate(['/login']);
    console.log("User logged out!");
  }

}
