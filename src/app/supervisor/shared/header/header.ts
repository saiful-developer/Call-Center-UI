import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterLink, RouterModule } from '@angular/router';
import { SidebarService } from '../../../services/sidebar-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
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
export class Header {
  openMenu: string | null = null; // currently open menu

  isMobile: boolean = false;

  constructor(
    private sidebarService: SidebarService
  ) {

  }

  taggleMobileSidebar() {
    this.isMobile = !this.isMobile
  }


  toggleMenu(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }


@Input() isMobileSidebarVisible: boolean = false; // add this
@Input() isSidebarOpen: boolean = false;
@Output() toggleSidebar = new EventEmitter<void>();


onToggleSidebar() {
  this.toggleSidebar.emit();
}
}