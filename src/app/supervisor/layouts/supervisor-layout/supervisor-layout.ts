import { Component, OnInit } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { ThinSidebar } from '../../shared/thin-sidebar/thin-sidebar';
import { Header } from '../../shared/header/header';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Loader } from '../../../shared/loader/loader';
import { ThemeService } from '../../../services/theme.service';
import { LoderService } from '../../../services/loder.service';

@Component({
  selector: 'app-supervisor-layout',
  imports: [Sidebar, ThinSidebar, Header, RouterOutlet, CommonModule, Loader],
  templateUrl: './supervisor-layout.html',
  styleUrl: './supervisor-layout.css'
})
export class SupervisorLayout implements OnInit {
  isSidebarOpen: boolean = false;
  isMobile: boolean = false;
  isMobileSidebarVisible = false;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private loader: LoderService
  ) {

    //for showing app loader
    //subscribed to router.events so the loader will triggere
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loader.show();
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loader.hide(500); // hold for smooth fade
      }
    });
  }

  ngOnInit(): void {
    this.themeService.loadTheme('supervisor');

    const storedValue = sessionStorage.getItem('isSidebarOpen');
    this.isSidebarOpen = storedValue ? JSON.parse(storedValue) : false;

    if (!storedValue) {
      sessionStorage.setItem('isSidebarOpen', JSON.stringify(this.isSidebarOpen));
    }

    // Detect mobile screen size
    this.checkDevice();
    window.addEventListener('resize', () => this.checkDevice());
  }



  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 576;
    if (this.isMobile) {
      this.isSidebarOpen = false; // Collapse sidebar on mobile by default
      sessionStorage.setItem('isSidebarOpen', JSON.stringify(this.isSidebarOpen));
    }
  }

toggleSidebar(): void {
  if (this.isMobile) {
    this.isMobileSidebarVisible = !this.isMobileSidebarVisible; // overlay on mobile
  } else {
    this.isSidebarOpen = !this.isSidebarOpen; // desktop toggle
    sessionStorage.setItem('isSidebarOpen', JSON.stringify(this.isSidebarOpen));
  }
}

  ngOnDestroy(): void {
    this.themeService.clearTheme();
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
  }

checkDevice() {
  this.isMobile = window.innerWidth <= 992;
  if (this.isMobile) {
    this.isSidebarOpen = false; // collapse desktop sidebar on mobile
    this.isMobileSidebarVisible = false;
  }
}


}