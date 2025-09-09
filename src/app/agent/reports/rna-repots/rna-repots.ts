import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
//components
import { PageHeader } from '../../shared/page-header/page-header';
import { Paginator } from '../../shared/paginator/paginator';
import { CommonModule } from '@angular/common';
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';

export interface RNAReportsData {
  calldate: string,
  campaign: string,
  duration?: number,
  uniqueid: string
}

@Component({
  selector: 'app-rna-repots',
  imports: [PageHeader, Paginator, ReactiveFormsModule, CommonModule, StickyTableHeaderDirective],
  templateUrl: './rna-repots.html',
  styleUrl: './rna-repots.css'
})
export class RNARepots implements OnInit {

  agent = '';
  limit = 30;
  offset = 0;
  sl = 0;
  isSearchMode = false;
  hasMore = true;

  campains: any[] = [];
  rnaReports: RNAReportsData[] = [];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCampainList();
    this.loadRnaReports();
  }

  loadRnaReports() {
    const userAgent = this.getAgent();
    this.apiService.ringNoAnswerReport(userAgent, this.limit, this.offset).subscribe({
      next: (res) => {
        this.formateRnaData(res)
      },
      error: (err) => {
        console.log(err);

      }
    })
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

  searchFormRNA = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl('')
  });

  getRnaSearch() {
    this.isSearchMode = true;

    // Check fromDate
    if (!this.searchFormRNA.get('fromDate')?.value) {
      this.searchFormRNA.get('fromDate')?.setValue(this.today);
    }

    // Check toDate
    if (!this.searchFormRNA.get('toDate')?.value) {
      this.searchFormRNA.get('toDate')?.setValue(this.today);
    }

    const fromDate = this.searchFormRNA.value.fromDate || ''
    const toDate = this.searchFormRNA.value.toDate || ''
    const campaign = this.searchFormRNA.value.campain || ''

    const userAgent = this.getAgent();

    this.apiService.tingNoAnswerReportsSearch(userAgent, campaign, fromDate, toDate, this.limit, this.offset, 1).subscribe({
      next: (res) => {
        this.formateRnaData(res);
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }




  resetSearch() {
    this.searchFormRNA.reset();
    this.offset = 0;
    this.sl = 0;
    this.isSearchMode = false;
    this.loadRnaReports();
  }


  // for initial load and search result
  formateRnaData(res: any) {
    try {
      if (res.success === 'YES' && res.data) {
        let rows: RNAReportsData[] = [];
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
        this.rnaReports = rows.map((item: RNAReportsData) => ({
          calldate: item.calldate || '-',
          campaign: item.campaign || '-',
          duration: item.duration || 0,
          uniqueid: item.uniqueid || '-'
        }));
        // Update paginator info
        this.hasMore = (this.offset + this.limit) < totalCount;
      } else {
        this.rnaReports = [];
        this.hasMore = false;
      }
    } catch (error) {
      console.error('Error parsing break data:', error);
      this.rnaReports = [];
      this.hasMore = false;
    }

    this.cdr.detectChanges();
  }

  nextPage() {
    this.offset += this.limit;
    this.sl += this.limit;
    if (this.isSearchMode) {
      this.getRnaSearch(); // fetch next page of search results
    } else {
      this.loadRnaReports(); // fetch next page of default list
    }
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.sl -= this.limit;
      if (this.isSearchMode) {
        this.getRnaSearch(); // fetch next page of search results
      } else {
        this.loadRnaReports(); // fetch next page of default list
      }
    }
  }


}
