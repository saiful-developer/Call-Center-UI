import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
//components
import { SidebarComponent } from '../../shared/sidebar/sidebar';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { SidebarService } from '../../../services/sidebar-service';
import { ShortSicebar } from '../../shared/short-sicebar/short-sicebar';
import { FloatingActionBtn } from '../../shared/floating-action-btn/floating-action-btn';
import { Loader } from '../../../shared/loader/loader';
import { LoderService } from '../../../services/loder.service';

//them loder service
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-agent-layout',
  imports: [RouterOutlet, CommonModule, SidebarComponent, Header, Footer, ShortSicebar, FloatingActionBtn, Loader],
  templateUrl: './agent-layout.html',
  styleUrl: './agent-layout.css'
})
export class AgentLayout implements OnInit {


  isSidebarVisible = false;
  currentRoute = '';

  constructor(
    private SidebarService: SidebarService,
    private router: Router,
    private loader: LoderService,
    private themeService: ThemeService

  ) {
    //router subscription
    //store the current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
    });

    //table header fixed
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loader.show();
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loader.hide(300); // hold for smooth fade
      }
    });
  }

  // getter method
  //for blocking header and footer
  //check the currentRoute true block header and footer becase login page dose not need header and footer
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

    this.themeService.loadTheme('agent');
  }

  ngOnDestroy(): void {
    this.themeService.clearTheme();
  }

}