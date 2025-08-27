import { Component } from '@angular/core';
import { PageHeader } from '../../components/page-header/page-header';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [PageHeader],
  templateUrl: './logout.html',
  styleUrl: './logout.css'
})
export class Logout {

  constructor(private router: Router) { }

  confirmLogout() {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      this.logout();
    }
  }

  logout() {
    // Clear local storage and any other session data
    sessionStorage.removeItem('auth_token');
    localStorage.removeItem('currentAgent'); // if you store agent info
    // Navigate to login page
    this.router.navigate(['/login']);
  }

  gotoDashboard() {
    this.router.navigate(['/dashboard']);
  }



}
