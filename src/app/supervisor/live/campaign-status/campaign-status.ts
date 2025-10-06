import { Component, OnInit } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';
import { Paginator } from '../../shared/paginator/paginator';
import { CommonModule } from '@angular/common';
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';

import { ApiService } from '../../services/api.service';

import { SocketService } from '../../../services/socket.service';
import { Router } from '@angular/router';

export interface CampainStatusData {
  campaign: string,
  agentCount: number,
  readyCount: number,
  busyCount: number,
  breakCount?: number,
  inCallCount: number,
  outCallCount: number
}

@Component({
  selector: 'app-campaign-status',
  imports: [PageHeader, Paginator, CommonModule, StickyTableHeaderDirective],
  templateUrl: './campaign-status.html',
  styleUrl: './campaign-status.css'
})
export class CampaignStatus implements OnInit {
  offset: number = 0;
  limit: number = 50;
  sl: number = 0
  hasMore: boolean = true;

  totalCount: number = 0;

  campainStatus: CampainStatusData[] = []

  constructor(
    private api: ApiService,
    private router: Router,
    private socketServer: SocketService
  ) { }


  //call back function
  continuousMessageHandler = (msg: string) => {
    console.log('Continuous:', msg);
  }

  ngOnInit(): void {

    // listen to continuous messages
    this.socketServer.onContinousMessage(this.continuousMessageHandler);

    // tell server the supervisor is on this route
    this.socketServer.emitSupervisorRoute(this.router.url);




    this.calculateCampainStatus()
    this.api.activeExtentation().subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)


    });
  }



  // destroy when i leave the route 
  ngOnDestroy() {
    this.socketServer.offContinousMessage(this.continuousMessageHandler)
    // this.socketServer.emitSupervisorRoute('');
  }



  calculateCampainStatus() {
    this.api.agentStatus().subscribe({
      next: (res) => {
        console.log(res);
        this.formateData(res);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  formateData(res: any) {
    if (res.success === 'YES' && res.data) {
      let rows = [];

      //check response is json or not
      if (typeof res.data === 'string') {
        //consvert json to object
        const parsedData = JSON.parse(res.data);

        if (parsedData && Array.isArray(parsedData)) {
          rows = parsedData;
        }
      }

      //if res.data is already array of obj
      else if (Array.isArray(res.data)) {
        rows = res.data
      }
      this.getCampainStatus(rows);

      this.hasMore = (this.offset + this.limit) < this.totalCount;
    } else {
      this.campainStatus = [];
      this.hasMore = false;
    }
  }


  getCampainStatus(rows: any[]) {
    const status: any = {};

    rows.forEach(agent => {

      agent.campaigns.forEach((campaign: string) => {

        if (!status[campaign]) {

          //set values for the first time
          status[campaign] = {
            campaign: campaign,
            agentCount: 0,
            readyCount: 0,
            busyCount: 0,
            breakCount: 0,
            inCallCount: 0,
            outCallCount: 0
          };

        }

        status[campaign].agentCount++;

        if (agent.agentStatus === "BUSY") status[campaign].busyCount++;
        if (agent.agentStatus === "READY") status[campaign].readyCount++;
        if (agent.agentStatus === "BREAK") status[campaign].breakCount++;


        if (agent.callType === 'IN') status[campaign].inCallCount++;
        if (agent.callType === 'OUT') status[campaign].outCallCount++;


      })
    })

    //all values of obj to array
    this.campainStatus = Object.values(status);

  }


  onPageChange(newOffset: number) {
    this.offset = newOffset;
    this.calculateCampainStatus();
  }
}
