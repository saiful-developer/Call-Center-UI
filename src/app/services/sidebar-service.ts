import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggle$: any;
  static role() {
    throw new Error('Method not implemented.');
  }


  name = signal('Saiful Islam');
  role = signal('Agent');

  private sidebarVisible = new BehaviorSubject<boolean>(false);
  sidebarVisible$ = this.sidebarVisible.asObservable();
  
  toggleSidebar() {
    this.sidebarVisible.next(!this.sidebarVisible.value);
  }

    closeSidebar() {
    this.sidebarVisible.next(false);
  }
}