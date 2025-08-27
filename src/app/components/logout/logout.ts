import { Component } from '@angular/core';
import { PageHeader } from '../page-header/page-header';
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
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  gotoDashboard() {
    this.router.navigate(['/dashboard']);
  }



}
