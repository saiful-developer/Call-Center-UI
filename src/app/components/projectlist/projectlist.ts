import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { PageHeader } from '../page-header/page-header';
import { Paginator } from '../paginator/paginator';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
export interface IncomingReportAPI {
  uniqueid: string;
  calldate?: string;
  src: string;
  dst?: string;
  campaign?: string;
  caller_queue_time?: number;
  connect_ring_time?: number;
  caller_agent_talk_time?: string;
  transfer_to?: string;
  completecaller?: number;
  disposition?: string;
  status: number
}




@Component({
  selector: 'app-projectlist',
  imports: [HttpClientModule, ReactiveFormsModule, PageHeader, Paginator, CommonModule],
  templateUrl: './projectlist.html',
  styleUrl: './projectlist.css'
})
export class Projectlist implements OnInit {
  isSearchMode = false;
  sl = 0;
  incomingReportsData: IncomingReportAPI[] = [];
  campains: any[] = [];

  offset = 0;
  limit = 30;
  hasMore = true;

  constructor(
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
  ) { }

  getIncomingReport(): void {
    //get loginid form the sesson storage

    let user = '';
    const userInfo = sessionStorage.getItem('user')
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo)
      user = parsedUserInfo.loginid;
    }

    this.apiService.incomingReport(user, this.limit, this.offset).subscribe({
      next: (res) => {
        this.formatIncomingReportsData(res);
      },
      error: err => console.error('Error fetching project data:', err)
    });
  }

  loadCampainList() {
    this.apiService.loadCampaigns().subscribe({
      next: (res: any) => {

        const parseCampainData = JSON.parse(res.data);
        this.campains = parseCampainData.rows;
      },
      error: (err) => {

      }
    })
  }



  ngOnInit() {
    this.getIncomingReport()
    this.loadCampainList()
    this.getIncomingBySearch()
  }

  nextPage() {
    this.offset += this.limit;
    this.sl += this.limit;
    if (this.isSearchMode) {
      this.getIncomingBySearch(); // fetch next page of search results
    } else {
      this.getIncomingReport(); // fetch next page of default list
    }
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.sl -= this.limit;
      if (this.isSearchMode) {
        this.getIncomingBySearch(); // fetch next page of search results
      } else {
        this.getIncomingReport(); // fetch next page of default list
      }
    }
  }

  resetSearch() {
    this.searchFormIncoming.reset();
    this.offset = 0;
    this.sl = 0;
    this.isSearchMode = false;
    this.getIncomingReport();
  }

  //reactive form
  searchFormIncoming = new FormGroup({
    caller: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl(''),
    status: new FormControl('')
  });

  getIncomingBySearch() {

    // this.sl = 0;
    // this.offset = 0
    this.isSearchMode = true

    let agent = '';
    const campain = this.searchFormIncoming.value.campain || '';
    const fromDate = this.searchFormIncoming.value.fromDate || '';
    const toDate = this.searchFormIncoming.value.toDate || '';
    const srcNameber = this.searchFormIncoming.value.caller || '';
    const status = this.searchFormIncoming.value.status || '';

    const userInfo = sessionStorage.getItem('user')
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo)
      agent = parsedUserInfo.loginid;
    }

    this.apiService.incomingBySearch(agent, campain, fromDate, toDate, srcNameber, status, this.limit, this.offset, 1).subscribe({
      next: (res) => {
        this.formatIncomingReportsData(res);
        console.log(res);
        
      },
      error: (err) => {
        console.log(err)
      }
    })
  }




  pagedListFromChild: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;  // default page size, should match your paginator's pageSize

  handlePageChange(event: { pagedList: any[], currentPage: number, pageSize: number }) {
    this.pagedListFromChild = event.pagedList;
    this.currentPage = event.currentPage;
    this.pageSize = event.pageSize;
  }

  //for initial load and search result
  formatIncomingReportsData(res: any) {
    if (res.success === 'YES' && Array.isArray(res.data)) {
      this.incomingReportsData = res.data.map((item: IncomingReportAPI, index: number) => ({
        sl: this.offset + index + 1,
        uniqueid: item.uniqueid,
        calldate: item.calldate || '',
        src: item.src,
        dst: item.dst || '',
        campaign: item.campaign || '',
        caller_queue_time: item.caller_queue_time || '',
        connect_ring_time: item.connect_ring_time || '',
        caller_agent_talk_time: item.caller_agent_talk_time || '',
        transfer_to: item.transfer_to ? 'Yes' : 'No',
        completecaller: item.completecaller || '',
        disposition: item.disposition || '',
        status: item.status || ''
      }));
    } else {
      this.incomingReportsData = [];
    }

    this.cdr.detectChanges();
  }

}
