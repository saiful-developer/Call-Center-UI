import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { SidebarService } from '../../services/sidebar-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {

  isFullscreen: boolean = false;

  name = signal('Saiful Islam');
  role = signal('Agent');

  // @Output() toggleSidebar = new EventEmitter<void>();

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = !!document.fullscreenElement;
      console.log('Fullscreen changed:', this.isFullscreen);
    });
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  @Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidebar() {

    console.log('Toggle clicked'); // Debug log
    this.sidebarService.toggleSidebar()
  }



}
