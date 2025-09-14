import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  standalone: true,
  imports: [CommonModule]
})
export class Header {
  ismobile: boolean = false
  //check mobile display size
  displayOffMenuButton() {
    if(window.innerWidth <= 1000) {
      this.ismobile = true;
    }
  }


  @Input() isSidebarOpen: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidebar() {
    console.log('Header: Emitting toggleSidebar event');
    this.toggleSidebar.emit();
  }
}