import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

import { SidebarComponent } from './components/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { SidebarService } from './services/sidebar-service';
import { ShortSicebar } from "./components/short-sicebar/short-sicebar";
import { FloatingActionBtn } from './components/floating-action-btn/floating-action-btn';




// import { AgentBreadcrumbs } from './user-agent/agent-breadcrumbs/agent-breadcrumbs';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, SidebarComponent, Header, Footer, ShortSicebar, FloatingActionBtn],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {

  isSidebarVisible = false;
  currentRoute = '';

  constructor(
    private SidebarService: SidebarService,
    private router: Router

  ) {
    //router subscription
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
    });
  }

  // ADD this getter method
  get isAuthRoute(): boolean {
    return this.currentRoute === '/login' ||
      this.currentRoute === '/logout' ||
      this.currentRoute === '/';
  }

  ngOnInit(): void {
    this.SidebarService.sidebarVisible$.subscribe((isSidebarVisible) => {
      console.log('Sidebar visibility:', isSidebarVisible);
      this.isSidebarVisible = isSidebarVisible;
    });
  }




}

