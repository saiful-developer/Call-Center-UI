import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';
//components
import { PageHeader } from '../../shared/page-header/page-header';
import { Paginator } from '../../shared/paginator/paginator';
import { CommonModule } from '@angular/common';

export interface AbandonReportsData {
  uniqueid: string,
  enterqueue_time: string,
  src: string,
  dst: string,
  campaign: string,
  caller_queue_time: number,
  hangup_time: string
}

@Component({
  selector: 'app-abandon-reports',
  imports: [PageHeader, Paginator, CommonModule, StickyTableHeaderDirective],
  templateUrl: './abandon-reports.html',
  styleUrl: './abandon-reports.css'
})
export class AbandonReports implements OnInit {

  abandonReportsData: AbandonReportsData[] = [];
  campains: string[] = [];
  sl = 0;
  offset = 0;
  limit = 30;
  hasMore = true;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadCampainList()
  }

  loadAbandonReports() {
    //get user id or agent
    let agent = '';
    const userInfo = sessionStorage.getItem('user')
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo)
      agent = parsedUserInfo.loginid;
    }

    // agent, this.campains, this.limit, this.offset
    this.apiService.abandonReports(agent, this.campains, this.limit, this.offset).subscribe({
      next: (res) => {
        this.formatAbandonReportData(res)
        console.log(res)
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    })
  }

  loadCampainList() {
    this.apiService.loadCampaigns().subscribe({
      next: (res: any) => {

        const parseCampainData = JSON.parse(res.data);

        this.campains = parseCampainData.rows.map((row: any) => row.campaign_id);

        this.loadAbandonReports();
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  //for initial load and search result
  formatAbandonReportData(res: any) {

    if (res.success === 'YES' && res.data) {
      let rows: AbandonReportsData[] = [];
      let totalCount = 0;

      // Check if res.data is a string (initial load)
      if (typeof res.data === 'string') {
        const parsedData = JSON.parse(res.data); // { count, rows }
        if (parsedData && Array.isArray(parsedData.rows)) {
          rows = parsedData.rows;
          totalCount = parsedData.count;
        }
      }
      // If res.data is already an array (search)
      else if (Array.isArray(res.data)) {
        rows = res.data;
        totalCount = res.count;
      }

        this.abandonReportsData = res.data.map((item: AbandonReportsData) => ({
          uniqueid: item.uniqueid || '-',
          enterqueue_time: item.enterqueue_time || '-',
          src: item.src,
          dst: item.dst || '-',
          campaign: item.campaign || '-',
          caller_queue_time: item.caller_queue_time || '-',
          hangup_time: item.hangup_time || '-',
        }));
        
        this.hasMore = (this.offset + this.limit) < totalCount;

      this.cdr.detectChanges();
    } else {
      this.abandonReportsData = [];
      this.hasMore = false;
    }
  }

  nextPage() {
    this.offset += this.limit;
    this.sl += this.limit;

    this.loadAbandonReports(); // fetch next page of default list

  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.sl -= this.limit;
      this.loadAbandonReports(); // fetch next page of default list
    }
  }

}
