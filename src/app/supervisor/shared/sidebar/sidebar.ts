import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { SidebarService } from '../../../services/sidebar-service';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterModule, RouterLink } from '@angular/router';

import { JwtPayload } from '../../../interfaces/jwtpayload';
import { DecodeToken } from '../../../services/jwt-decode.service';


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

export class Sidebar implements OnInit {
  @Input() isOpen: boolean = false;


  decodedToken: JwtPayload | null = null;

  openMenu: string | null = null; // currently open menu

  constructor(
    private sidebarService: SidebarService,
    private decodeToken: DecodeToken
  ) { }

  ngOnInit(): void {
    this.decodedToken = this.decodeToken.decodeToken(sessionStorage.getItem('jwt'));
    console.log(this.decodedToken)


  }

  



  toggleMenu(menu: string) {
    this.openMenu = this.openMenu === menu ? null : menu;
  }

onLinkClick() {
  if (window.innerWidth <= 1000) {
    this.sidebarService.closeSidebar();
  }
}

login() {
  sessionStorage.clear()
}

}
