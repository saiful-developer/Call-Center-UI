import { Component, OnInit, signal } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { SidebarService } from '../../services/sidebar-service';
import { CommonModule } from '@angular/common';

import { trigger, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs';
import { AgentData, JwtPayload } from '../../models/agent.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: '0', opacity: 0 })),
      ]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  openMenu: string | null = null; // currently open menu
  decodedToken: JwtPayload | null = null;


  isSidebarVisible = true;

  constructor(
    private sidebarService: SidebarService,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.sidebarService.sidebarVisible$.subscribe((isSidebarVisible) => {
      console.log('Sidebar visibility:', isSidebarVisible); // Debug log
      this.isSidebarVisible = !isSidebarVisible;
    });

    this.decodedToken = this.userService.decodeToken(sessionStorage.getItem('jwt'));
  }

  onToggleSidebar() {
    if (window.innerWidth <= 1000) {
      console.log('Toggle clicked'); // Debug log
      this.sidebarService.toggleSidebar();
    }
  }

  toggleMenu(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }
}