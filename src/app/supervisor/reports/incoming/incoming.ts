import { Component, OnInit } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { Paginator } from '../../shared/paginator/paginator';
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';

import { ApiService } from '../../services/api.service';

//interface 
export interface IncomingRecords {
  uniqueid: string;
  calldate: string;
  src: string; //caller 
  dst: string; // hunting
  agent: string;
  campaign: string;
  caller_queue_time: number; // queue Time
  connect_ring_time: number; // ring Time
  caller_agent_talk_time: number; // talk Time
  transfer_to: string;
  completeagent: number; // finished By: 1 if agent finished, 0 if caller finished
  disposition: string;

  // can not find record in the incoming res
  recording?: string;
}


@Component({
  selector: 'app-incoming',
  imports: [PageHeader, FormsModule, ReactiveFormsModule, CommonModule, Paginator, StickyTableHeaderDirective, CommonModule],
  templateUrl: './incoming.html',
  styleUrl: './incoming.css'
})
export class Incoming implements OnInit {
  isSearchMode = false;
  campains: string[] = this.getCampains();
  incomingReportsData: IncomingRecords[] = [];
  exportIncomingREportsData: IncomingRecords[] = []
  sl: number = 0;
  offset: number = 0;
  limit: number = 50;
  hasMore: boolean = true;
  page: number = 1;
  count: number = 0;
  today = new Date().toISOString().split('T')[0];

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getIncoming();
    this.getUserName();
    this.isSearchMode = false;
  }

  getIncoming() {

    let user: string = '';

    this.api.incomingReport(user, this.campains,this.offset, this.limit, false).subscribe({
      next: (res) => {
        this.count = res.count;
        console.log(this.count);
        
        

        this.formateData(res);
      },
      error: (err) => {
        console.log(err);
      }
    })

  }



  /*
   *search functionality 
   */
  searchFormIncoming = new FormGroup({
    caller: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl(''),
    status: new FormControl('')
  });

  private buildSearchParams() {
    return {
      agent: '',
      campain: this.searchFormIncoming.value.campain || '',
      fromDate: this.searchFormIncoming.value.fromDate || this.today,
      toDate: this.searchFormIncoming.value.toDate || this.today,
      srcNumber: this.searchFormIncoming.value.caller || '',
      status: this.searchFormIncoming.value.status || '',
      campainList: this.getCampains()
    };
  }

  getIncomingDataOnFilter(isNewSearch: boolean = false) {

    if (isNewSearch) {
      this.isSearchMode = true;
      this.offset = 0;
      this.sl = 0;
    }

    

    //if user do not selece any date
    if (!this.searchFormIncoming.get('fromDate')?.value) {
      this.searchFormIncoming.get('fromDate')?.setValue(this.today);
    }

    if (!this.searchFormIncoming.get('toDate')?.value) {
      this.searchFormIncoming.get('toDate')?.setValue(this.today);
    }

    // const agent: string = '';
    // const campain = this.searchFormIncoming.value.campain || '';
    // const fromDate = this.searchFormIncoming.value.fromDate || this.today;
    // const toDate = this.searchFormIncoming.value.toDate || this.today;
    // const srcNameber = this.searchFormIncoming.value.caller || '';
    // const status = this.searchFormIncoming.value.status || '';
    // const campainList = this.getCampains();

    const { agent, campain, fromDate, toDate, srcNumber, status, campainList } = this.buildSearchParams();

    this.api.incomingReportOnFilter(agent, campain, campainList, false, fromDate, this.limit, this.offset, this.page, srcNumber, status, toDate).subscribe({
      next: (res) => {
        this.count = res.count;
        this.formateData(res)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  /*
  * export functionality
  */
  exportIncoming() {
    if (this.isSearchMode) {
      const { agent, campain, fromDate, toDate, srcNumber, status, campainList } = this.buildSearchParams();

      this.api.incomingReportOnFilter(agent, campain, campainList, true, fromDate, this.limit, this.offset, this.page, srcNumber, status, toDate).subscribe({
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
      this.api.incomingReport(
        '', this.campains,
        this.limit, this.offset,
        true //  export mode
      ).subscribe(res => this.downloadCSV(res.data, 'incoming-report.csv'));
    }
  }





  formateData(res: any) {
    if (res.success === 'YES' && Array.isArray(res.data)) {
      this.incomingReportsData = [];
      this.sl = this.offset;

      this.incomingReportsData = res.data.map((item: IncomingRecords, index: number) => ({
        sl: this.offset + index + 1,
        uniqueid: item.uniqueid || '-',
        calldate: item.calldate || '-',
        src: item.src || '-',
        dst: item.dst,
        agent: item.agent || '-',
        campaign: item.campaign || '-',
        caller_queue_time: item.caller_queue_time || '-',
        connect_ring_time: item.connect_ring_time || '-',
        caller_agent_talk_time: item.caller_agent_talk_time || '-',
        transfer_to: item.transfer_to || '-',
        completeagent: item.completeagent,
        disposition: item.disposition || '-',
      }))
    } else {
      this.incomingReportsData = [];
    }

    this.hasMore = this.offset + this.limit < this.count;
    
  }




  resetSearch() {
    this.searchFormIncoming.reset();
    this.offset = 0;
    this.sl = 0;
    this.count = 0;
    this.isSearchMode = false;
    this.getIncoming();
  }

  /*****pagination section v */
nextPage() {
  if (!this.isNextDisabled) {
    this.page += 1;
    this.offset = (this.page - 1) * this.limit;
    this.sl = this.offset;
    this.isSearchMode ? this.getIncomingDataOnFilter() : this.getIncoming();
  }
}

prevPage() {
  if (!this.isPrevDisabled) {
    this.page -= 1;
    this.offset = (this.page - 1) * this.limit;
    this.sl = this.offset;
    this.isSearchMode ? this.getIncomingDataOnFilter() : this.getIncoming();
  }
}

//new paginatin format
onPageChange(newOffset: number) {
  this.offset = newOffset;
  this.isSearchMode ? this.getIncomingDataOnFilter() : this.getIncoming(); //load data based on serch or not
}



  //for disable next btn
  get isNextDisabled(): boolean {
    return this.offset + this.limit >= this.count;
  }

  //for disable previous btn
  get isPrevDisabled(): boolean {
    return this.offset === 0;
  }
  /*****pagination end ^ */


  getUserName() {
    const userInfo = sessionStorage.getItem('user');
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      return parsedUserInfo.loginid;
    }
    return;
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