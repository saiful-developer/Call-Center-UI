import { Component, OnInit } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { ThinSidebar } from '../../shared/thin-sidebar/thin-sidebar';
import { Header } from '../../shared/header/header';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Loader } from '../../../shared/loader/loader';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-supervisor-layout',
  imports: [Sidebar, ThinSidebar, Header, RouterOutlet, CommonModule, Loader],
  templateUrl: './supervisor-layout.html',
  styleUrl: './supervisor-layout.css'
})
export class SupervisorLayout implements OnInit {
  isSidebarOpen: boolean = false;
  isMobile: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.loadTheme('supervisor');

    const storedValue = sessionStorage.getItem('isSidebarOpen');
    this.isSidebarOpen = storedValue ? JSON.parse(storedValue) : false;

    if (!storedValue) {
      sessionStorage.setItem('isSidebarOpen', JSON.stringify(this.isSidebarOpen));
    }

    // Detect mobile screen size
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 576;
    if (this.isMobile) {
      this.isSidebarOpen = false; // Collapse sidebar on mobile by default
      sessionStorage.setItem('isSidebarOpen', JSON.stringify(this.isSidebarOpen));
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    sessionStorage.setItem('isSidebarOpen', JSON.stringify(this.isSidebarOpen));
  }

  ngOnDestroy(): void {
    this.themeService.clearTheme();
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
  }
}