import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Paginator } from "../../shared/paginator/paginator";
import { PageHeader } from '../../shared/page-header/page-header';

export interface RNARecords {
  calldate: string;
  campaign: string;
  duration: number;
  uniqueid: string;
}

@Component({
  selector: 'app-rna',
  imports: [PageHeader, StickyTableHeaderDirective, CommonModule, ReactiveFormsModule, Paginator],
  templateUrl: './rna.html',
  styleUrl: './rna.css'
})
export class Rna implements OnInit {


  campaignList: string[] = [];
  RNAReportList: RNARecords[] = [];
  agent: string = '';
  isSearchMode: boolean = false;
  offset: number = 0;
  limit: number = 50;
  sl: number = 0;
  page: number = 1;
  count: number = 0;
  // searchFormBreak: any;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getRNAReport();
    this.getCampainsAndAgent()

  }

  getRNAReport() {
    this.api.RNAReport(this.agent, this.limit, this.offset).subscribe({
      next: (res) => {
        console.log(res);
        this.formateRNAData(res);
      },
      error: (err) => {
        console.log(err);

      }

    })
  }



  today = new Date().toISOString().split('T')[0];
  searchFormRNA = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl('')
  });
  getRNAOnFilter() {
    this.isSearchMode = true;

    // Check fromDate
    if (!this.searchFormRNA.get('fromDate')?.value) {
      this.searchFormRNA.get('fromDate')?.setValue(this.today);
    }

    // Check toDate
    if (!this.searchFormRNA.get('toDate')?.value) {
      this.searchFormRNA.get('toDate')?.setValue(this.today);
    }

    const fromDate = this.searchFormRNA.value.fromDate || this.today
    const toDate = this.searchFormRNA.value.toDate || this.today
    const campaign = this.searchFormRNA.value.campain || '';

    this.api.RNAOnFilter('', campaign, this.campaignList, fromDate, this.limit, this.offset, this.page, toDate).subscribe({
      next: (res) => {
        console.log(res);
        this.formateRNAData(res);
      },
      error: (res) => {
        console.log(res);

      }
    })

  }

  resetSearch() {
    this.searchFormRNA.reset();
    this.page = 1;
    this.offset = 0;
    this.sl = 0;
    this.count = 0;
    this.isSearchMode = false;
    this.getRNAReport();
  }

  onPageChange(newOffset: number) {
    this.offset = newOffset;
    this.isSearchMode ? this.getRNAOnFilter() : this.getRNAReport(); //load data based on serch or not
  }

  getCampainsAndAgent() {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const parsedCampains = JSON.parse(userData);
      this.campaignList = parsedCampains.campaigns;
      this.agent = parsedCampains.loginid;
    }

    return;
  }


  // for initial load and search result
  formateRNAData(res: any) {
    if (res.success === 'YES' && res.data) {
      let rows: RNARecords[] = [];
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
      this.RNAReportList = rows.map((item: RNARecords) => ({
        calldate: item.calldate || '-',
        campaign: item.campaign || '-',
        duration: (item.duration / 1000) || 0, // converting ms to seconds if needed
        uniqueid: item.uniqueid || '-'
      }));

    } else {
      this.RNAReportList = [];
    }
  }

  // for initial load and search result
  formateAbandonCallData(res: any) {
    if (res.success === 'YES' && res.data) {
      let rows: RNARecords[] = [];

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
      this.RNAReportList = rows.map((item: RNARecords) => ({
        calldate: item.calldate || '-',
        campaign: item.campaign || '-',
        duration: item.duration || 0,
        uniqueid: item.uniqueid || '-'
      }));

    } else {
      this.RNAReportList = [];
    }
  }

}
