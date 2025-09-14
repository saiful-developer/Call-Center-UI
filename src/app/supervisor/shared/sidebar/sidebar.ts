import { Component } from '@angular/core';
import { SidebarService } from '../../../services/sidebar-service';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
  animations: [
    trigger('dropdownAnimation', [
      state('open', style({
        height: '*',
        opacity: 1,
        overflow: 'hidden'
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden'
      })),
      transition('closed <=> open', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class Sidebar {

  openMenu: string | null = null; // currently open menu

  constructor(private sidebarService: SidebarService) { }

  toggleMenu(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }

  onToggleSidebar() {
    if (window.innerWidth <= 1000) {
      this.sidebarService.toggleSidebar();
    }
  }
}
