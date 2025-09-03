import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

//comspnents
import { PageHeader } from '../page-header/page-header';
import { Paginator } from '../paginator/paginator';
import { StickyTableHeaderDirective } from '../../directives/sticky-table-header';

export interface Break {
  queuename: string,
  extension: string,
  pause_code: number,
  pause_time: string,
  unpause_time: string,
  unpause_sec: number,
  last_response_time: string
}


@Component({
  selector: 'app-break-reports',
  imports: [CommonModule, PageHeader, Paginator, ReactiveFormsModule, StickyTableHeaderDirective],
  templateUrl: './break-reports.html',
  styleUrl: './break-reports.css'
})
export class BreakReports implements OnInit {
  agent = '';
  limit = 30;
  offset = 0;
  sl = 0;
  isSearchMode = false;
  hasMore = true;

  campains: any[] = [];
  breakReportList: any[] = [];
  breakTypeList: any[] = [];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadBreakReports()
    this.loadCampainList()
    this.loadBreakType()
  }

  loadBreakReports() {
    const userAgent = this.getAgent();
    this.apiService.BreakReports(userAgent, this.limit, this.offset).subscribe({
      next: (res) => {
        this.formateBreakData(res);
        // console.log(res)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadBreakType() {
    this.apiService.breakType().subscribe({
      next: (res: any) => {
        // console.log(res)
        const parseRes = JSON.parse(res.data);
        console.log(parseRes.rows)
        this.getBreakNameMapping(parseRes.rows)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getBreakNameMapping(breakTypeObjList: any[]) {
    console.log('initital list', this.breakReportList);

    //create a map from breakType IDs to names
    const breakTypeMap = new Map<number, string>();
    breakTypeObjList.forEach(bt => breakTypeMap.set(bt.id, bt.name));
    console.log('new break map', breakTypeMap)

    // Step 2: add breakName to each report
    this.breakReportList = this.breakReportList.map(report => ({
      ...report,
      breakName: breakTypeMap.get(report.pause_code) || "Unknown Break"
    }));

    console.log('final list', this.breakReportList);
  }


  getAgent(): string {
    const userInfo = sessionStorage.getItem('user')
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo)
      this.agent = parsedUserInfo.loginid;
      return this.agent;
    }
    return '';
  }
  today = new Date().toISOString().split('T')[0];  // "2025-09-03"
  searchFormBreak = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl('')
  });

  getBreakSearch() {
    this.isSearchMode = true;

    // Check fromDate
    if (!this.searchFormBreak.get('fromDate')?.value) {
      this.searchFormBreak.get('fromDate')?.setValue(this.today);
    }

    // Check toDate
    if (!this.searchFormBreak.get('toDate')?.value) {
      this.searchFormBreak.get('toDate')?.setValue(this.today);
    }

    const fromDate = this.searchFormBreak.value.fromDate || ''
    const toDate = this.searchFormBreak.value.toDate || this.today
    const campaign = this.searchFormBreak.value.campain || this.today

    const userAgent = this.getAgent();

    this.apiService.BreakReportsSearch(userAgent, campaign, fromDate, toDate, this.limit, this.offset, 1).subscribe({
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
    this.offset = 0;
    this.sl = 0;
    this.isSearchMode = false;
    this.loadBreakReports();
  }

  loadCampainList() {
    this.apiService.loadCampaigns().subscribe({
      next: (res: any) => {
        const parseCampainData = JSON.parse(res.data);
        this.campains = parseCampainData.rows;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  // for initial load and search result
  formateBreakData(res: any) {
    try {
      if (res.success === 'YES' && res.data) {
        let rows: Break[] = [];
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

        // Map to your table format
        this.breakReportList = rows.map((item: Break) => ({
          queuename: item.queuename || '-',
          extension: item.extension || '-',
          pause_code: item.pause_code || '-',
          pause_time: item.pause_time || '-',
          unpause_time: item.unpause_time || '-',
          unpause_sec: item.unpause_sec || '-',
          last_response_time: item.last_response_time || '-'
        }));
        // Update paginator info
        this.hasMore = (this.offset + this.limit) < totalCount;
      } else {
        this.breakReportList = [];
        this.hasMore = false;
      }
    } catch (error) {
      console.error('Error parsing break data:', error);
      this.breakReportList = [];
      this.hasMore = false;
    }

    this.cdr.detectChanges();
  }


  nextPage() {
    this.offset += this.limit;
    this.sl += this.limit;
    if (this.isSearchMode) {
      this.getBreakSearch(); // fetch next page of search results
    } else {
      this.loadBreakReports(); // fetch next page of default list
    }
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.sl -= this.limit;
      if (this.isSearchMode) {
        this.getBreakSearch(); // fetch next page of search results
      } else {
        this.loadBreakReports(); // fetch next page of default list
      }
    }
  }
}
