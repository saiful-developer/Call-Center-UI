import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
//components
import { SidebarComponent } from '../../shared/sidebar/sidebar';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { FloatingActionBtn } from '../../shared/floating-action-btn/floating-action-btn';
import { Loader } from '../../../shared/loader/loader';
import { LoderService } from '../../../services/loder.service';

//them loder service
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-agent-layout',
  imports: [RouterOutlet, CommonModule, SidebarComponent, Header, Footer, FloatingActionBtn],
  templateUrl: './agent-layout.html',
  styleUrl: './agent-layout.css'
})
export class AgentLayout implements OnInit {

  isSidebarOpen: boolean = false;
  isMobileSidebarVisible: boolean = false;
  isMobile: boolean = false;


  currentRoute = '';

  constructor(
    private router: Router,
    private loader: LoderService,
    private themeService: ThemeService

  ) {
    //router subscription
    //store the current route
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) => {
    //   this.currentRoute = event.urlAfterRedirects;
    // });

    //for showing app loader
    //subscribed to router.events so the loader will triggered
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loader.show();
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loader.hide(500); // hold for smooth fade
      }
    });
  }

  // getter method
  //for blocking header and footer
  //check the currentRoute true block header and footer becase login page dose not need header and footer
  // get isAuthRoute(): boolean {
  //   return this.currentRoute === '/login' ||
  //     this.currentRoute === '/logout' ||
  //     this.currentRoute === '/';
  // }

  ngOnInit(): void {
    // this.SidebarService.sidebarVisible$.subscribe((isSidebarVisible) => {
    //   console.log('Sidebar visibility:', isSidebarVisible);
    //   this.isSidebarVisible = isSidebarVisible;
    // });

    const storedValue = sessionStorage.getItem('isSidebarOpen-agent');
    this.isSidebarOpen = storedValue ? JSON.parse(storedValue) : false;

    if (!storedValue) {
      sessionStorage.setItem('isSidebarOpen-agent', JSON.stringify(this.isSidebarOpen));
    }

    //detect mobile screen size
    this.checkDevice();
    window.addEventListener('resize', () => this.checkDevice());


    this.themeService.loadTheme('agent');
  }

  ngOnDestroy(): void {
    this.themeService.clearTheme();
  }

  //check screen size for mobile
  checkDevice() {
    this.isMobile = window.innerWidth <= 1000;
    if (this.isMobile) {
      this.isSidebarOpen = false; // Collapse sidebar on mobile by default
      sessionStorage.setItem('isSidebarOpen-agent', JSON.stringify(this.isSidebarOpen));
    }
  }

  toggleSidebar(): void {
    if (this.isMobile) {
      this.isMobileSidebarVisible = !this.isMobileSidebarVisible; // overlay on mobile
    } else {
      this.isSidebarOpen = !this.isSidebarOpen; // desktop toggle
      sessionStorage.setItem('isSidebarOpen-agent', JSON.stringify(this.isSidebarOpen));
    }
  }

  // onMobileToggleSidebar() {
  //   this.isMobileSidebarVisible = !this.isMobileSidebarVisible;

  //   // Prevent background scroll when mobile sidebar is open
  //   document.body.classList.toggle('sidebar-active', this.isMobileSidebarVisible);
  // }

}