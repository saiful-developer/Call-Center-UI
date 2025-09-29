import { Component, OnInit } from '@angular/core';
import { PageHeader } from "../../shared/page-header/page-header";
import { CommonModule, ViewportScroller } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Paginator } from '../../shared/paginator/paginator';
import { CampainStatus } from '../../../agent/live/campain-status/campain-status';


export interface DispositionRow {
  uniqueid: string;     // UniqueID
  event_date: string;   // Datetime
  phone: string;        // Caller
  agent: string;        // Agent
  campaign: string;     // Campaign
  dispos: string;       // Disposition
  remarks: string;      // Remarks
  callType: string;     // Direction
  agent_ip: string;     // AgentIP
}

@Component({
  selector: 'app-disposition',
  imports: [PageHeader, CommonModule, ReactiveFormsModule, Paginator],
  templateUrl: './disposition.html',
  styleUrl: './disposition.css'
})
export class Disposition implements OnInit {
  campaignList: string[] = [];
  dispositionReportList: DispositionRow[] = [];
  isSearchMode: boolean = false;
  offset: number = 0;
  limit: number = 50;
  sl: number = 0;
  page: number = 1;
  count: number = 0;
  fromDate: string = '';
  toDate: string = '';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getDayRange();
    this.getCampains()
    this.getDispositionReport()

  }

  getDispositionReport() {
    this.api.dispositionReport(this.campaignList, this.fromDate, this.limit, this.offset, this.toDate).subscribe({
      next: (res) => {
        console.log(res);
        this.formateDispositionData(res);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  searchFormDisposition = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl('')
  });

  getDispositionOnFilter() {
    this.isSearchMode = true;
    console.log(this.searchFormDisposition.value);

    // Check fromDate
    if (!this.searchFormDisposition.get('fromDate')?.value) {
      this.searchFormDisposition.get('fromDate')?.setValue(this.fromDate);
    }

    // Check toDate
    if (!this.searchFormDisposition.get('toDate')?.value) {
      this.searchFormDisposition.get('toDate')?.setValue(this.toDate);
    }


    this.fromDate = this.searchFormDisposition.value.fromDate || this.fromDate
    this.toDate = this.searchFormDisposition.value.toDate || this.toDate
    const campaign = this.searchFormDisposition.value.campain || '';

    this.api.dispositionReport(this.campaignList, this.fromDate, this.limit, this.offset, this.toDate, campaign).subscribe({
      next: (res) => {
        console.log(res);
        this.formateDispositionData(res);

      },
      error: (err) => {
        console.log(err);

      }
    })


  }


  resetSearch() {
    this.searchFormDisposition.reset();
    this.page = 1;
    this.offset = 0;
    this.sl = 0;
    this.count = 0;
    this.isSearchMode = false;
    this.getDayRange();
    this.getDispositionReport();
  }

  getCampains() {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const parsedCampains = JSON.parse(userData);
      this.campaignList = parsedCampains.campaigns;
    }

    return;
  }

  getDayRange(date = new Date()): void {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    this.fromDate = `${year}-${month}-${day} 00:00:00`;
    this.toDate = `${year}-${month}-${day} 23:59:59`;
  }

  formateDispositionData(res: any) {

    if (res.success === 'YES' && res.data) {
      let rows: DispositionRow[] = [];
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
      else if (Array.isArray(res.data.rows)) {
        rows = res.data.rows;
        this.count = res.data.count;
        console.log(this.count);

      }

      console.log(rows);


      // map  table format
      this.dispositionReportList = rows.map((item: DispositionRow) => ({
        uniqueid: item.uniqueid || '-',
        event_date: item.event_date || '-',
        phone: item.phone || '-',
        agent: item.agent || '-',
        campaign: item.campaign || '-',
        dispos: item.dispos || '-',
        remarks: item.remarks || '-',
        callType: item.callType || '-',
        agent_ip: item.agent_ip || '-'
      }));

    } else {
      this.dispositionReportList = [];
    }
  }

  //paginator
  onPageChange(newOffset: number) {

    this.offset = newOffset;

    this.page = Math.floor(this.offset / this.limit) + 1; // page in sync


    this.isSearchMode ? this.getDispositionOnFilter() : this.getDispositionReport(); //load data based on serch or not
  }

}
