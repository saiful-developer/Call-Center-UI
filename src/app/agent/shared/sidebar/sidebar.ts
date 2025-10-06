import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { RouterModule, RouterLink, Router, NavigationEnd } from '@angular/router';
import { SidebarService } from '../../../services/sidebar-service';
import { CommonModule } from '@angular/common';

import { trigger, style, animate, transition } from '@angular/animations';
import { JwtPayload } from '../../../interfaces/jwtpayload';
import { DecodeToken } from '../../../services/jwt-decode.service';
import { LogoutModal } from "../logout-modal/logout-modal";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink, LogoutModal],
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
  @Input() isOpen: boolean = false;

  openMenu: string | null = null; // currently open menu
  decodedToken: JwtPayload | null = null;


  isSidebarVisible = true;

  constructor(
    private sidebarService: SidebarService,
    private decodeToken: DecodeToken,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.sidebarService.sidebarVisible$.subscribe((isSidebarVisible) => {
      console.log('Sidebar visibility:', isSidebarVisible); // debug log
      this.isSidebarVisible = !isSidebarVisible;
    });

    this.decodedToken = this.decodeToken.decodeToken(sessionStorage.getItem('jwt'));

    // close sidebar for every route change in mobile device
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd && window.innerWidth <= 1000) {
        this.sidebarService.closeSidebar();
      }
    });
  }

  onToggleSidebar() {
    // if (window.innerWidth <= 1000) {
    //   console.log('Toggle clicked'); // Debug log
    //   this.sidebarService.closeSidebar();
    // }
  }

  toggleMenu(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}