import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  campains: any[] = [];
  isSearchMode = false;


  loadCampainList() {
    this.apiService.loadCampaigns().subscribe({
      next: (res: any) => {

        const parseCampainData = JSON.parse(res.data);
        this.campains = parseCampainData.rows;

      },
      error: (err) => {

      }
    })
  }

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    this.loadOutgoingData();
    this.loadCampainList()
  }

  outgoingReportsData: OutgoingReportsData[] = [];
  sl = 0;
  offset = 0;
  limit = 30;
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
        this.formatOutgoingReportsData(res)
        console.log(res)
      },

      error: (err) => {
        console.log(err)
      }

    })
  }

  searchFormOutgoing = new FormGroup({
    extension: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl(''),
    status: new FormControl('')
  });

  getOutgoingSearch() {
    this.isSearchMode = true;

    let agent = '';
    const campain = this.searchFormOutgoing.value.campain || '';
    const fromDate = this.searchFormOutgoing.value.fromDate || '';
    const toDate = this.searchFormOutgoing.value.toDate || '';
    const extension = this.searchFormOutgoing.value.extension || '';
    const status = this.searchFormOutgoing.value.status || '';

    const userInfo = sessionStorage.getItem('user')
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo)
      agent = parsedUserInfo.loginid;
    }

    this.apiService.outgoingBySearch(agent, campain, fromDate, toDate, extension, status, this.limit, this.offset, 1).subscribe({
      next: (res) => {
        this.formatOutgoingReportsData(res);
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  resetSearch() {
    this.searchFormOutgoing.reset();
    this.offset = 0;
    this.sl = 0;
    this.isSearchMode = false;
    this.loadOutgoingData();
  }

  nextPage() {
    this.offset += this.limit;
    this.sl += this.limit;
    if (this.isSearchMode) {
      this.getOutgoingSearch(); // fetch next page of search results
    } else {
      this.loadOutgoingData(); // fetch next page of default list
    }
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.sl -= this.limit;
      if (this.isSearchMode) {
        this.getOutgoingSearch(); // fetch next page of search results
      } else {
        this.loadOutgoingData(); // fetch next page of default list
      }
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


  //for initial load and search result
  formatOutgoingReportsData(res: any) {
    // let totalCount = 0;
    if (res.success === 'YES' && Array.isArray(res.data)) {
      this.outgoingReportsData = res.data.map((item: OutgoingReportsData) => ({
        uniqueid: item.uniqueid,
        calldate: item.calldate || '-',
        extension: item.extension,
        phone: item.phone || '-',
        campaign: item.campaign || '-',
        ring_time: item.ring_time || '-',
        duration: item.duration || '-',
        status: item.status || '',
        transfer: item.transfer ? 'Yes' : 'No',
        disposition: item.disposition || '-'
      }));
    } else {
      this.outgoingReportsData = [];
    }

    this.cdr.detectChanges();
  }

}
