import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';


// import { Offcanvas } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { SidebarComponent } from './components/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
// import { AgentDashboard } from "./user-agent/agent-dashboard/agent-dashboard";
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
export class App {

  isSidebarVisible = false;

  constructor(private SidebarService: SidebarService) { }

  ngOnInit(): void {
    this.SidebarService.sidebarVisible$.subscribe((isSidebarVisible) => {
      console.log('Sidebar visibility:', isSidebarVisible); 
      this.isSidebarVisible = isSidebarVisible; 
    });
  }




}

