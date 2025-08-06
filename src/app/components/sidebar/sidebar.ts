import { Component, HostListener, OnInit, signal } from '@angular/core';
import { Signal } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar-service';
import { AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';


declare var bootstrap: any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})

export class SidebarComponent implements OnInit {

  name = signal('Saiful Islam');
  role = signal('Agent');

  isSidebarVisible = true;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.sidebarService.sidebarVisible$.subscribe((isSidebarVisible) => {
      console.log('Sidebar visibility:', isSidebarVisible); // Debug log
      this.isSidebarVisible = !isSidebarVisible;
    });
  }

  onToggleSidebar() {

    if (window.innerWidth <= 1000) {
      console.log('Toggle clicked'); // Debug log
      this.sidebarService.toggleSidebar();
    }
  }


}