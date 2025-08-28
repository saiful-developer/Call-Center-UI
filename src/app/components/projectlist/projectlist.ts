import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { PageHeader } from '../page-header/page-header';
import { Paginator } from '../paginator/paginator';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

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
}




@Component({
  selector: 'app-projectlist',
  imports: [HttpClientModule, ReactiveFormsModule, PageHeader, Paginator, CommonModule],
  templateUrl: './projectlist.html',
  styleUrl: './projectlist.css'
})
export class Projectlist implements OnInit {
  // [x: string]: any;

  // searchResultProjectList: any[] = [];
  sl = 0;

  incomingReportsData: IncomingReportAPI[] = [];



  //reactive form
  searchForm = new FormGroup({
    search_name: new FormControl(''),
    search_id: new FormControl(''),
    search_role: new FormControl(''),
    search_email: new FormControl(''),
    search_project_title: new FormControl(''),
    search_prject_type: new FormControl(''),
    search_assigned_by: new FormControl(''),

  });

  constructor(
    private cdr: ChangeDetectorRef,
    private apiService: ApiService
  ) { }


  getIncomingReport(): void {
    //get loginid form the sesson storage

    let user = '';
    const userInfo = sessionStorage.getItem('user')
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo)
      user = parsedUserInfo.loginid;
    }

    this.apiService.incomingReport(user, this.limit, this.offset).subscribe({
      next: (res) => {
        if (res.success === 'YES' && Array.isArray(res.data)) {
          this.incomingReportsData = res.data.map((item: IncomingReportAPI) => ({
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
            disposition: item.disposition || ''
          }));
        } else {
          this.incomingReportsData = [];
        }

        console.log(res)
        this.cdr.detectChanges();
      },
      error: err => console.error('Error fetching project data:', err)
    });
  }


  offset = 0;
  limit = 15;
  hasMore = true;
  ngOnInit() {
    this.getIncomingReport()

  }

  nextPage() {
    this.offset += this.limit;
    this.getIncomingReport();
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.getIncomingReport();
    }
  }
  getSearchedResult() {
    // console.log(this.searchForm.value)
    // const { search_name, search_id, search_role, search_email, search_project_title, search_prject_type, search_assigned_by } = this.searchForm.value;

    // this.http.get<any[]>('http://localhost:3000/call-center/agent/search-result', {
    //   params: {
    //     search_name: search_name ?? '',
    //     search_id: search_id ?? '',
    //     search_role: search_role ?? '',
    //     search_email: search_email ?? '',
    //     search_project_title: search_project_title ?? '',
    //     search_prject_type: search_prject_type ?? '',
    //     search_assigned_by: search_assigned_by ?? ''

    //   }
    // }).subscribe({
    //   next: (response) => {
    //     this.projects = Array.isArray(response) ? response : [response];
    //     console.log(this.projects);
    //   },
    //   error: (error) => {
    //     console.log(error)
    //   }
    // })

  }

  pagedListFromChild: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;  // default page size, should match your paginator's pageSize

  handlePageChange(event: { pagedList: any[], currentPage: number, pageSize: number }) {
    this.pagedListFromChild = event.pagedList;
    this.currentPage = event.currentPage;
    this.pageSize = event.pageSize;
  }








}
