  import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';
import { Paginator } from '../../shared/paginator/paginator';
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

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
  selector: 'app-campain-status',
  imports: [PageHeader, Paginator, StickyTableHeaderDirective, CommonModule],
  templateUrl: './campain-status.html',
  styleUrl: './campain-status.css'
})
export class CampainStatus implements OnInit {
  limit = 30;
  offset = 0;
  sl = 0;
  hasMore = true;
  totalCount = 0;
  campainStatus: CampainStatusData[] = []

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCampainStatus()
  }

  loadCampainStatus() {
    this.apiService.agentStatus().subscribe({
      next: (res) => {
        console.log(res)
        this.formateData(res)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  formateData(res: any) {
    try {
      if (res.success === 'YES' && res.data) {
        let rows = [];

        // Check if res.data is a string (initial load)
        if (typeof res.data === 'string') {
          const parsedData = JSON.parse(res.data); // { count, rows }



          if (parsedData && Array.isArray(parsedData)) {
            rows = parsedData;

          }
        }
        // If res.data is already an array (search)
        else if (Array.isArray(res.data)) {
          rows = res.data;
        }

        this.getCampainStatus(rows);


        // Update paginator info
        this.hasMore = (this.offset + this.limit) < this.totalCount;
      } else {
        this.campainStatus = [];
        this.hasMore = false;
      }
    } catch (error) {
      console.error(error);
      this.campainStatus = [];
      this.hasMore = false;
    }

    this.cdr.detectChanges();
  }

  getCampainStatus(rows: any[]) {
    const stats: any = {};

    rows.forEach(agent => {
      console.log("call type",agent.callType)
      console.log("agent status", agent.agentStatus)
      
      // console.log('inside the itaration',agent.campaigns);

      agent.campaigns.forEach((campaign: string) => {

       
        
        
        // console.log('inside the itaration', stats);

        if (!stats[campaign]) {
          stats[campaign] = {
            campaign: campaign,
            agentCount: 0,
            readyCount: 0,
            busyCount: 0,
            breakCount: 0,
            inCallCount: 0,
            outCallCount: 0
          };
        }
        
        /*

        [{ [bdcom, broadband] }, { [bdcom] }, { [broadband] }]

        outter loop - 1 --> {  => { [bdcom, broadband] }
          inner loop - 1 -- { => 
            [bdcom]
          }
        }

        //in first inner loop
        stats = {
          camapin: bdcom
        }


        
        
        
        */ 

        

        // Total agents
        stats[campaign].agentCount++;

        // Status counts
        if (agent.agentStatus === "BUSY") stats[campaign].busyCount++;
        if (agent.agentStatus === "READY") stats[campaign].readyCount++;
        if (agent.agentStatus === "BREAK") stats[campaign].breakCount++;


        if(agent.callType === 'IN') stats[campaign].inCallCount++;
        if(agent.callType === 'OUT') stats[campaign].outCallCount++;


        
      });
    });


    this.campainStatus = Object.values(stats);
  }






  nextPage() {

  }

  prevPage() {

  }

}
