import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
//components
import { UserList } from './user-list/user-list';
import { AddUser } from './add-user/add-user';
import { Message } from './message/message';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {

  userCounts = [
    { type: 'Agent', count: 4, icon: 'bi-person-badge', bgClass: 'bg-agent' },
    { type: 'Supervisor', count: 3, icon: 'bi-person-check', bgClass: 'bg-supervisor' },
    { type: 'Admin', count: 2, icon: 'bi-shield-lock', bgClass: 'bg-admin' }
  ];

  
}
