import { Component, OnInit } from '@angular/core';
import { PageHeader } from "../../shared/page-header/page-header";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Paginator } from "../../shared/paginator/paginator";
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';
import { AgentContact } from '../../../agent/pages/contact/agent-contact';
import { ApiService } from '../../services/api.service';
import { CampainStatus } from '../../../agent/live/campain-status/campain-status';
import { TimeScale } from 'chart.js';

export interface LonginRecord {
  campaign: string;
  extension: string;
  agent_status: string;
  report_login_time: string | null;
  report_logout_time: string | null;
  report_duration: number | null;
  login_time: string | null;
  logout_time: string | null;
  login_sec: number | null;
  last_response_time: string | null;
  agent_ip: string;
}


@Component({
  selector: 'app-login',
  imports: [PageHeader, ReactiveFormsModule, DatePipe, CommonModule, Paginator, StickyTableHeaderDirective],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  loginReportsData: LonginRecord[] = [];
  campaignList: string[] = [];
  agent: string = '';
  campaign: string = '';
  isSearchMode: boolean = false;
  offset: number = 0;
  limit: number = 50;
  hasMore: boolean = true;
  sl: number = 0
  page: number = 1;
  count: number = 0;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getCampains();
    this.getLogin();
  }

  getLogin() {
    this.api.getLoginReport(this.agent, this.campaign, this.campaignList, this.limit, this.offset).subscribe({
      next: (res) => {
        console.log(res);
        this.formateLoginData(res)

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  /**
   * search functionality
   */
  today = new Date().toISOString().split('T')[0];
  searchFormLoginReport = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl('')
  });

  getLoginReportOnFilter() {
    this.isSearchMode = true;

    // Check fromDate
    if (!this.searchFormLoginReport.get('fromDate')?.value) {
      this.searchFormLoginReport.get('fromDate')?.setValue(this.today);
    }

    // Check toDate
    if (!this.searchFormLoginReport.get('toDate')?.value) {
      this.searchFormLoginReport.get('toDate')?.setValue(this.today);
    }

    const fromDate = this.searchFormLoginReport.value.fromDate || this.today
    const toDate = this.searchFormLoginReport.value.toDate || this.today
    const campaign = this.searchFormLoginReport.value.campain || ''
    let agent = '';

    this.api.LoginReportOnFilter(agent, campaign, this.campaignList, fromDate, this.limit, this.offset, this.page, toDate).subscribe({
      next: (res) => {
        //I am getting json data
        console.log(res);
        this.formateLoginData(res)

      },
      error: (err) => {
        console.log(err);

      }
    })

  }

  resetSearch() {
    this.searchFormLoginReport.reset();
    this.page = 1;
    this.offset = 0;
    this.sl = 0;
    this.count = 0;
    this.isSearchMode = false;
    this.getLogin();
  }

  nextPage() {
    console.log('in side method', this.isSearchMode);


    this.page++;
    this.offset += this.limit;
    this.sl += this.limit;
    if (this.isSearchMode) {
      console.log("inside if", this.isSearchMode);

      this.getLoginReportOnFilter();
    } else {
      console.log("inside else", this.isSearchMode);

      this.getLogin();

    }
  }
  prevPage() {
    this.page--;
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.sl -= this.limit;
      if (this.isSearchMode) {
        this.getLoginReportOnFilter();
      } else {
        this.getLogin();
      }
    }
  }


  // for initial load and search result
  formateLoginData(res: any) {
    if (res.success === 'YES' && res.data) {
      let rows: LonginRecord[] = [];

      // Check if res.data is a string (initial load)
      if (typeof res.data === 'string') {
        const parsedData = JSON.parse(res.data); // { rows } **no count here
        console.log(parsedData);

        if (parsedData && Array.isArray(parsedData)) {
          rows = parsedData;
          // this.count = parsedData.count;
        }
      }
      // If res.data is already an array
      else if (Array.isArray(res.data)) {
        rows = res.data;
        this.count = res.count;
      }

      console.log(rows);


      // map  table format
      this.loginReportsData = rows.map((item: LonginRecord) => ({
        campaign: item.campaign || '-',
        extension: item.extension || '-',
        agent_status: item.agent_status || '-',
        report_login_time: item.report_login_time || '-',
        report_logout_time: item.report_logout_time || '-',
        report_duration: item.report_duration || 0,
        login_time: item.login_time || '-',
        logout_time: item.logout_time || '-',
        login_sec: item.login_sec || 0,
        last_response_time: item.last_response_time || '-',
        agent_ip: item.agent_ip || '-',
      }));

      this.hasMore = this.loginReportsData.length < 50? false : true;

      // update paginator info
      // this.hasMore = this.offset + this.limit < this.count;
    } else {
      this.loginReportsData = [];
      // this.hasMore = false;
    }

    console.log(this.loginReportsData);

  }

  getCampains() {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const parsedCampains = JSON.parse(userData);
      this.campaignList = parsedCampains.campaigns;
    }

    return;
  }

}
