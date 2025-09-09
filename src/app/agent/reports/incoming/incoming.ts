import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../../shared/page-header/page-header';
import { Paginator } from '../../shared/paginator/paginator';
import { ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';

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
  status: number;
}

@Component({
  selector: 'app-projectlist',
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    PageHeader,
    Paginator,
    StickyTableHeaderDirective //directive
  ],
  templateUrl: './incoming.html',
  styleUrls: ['./incoming.css']
})
export class Incoming implements OnInit {
  isSearchMode = false;
  sl = 0;
  incomingReportsData: IncomingReportAPI[] = [];
  campains: any[] = [];
  offset = 0;
  limit = 30;
  hasMore = true;
  today = new Date().toISOString().split('T')[0];

  searchFormIncoming = new FormGroup({
    caller: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl(''),
    status: new FormControl('')
  });

  constructor(
    private cdr: ChangeDetectorRef,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getIncomingReport();
    this.loadCampainList();
    this.isSearchMode = false;
  }

  getIncomingReport(): void {
    let user = '';
    const userInfo = sessionStorage.getItem('user');
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
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
        console.log(err);
      }
    });
  }

  nextPage() {
    this.offset += this.limit;
    this.sl += this.limit;
    if (this.isSearchMode) {
      this.getIncomingBySearch();
    } else {
      this.getIncomingReport();
    }
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.sl -= this.limit;
      if (this.isSearchMode) {
        this.getIncomingBySearch();
      } else {
        this.getIncomingReport();
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

  getIncomingBySearch() {
    this.isSearchMode = true;

    if (!this.searchFormIncoming.get('fromDate')?.value) {
      this.searchFormIncoming.get('fromDate')?.setValue(this.today);
    }

    if (!this.searchFormIncoming.get('toDate')?.value) {
      this.searchFormIncoming.get('toDate')?.setValue(this.today);
    }

    let agent = '';
    const campain = this.searchFormIncoming.value.campain || '';
    const fromDate = this.searchFormIncoming.value.fromDate || this.today;
    const toDate = this.searchFormIncoming.value.toDate || this.today;
    const srcNameber = this.searchFormIncoming.value.caller || '';
    const status = this.searchFormIncoming.value.status || '';

    const userInfo = sessionStorage.getItem('user');
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      agent = parsedUserInfo.loginid;
    }

    this.apiService.incomingBySearch(agent, campain, fromDate, toDate, srcNameber, status, this.limit, this.offset, 1).subscribe({
      next: (res) => {
        this.formatIncomingReportsData(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

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

  trackByFn(index: number, report: IncomingReportAPI): string {
    return report.uniqueid;
  }
}