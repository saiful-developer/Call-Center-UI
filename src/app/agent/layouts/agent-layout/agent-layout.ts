import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
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
import { SocketService, IncomingMessage } from '../../../services/socket.service';
import { MessageSnackbarService } from '../../services/message-snackbar.service';

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

  campaingList: string[] = [];
  message: IncomingMessage[] = [];


  currentRoute = '';

  constructor(
    private router: Router,
    private loader: LoderService,
    private themeService: ThemeService,
    private socketService: SocketService,
    private snackbar: MessageSnackbarService

  ) {

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

  ngOnInit(): void {

    this.getCampainList();
    this.listenMessage();







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





  // socket connection

  getCampainList(): void {
    const user = sessionStorage.getItem('user');

    if (user) {
      const parsedUser = JSON.parse(user);
      this.campaingList = parsedUser.campaigns;

      this.joinMyCampaings();

    }
  }


  joinMyCampaings() {
    this.socketService.joinCampaings(this.campaingList);
    console.log('inside join');

  }


  //listen to incoming message
  listenMessage() {
    this.socketService.onMessage((msg) => {
      this.displayMessage(msg);
    });
  }


  displayMessage(msg: IncomingMessage) {
    this.message.push(msg);
    this.snackbar.showMessage(`${msg.sender}:  ${msg.message}`);
    // sessionStorage.setItem('message', JSON.stringify(this.message));
  }


}