import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { SidebarService } from '../../services/sidebar-service';
import { CommonModule, NgClass } from '@angular/common';
import { AgentData, JwtPayload } from '../../models/agent.model';

import { UserService } from '../../services/user.service';
// import { NgIf } from "../../../../node_modules/@angular/common/common_module.d";


@Component({
  selector: 'app-header',
  imports: [NgClass, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {

  isFullscreen: boolean = false;
  decodedToken: JwtPayload | null = null;

  //get user data using behaviorsubject 

  

  

  // @Output() toggleSidebar = new EventEmitter<void>();

  constructor(
    private sidebarService: SidebarService,
    private userService: UserService
  ) {

    // console.log(this.agentData$)
  }

  ngOnInit() {
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = !!document.fullscreenElement;
      console.log('Fullscreen changed:', this.isFullscreen);
    });

    this.decodedToken = this.userService.decodeToken(sessionStorage.getItem('jwt'));

  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  @Output() toggleSidebar = new EventEmitter<void>();

  sidebaropen: boolean = true;

  onToggleSidebar() {

    this.sidebaropen = !this.sidebaropen;

    // if(this.sidebaropen) {
    //   document.getElementById('bigLogo')?.classList.add('removeLogo');
    // }

    console.log('Toggle clicked'); // Debug log
    this.sidebarService.toggleSidebar()
  }



}


