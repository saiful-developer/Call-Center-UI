import { Component, NgZoneOptions, OnInit } from '@angular/core';
import { PageHeader } from "../../shared/page-header/page-header";
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';
import { Paginator } from "../../shared/paginator/paginator";
import { TimeScale } from 'chart.js';
import { ApiService } from '../../services/api.service';
import { CampainStatus } from '../../../agent/live/campain-status/campain-status';

export interface AbandonCallRecords {
  uniqueid: string;
  calldate: string;
  src: string;
  dst: string;
  campaign: string;
  enterqueue_time: string;
  caller_queue_time: number;
  hangup_time: string;
}

@Component({
  selector: 'app-abandon',
  imports: [PageHeader, ReactiveFormsModule, DatePipe, CommonModule, StickyTableHeaderDirective, Paginator],
  templateUrl: './abandon.html',
  styleUrl: './abandon.css'
})
export class Abandon implements OnInit {
  abandonReportsData: AbandonCallRecords[] = [];
  campaignList: string[] = [];
  agnet: string = '';
  isSearchMode: boolean = false;
  sl: number = 0;
  offset: number = 0;
  limit: number = 50;
  page: number = 1;
  hasMore: boolean = true;
  count: number = 0;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getAbandonCall();
    this.getCampainsAndAgent();
  }

  getAbandonCall() {
    this.api.abandonCallReport(this.agnet, this.campaignList, this.limit, this.offset).subscribe({
      next: (res) => {
        console.log(res);
        this.formateAbandonCallData(res);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }



  today = new Date().toISOString().split('T')[0];
  searchFormAbandonReport = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl('')
  });


  getAbandonReportOnFilter() {
    this.isSearchMode = true;

    // Check fromDate
    if (!this.searchFormAbandonReport.get('fromDate')?.value) {
      this.searchFormAbandonReport.get('fromDate')?.setValue(this.today);
    }

    // Check toDate
    if (!this.searchFormAbandonReport.get('toDate')?.value) {
      this.searchFormAbandonReport.get('toDate')?.setValue(this.today);
    }

    const fromDate = this.searchFormAbandonReport.value.fromDate || this.today
    const toDate = this.searchFormAbandonReport.value.toDate || this.today
    const campaign = this.searchFormAbandonReport.value.campain || '';

    this.api.abandonCallReportOnFilter('', campaign, this.campaignList, fromDate, this.limit, this.offset, this.page, toDate).subscribe({
      next: (res) => {
        console.log(res);
        this.formateAbandonCallData(res);
      },
      error: (res) => {
        console.log(res);

      }
    })

  }

  resetSearch() {
    this.searchFormAbandonReport.reset();
    this.page = 1;
    this.offset = 0;
    this.sl = 0;
    this.count = 0;
    this.isSearchMode = false;
    this.getAbandonCall();
  }

  nextPage() {
    this.page++;
    this.offset += this.limit;
    this.sl += this.limit;
    if (this.isSearchMode) {
      this.getAbandonReportOnFilter();
    } else {
      this.getAbandonCall();

    }
  }
  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.sl -= this.limit;
      if (this.isSearchMode) {
        this.getAbandonReportOnFilter();
      } else {
        this.getAbandonCall();
      }
    }
  }

  onPageChange(newOffset: number) {
  this.offset = newOffset;
  this.isSearchMode ? this.getAbandonReportOnFilter() : this.getAbandonCall(); //load data based on serch or not
}


  // for initial load and search result
  formateAbandonCallData(res: any) {
    if (res.success === 'YES' && res.data) {
      let rows: AbandonCallRecords[] = [];
      this.sl = this.offset;

      // Check if res.data is a string (initial load)
      if (typeof res.data === 'string') {
        const parsedData = JSON.parse(res.data); // { count, rows }
        if (parsedData && Array.isArray(parsedData.rows)) {
          rows = parsedData.rows;
          this.count = parsedData.count;
        }
      }
      // If res.data is already an array
      else if (Array.isArray(res.data)) {
        rows = res.data;
        this.count = res.count;
      }

      console.log(rows);


      // map  table format
      this.abandonReportsData = rows.map((item: AbandonCallRecords) => ({
        uniqueid: item.uniqueid || '-',
        calldate: item.calldate || '-',
        src: item.src || '-',
        dst: item.dst || '-',
        campaign: item.campaign || '-',
        enterqueue_time: item.enterqueue_time || '-',
        caller_queue_time: item.caller_queue_time || 0,
        hangup_time: item.hangup_time || '-'
      }));

    } else {
      this.abandonReportsData = [];
      this.hasMore = false;
    }
  }


  getCampainsAndAgent() {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const parsedCampains = JSON.parse(userData);
      this.campaignList = parsedCampains.campaigns;
      this.agnet = parsedCampains.loginid;
    }

    return;
  }
}