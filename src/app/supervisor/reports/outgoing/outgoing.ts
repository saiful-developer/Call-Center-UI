import { Component, OnInit } from '@angular/core';
import { PageHeader } from "../../shared/page-header/page-header";
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';
import { Paginator } from '../../shared/paginator/paginator';
import { ApiService } from '../../services/api.service';

//interface
export interface OutgoingRecords {
  uniqueid: string;
  extension: string;
  phone: string;
  campaign: string;
  calldate: string;
  ring_duration: number;
  cdr_billsec: number;
  status: string;
  transfer_to?: string;
  disposition?: string;
  recordingfile?: string;
}

@Component({
  selector: 'app-outgoing',
  imports: [PageHeader, CommonModule, ReactiveFormsModule, FormsModule, StickyTableHeaderDirective, Paginator],
  templateUrl: './outgoing.html',
  styleUrl: './outgoing.css'
})


export class Outgoing implements OnInit {
  isSearchMode: boolean = false;
  campains: string[] = this.getCampains();
  sl: number = 0;
  offset: number = 0;
  limit: number = 50;
  page: number = 1;
  hasMore: boolean = true;
  count: number = 0;
  today = new Date().toISOString().split('T')[0];

  outgoingReportsData: OutgoingRecords[] = [];
  outgoingReportsExport: OutgoingRecords[] = [];

  constructor(
    private api: ApiService
  ) { }


  ngOnInit(): void {
    this.getOutgoing();
  }

  getOutgoing() {
    let agnet = '';

    this.api.outgoingReports(agnet, this.campains, false, this.limit, this.offset).subscribe({
      next: (res) => {
        console.log(res);
        this.count = res.count;
        this.formateData(res)
      },
      error: (res) => {
        console.log(res);

      }
    })
  }


  /*
 *search functionality 
 */
  searchFormOutgoing = new FormGroup({
    destNumber: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl(''),
    status: new FormControl('')
  });

  private buildSearchParams() {
    return {
      agent: '',
      campain: this.searchFormOutgoing.value.campain || '',
      fromDate: this.searchFormOutgoing.value.fromDate || this.today,
      toDate: this.searchFormOutgoing.value.toDate || this.today,
      destNumber: this.searchFormOutgoing.value.destNumber || '',
      status: this.searchFormOutgoing.value.status || ''
    };
  }


  getOutgoingOnFilter(isNewSearch: boolean = false) {
    if (isNewSearch) {
      this.isSearchMode = true;
      this.offset = 0;
      this.sl = 0;
    }

    //if user do not selece any date
    if (!this.searchFormOutgoing.get('fromDate')?.value) {
      this.searchFormOutgoing.get('fromDate')?.setValue(this.today);
    }

    if (!this.searchFormOutgoing.get('toDate')?.value) {
      this.searchFormOutgoing.get('toDate')?.setValue(this.today);
    }

    const { agent, campain, fromDate, toDate, destNumber, status } = this.buildSearchParams()

    this.api.outgoingReportsOnFilter(agent, campain, this.campains, destNumber, false, fromDate, this.limit, this.offset, this.page, status, toDate).subscribe({
      next: (res) => {
        console.log(res);
        this.count = res.count;
        this.formateData(res)
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  /**
   * export functionality
   */
  exportOutgoing() {
    if (this.isSearchMode) {
      const { agent, campain, fromDate, toDate, destNumber, status } = this.buildSearchParams()

      this.api.outgoingReportsOnFilter(agent, campain, this.campains, destNumber, true, fromDate, this.limit, this.offset, this.page, status, toDate).subscribe({
        next: (res) => {
          if (res.success === 'YES' && res.data) {
            this.downloadCSV(res.data, 'incoming-report.csv');
          } else {
            console.log('No data to export from search');
          }
        },
        error: (err) => console.error(err)
      });

    } else {
      console.log('all data');

      //export already loaded data initial or after reset case
      this.api.outgoingReports('', this.campains, true, this.limit, this.offset).subscribe(res => this.downloadCSV(res.data, 'incoming-report.csv'));
    }
  }

  resetSearch() {
    this.searchFormOutgoing.reset();
    this.offset = 0;
    this.sl = 0;
    this.count = 0;
    this.isSearchMode = false;
    this.getOutgoing();
  }

  formateData(res: any) {
    if (res.success === 'YES' && Array.isArray(res.data)) {
      this.outgoingReportsData = [];
      this.sl = this.offset;

      this.outgoingReportsData = res.data.map((item: OutgoingRecords, index: number) => ({
        sl: this.offset + index + 1,
        uniqueid: item.uniqueid || '-',
        extension: item.extension || '-',
        phone: item.phone || '-',
        campaign: item.campaign,
        calldate: item.calldate || '-',
        ring_duration: item.ring_duration || '-',
        cdr_billsec: item.cdr_billsec || '-',
        status: item.status || '-',
        transfer_to: item.transfer_to || '-',
        disposition: item.disposition || '-',
        recordingfile: item.recordingfile || '-'
      }))
    } else {
      this.outgoingReportsData = [];
    }

    this.hasMore = this.offset + this.limit < this.count;
  }


  //pagination
  nextPage() {
    this.page++;
    this.offset += this.limit;
    this.sl += this.limit;
    if (this.isSearchMode) {
      this.getOutgoingOnFilter();
    } else {
      this.getOutgoing();

    }
  }


  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.sl -= this.limit;
      if (this.isSearchMode) {
        this.getOutgoingOnFilter();
      } else {
        this.getOutgoing();
      }
    }
  }

  //new paginatin format
  onPageChange(newOffset: number) {
    this.offset = newOffset;
    this.isSearchMode ? this.getOutgoingOnFilter() : this.getOutgoing(); //load data based on serch or not
  }


  getCampains() {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const parsedCampains = JSON.parse(userData);
      return parsedCampains.campaigns;
    }

    return;
  }

  //export
  downloadCSV(data: any[], filename: string = 'incoming-report.csv') {
    if (!data || data.length === 0) {
      console.log('No data to export');
      return;
    }

    // Extract headers from the object keys
    const header = Object.keys(data[0]);

    // Build CSV rows
    const replacer = (key: string, value: any) => (value === null || value === undefined ? '' : value);
    const csv = [
      header.join(','), // header row
      ...data.map(row =>
        header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')
      )
    ].join('\r\n');

    // Create and download file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
