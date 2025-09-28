import { Component, OnInit } from '@angular/core';
import { PageHeader } from "../../shared/page-header/page-header";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Paginator } from "../../shared/paginator/paginator";
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';
import { ApiService } from '../../services/api.service';

export interface BreakRecords {
  agent: string
  queuename: string
  extension: string
  pause_code: number
  pause_time: string
  unpause_time?: string | null
  unpause_sec?: number | null
  last_response_time: string
}


@Component({
  selector: 'app-break',
  imports: [PageHeader, CommonModule, ReactiveFormsModule, Paginator, StickyTableHeaderDirective],
  templateUrl: './break.html',
  styleUrl: './break.css'
})
export class Break implements OnInit {
  campaignList: string[] = [];
  breakReportList: BreakRecords[] = [];
  isSearchMode: boolean = false;
  offset: number = 0;
  limit: number = 50;
  sl: number = 0;
  page: number = 1;
  count: number = 0;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getCampains();
    this.getBreak();

  }

  getBreak() {
    let agent = '';

    this.api.breakReports(agent, this.campaignList, this.limit, this.offset).subscribe({
      next: (res) => {
        console.log(res);
        
        this.formateBreakData(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  today = new Date().toISOString().split('T')[0];
  searchFormBreak = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl('')
  });

  getBreakOnFilter() {

    this.isSearchMode = true;

    // Check fromDate
    if (!this.searchFormBreak.get('fromDate')?.value) {
      this.searchFormBreak.get('fromDate')?.setValue(this.today);
    }

    // Check toDate
    if (!this.searchFormBreak.get('toDate')?.value) {
      this.searchFormBreak.get('toDate')?.setValue(this.today);
    }

    const fromDate = this.searchFormBreak.value.fromDate || this.today
    const toDate = this.searchFormBreak.value.toDate || this.today
    const campaign = this.searchFormBreak.value.campain || '';
    let agent = '';

    this.api.breakReportOnFilter(agent, campaign, this.campaignList, fromDate, this.limit, this.offset, 1 , toDate).subscribe({
      next: (res) => {
        this.formateBreakData(res);
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })

  }

  resetSearch() {
    this.searchFormBreak.reset();
    this.page = 1;
    this.offset = 0;
    this.sl = 0;
    this.count = 0;
    this.isSearchMode = false;
    this.getBreak();
  }


  // for initial load and search result
  formateBreakData(res: any) {
    if (res.success === 'YES' && res.data) {
      let rows: BreakRecords[] = [];
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
      this.breakReportList = rows.map((item: BreakRecords) => ({
        agent: item.agent || '-',
        queuename: item.queuename || '-',
        extension: item.extension || '-',
        pause_code: item.pause_code || 0,
        pause_time: item.pause_time || '-',
        unpause_time: item.unpause_time || null,
        unpause_sec: item.unpause_sec || 0,
        last_response_time: item.last_response_time || '-'
      }));

    } else {
      this.breakReportList = [];
    }
  }

  //new paginatin format
  onPageChange(newOffset: number) {

    this.offset = newOffset;
    console.log(this.offset);

    this.page = Math.floor(this.offset / this.limit) + 1; // page in sync
    console.log("offset:", this.offset, "page:", this.page);


    this.isSearchMode ? this.getBreakOnFilter() : this.getBreak(); //load data based on serch or not
  }

  getCampains() {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const parsedCampains = JSON.parse(userData);
      this.campaignList = parsedCampains.campaigns;
    }

    return;
  }

}