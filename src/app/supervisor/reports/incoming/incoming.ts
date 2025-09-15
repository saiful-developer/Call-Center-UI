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
  hasMore: any;
  page: number = 1;
  today = new Date().toISOString().split('T')[0];

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getIncoming();
    this.getUserName();
    this.getCampains();
    this.isSearchMode = false;
  }


  searchFormIncoming = new FormGroup({
    caller: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl(''),
    status: new FormControl('')
  });


  getIncoming() {

    let user: string = '';

    this.api.incomingReport(user, this.campains, this.limit, this.offset, false).subscribe({
      next: (res) => {
        this.formateData(res);
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  getIncomingDataOnFilter() {
    this.isSearchMode = true;
    console.log(this.searchFormIncoming.value);

    //if user do not selece any date
    if (!this.searchFormIncoming.get('fromDate')?.value) {
      this.searchFormIncoming.get('fromDate')?.setValue(this.today);
    }

    if (!this.searchFormIncoming.get('toDate')?.value) {
      this.searchFormIncoming.get('toDate')?.setValue(this.today);
    }

    const agent: string =  '';
    const campain = this.searchFormIncoming.value.campain || '';
    const fromDate = this.searchFormIncoming.value.fromDate || this.today;
    const toDate = this.searchFormIncoming.value.toDate || this.today;
    const srcNameber = this.searchFormIncoming.value.caller || '';
    const status = this.searchFormIncoming.value.status || '';
    const campainList = this.getCampains();
    const isExport: boolean = false;

    this.api.incomingReportOnFilter(agent, campain, campainList, isExport, fromDate, this.limit, this.offset, this.page, srcNameber, status, toDate).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err);
      }
    })



  }

  getExportedData() {


    console.log('export')
    let user: string = this.getUserName();

    this.api.incomingReport(user, this.campains, this.limit, this.offset, true).subscribe({
      next: (res) => {
        this.formateData(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }



  formateData(res: any) {
    if (res.success === 'YES' && Array.isArray(res.data)) {
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
        completeagent: item.completeagent ? 'Agent Finished' : 'Caller Finished',
        disposition: item.disposition || '-',
      }))
    } else {
      this.incomingReportsData = [];
    }

    console.log(this.incomingReportsData)
  }

  resetSearch() {

  }

  nextPage() {
    throw new Error('Method not implemented.');
  }
  prevPage() {
    throw new Error('Method not implemented.');
  }

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


}
