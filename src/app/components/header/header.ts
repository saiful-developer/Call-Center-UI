import { Component, EventEmitter, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { SidebarService } from '../../services/sidebar-service';
import { CommonModule, NgClass } from '@angular/common';
import { AgentData, JwtPayload } from '../../models/agent.model';
import { ApiService } from '../../services/api.service';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
//components
import { UserService } from '../../services/user.service';
import { LogoutModal } from '../logout-modal/logout-modal';





@Component({
  selector: 'app-header',
  imports: [NgClass, CommonModule, LogoutModal, FormsModule, ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, OnDestroy {

  isFullscreen: boolean = false;
  decodedToken: JwtPayload | null = null;

  seconds: number = 0;
  intervalId: any;

  //get user data using behaviorsubject 





  // @Output() toggleSidebar = new EventEmitter<void>();

  constructor(
    private sidebarService: SidebarService,
    private userService: UserService,
    private apiService: ApiService
  ) {

    // console.log(this.agentData$)
  }

  ngOnInit() {
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = !!document.fullscreenElement;
      console.log('Fullscreen changed:', this.isFullscreen);
    });

    this.decodedToken = this.userService.decodeToken(sessionStorage.getItem('jwt'));
    console.log(sessionStorage.getItem('jwt'));


    this.loadBreakType()

    this.getCampains()


    // Load previous session time if exists
    const storedSeconds = sessionStorage.getItem('timerSeconds');
    if (storedSeconds) {
      this.seconds = +storedSeconds;
    }

    // Load showActionUI state
    const showUI = sessionStorage.getItem('showActionUI');
    this.showActionUI = showUI === 'true'; // convert string to boolean

    // if UI was open start timer
    if (this.showActionUI) {
      this.startTimer();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }





  //****get break type form api*****
  parseResData: any[] = [];
  breakCount: number = 0;
  loadBreakType() {
    this.apiService.breakType().subscribe({
      next: (res: any) => {
        const parseRes = JSON.parse(res.data);
        this.breakCount = parseRes.count;
        this.parseResData = parseRes.rows;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  // Header Break form
  getBreakTypeForm = new FormGroup({
    breakId: new FormControl('')
  });



  saveBreakData() {
    const selecetedBreakId = this.getBreakTypeForm.get('breakId')?.value;
    this.needToDoSomthingWithThisId(selecetedBreakId);
  }

  needToDoSomthingWithThisId(breakIdParameter: string | undefined | null): any {
    if (!breakIdParameter) return undefined;
    console.log(breakIdParameter);

  }

  //show ui after click campain
  showActionUI: boolean = false;
  showActionUIFn() {
    this.showActionUI = true;
    sessionStorage.setItem('showActionUI', 'true'); // persist state
  }

  hideActionUIFn() {
    console.log(sessionStorage.getItem('timerSeconds'))
    this.showActionUI = false;
    sessionStorage.setItem('showActionUI', 'false'); // persist state

    clearInterval(this.intervalId);
    this.seconds = 0; // reset display
  }


  //campain list for dropdown
  campainList: string[] = [];
  getCampains() {
    const jsonString = sessionStorage.getItem('user')
    if (jsonString) {
      const obj = JSON.parse(jsonString);
      console.log(obj.campaigns);
      this.campainList = obj.campaigns;
    }
  }

  // get form data
  getCampainForm = new FormGroup({
    campainName: new FormControl('')
  });

  saveCampainData() {
    const selecetdCampain: any = this.getCampainForm.get('campainName')?.value;
    this.needToDoSomthingWithThisCamapin(selecetdCampain);

    this.showActionUIFn(); // show UI
    this.startTimer(); // start counting

  }



  needToDoSomthingWithThisCamapin(campainName: string) {
    console.log(campainName);
  }

  startTimer() {
    clearInterval(this.intervalId); // prevent multiple intervals

    this.intervalId = setInterval(() => {
      this.seconds++;
      sessionStorage.setItem('timerSeconds', this.seconds.toString());
    }, 1000);
  }

  get formattedTime(): string {
    const hrs = String(Math.floor(this.seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((this.seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(this.seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  }





  // toggle menu 
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  @Output() toggleSidebar = new EventEmitter<void>();

  sidebaropen: boolean = true;

  onToggleSidebar() {

    this.sidebaropen = !this.sidebaropen;

    // if(this.sidebaropen) {
    //   document.getElementById('bigLogo')?.classList.add('removeLogo');
    // }

    console.log('Toggle clicked'); // Debug log
    this.sidebarService.toggleSidebar()
  }



}


