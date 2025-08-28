import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

// components
import { PageHeader } from '../page-header/page-header';
import { CommonModule } from '@angular/common';
import { Paginator } from '../paginator/paginator';

//services
import { ApiService } from '../../services/api.service';

export interface OutgoingReportsData {
  uniqueid: string,
  calldate: string,
  extension: string,
  phone: string,
  campaign: string,
  ring_time?: string,
  duration: string,
  status: string,
  transfer: number,
  disposition: string
}

@Component({
  selector: 'app-outgoing-reports',
  imports: [PageHeader, ReactiveFormsModule, CommonModule, Paginator],
  templateUrl: './outgoing-reports.html',
  styleUrl: './outgoing-reports.css'
})
export class OutgoingReports implements OnInit {

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
  getSearchedResult() {
    let searchFildData = this.searchForm.value;
    console.log(searchFildData)
   }

  constructor(
    private apiService: ApiService
  ) {

  }

  ngOnInit(): void {
    this.loadOutgoingData();
  }

  outgoingReportsData: OutgoingReportsData[] = [];

  offset = 0;
  limit = 15;
  hasMore = true;
  loadOutgoingData() {
    //get user id
    let user = '';
    const userInfo = sessionStorage.getItem('user')
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo)
      user = parsedUserInfo.loginid;
    }

    this.apiService.outgoingReport(user, this.limit, this.offset).subscribe({
      next: (res) => {
        console.log(res)

        if (res.success === 'YES' && Array.isArray(res.data)) {
          this.outgoingReportsData = res.data.map((item: OutgoingReportsData) => ({
            uniqueid: item.uniqueid,
            calldate: item.calldate || '',
            extension: item.extension,
            phone: item.phone || '',
            campaign: item.campaign || '',
            ring_time: item.ring_time || '',
            duration: item.duration || '',
            status: item.status || '',
            transfer: item.transfer ? 'Yes' : 'No',
            disposition: item.disposition || ''
          }));
        } else {
          this.outgoingReportsData = [];
        }
      },

      error: (err) => {
        console.log(err)
      }

    })
  }

  nextPage() {
    this.offset += this.limit;
    this.loadOutgoingData();
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.loadOutgoingData ();
    }
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
