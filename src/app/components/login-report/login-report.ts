import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PageHeader } from '../page-header/page-header';
import { Paginator } from '../paginator/paginator';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';


export interface LoginReportData {
  campaign: string,
  extension: string,
  agent_status: string,
  report_login_time: string,
  report_logout_time: string,
  report_duration: number,
  login_time: string,
  logout_time: string,
  login_sec: number,
  last_response_time: string
  agent_ip: string
}

@Component({
  selector: 'app-login-report',
  imports: [PageHeader, CommonModule, ReactiveFormsModule, Paginator],
  templateUrl: './login-report.html',
  styleUrl: './login-report.css'
})
export class LoginReport implements OnInit {
  sl = 0;
  offset = 0;
  limit = 30;
  hasMore = true;
  isSearchMode = false;
  loginReportsData: any[] = [];
  campains: any[] = [];
  agent = '';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadLoginReports();
    this.loadCampainList()
  }

  loadLoginReports() {
    const userAgent = this.getAgent();
    this.apiService.loginReports(userAgent, this.limit, this.offset).subscribe({
      next: (res) => {
        this.formateLoginReportData(res)
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

      }
    })
  }

  searchFormLoginReport = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl('')
  });

  getLoginReportSearch() {
    this.isSearchMode = true;
    console.log(this.searchFormLoginReport.value)

    const fromDate = this.searchFormLoginReport.value.fromDate || ''
    const toDate = this.searchFormLoginReport.value.toDate || ''
    const campaign = this.searchFormLoginReport.value.campain || ''

    const userAgent = this.getAgent();

    this.apiService.loginReportsSearch(userAgent, campaign, fromDate, toDate, this.limit, this.offset, 1).subscribe({
      next: (res) => {
        this.formateLoginReportData(res);
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }






  // for initial load and search result
  formateLoginReportData(res: any) {
    try {
      if (res.success === 'YES' && res.data) {
        let rows: LoginReportData[] = [];
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
        this.loginReportsData = rows.map((item: LoginReportData) => ({
          campaign: item.campaign || '-',
          extension: item.extension || '-',
          agent_status: item.agent_status || '-',
          report_login_time: item.report_login_time || '-',
          report_logout_time: item.report_logout_time || '-',
          report_duration: item.report_duration || '-',
          login_time: item.login_time || '-',
          logout_time: item.logout_time || '-',
          login_sec: item.login_sec || '-',
          last_response_time: item.last_response_time || '-',
          agent_ip: item.agent_ip || '-'
        }));
        // Update paginator info
        this.hasMore = (this.offset + this.limit) < totalCount;
      } else {
        this.loginReportsData = [];
        this.hasMore = false;
      }
    } catch (error) {
      console.error('Error parsing break data:', error);
      this.loginReportsData = [];
      this.hasMore = false;
    }

    this.cdr.detectChanges();
  }

  resetSearch() {
    this.searchFormLoginReport.reset();
    this.offset = 0;
    this.sl = 0;
    this.isSearchMode = false;
    this.loadLoginReports();

  }


  nextPage() {
    this.offset += this.limit;
    this.sl += this.limit;
    if (this.isSearchMode) {
      this.getLoginReportSearch(); // fetch next page of search results
    } else {
      this.loadLoginReports(); // fetch next page of default list
    }
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.sl -= this.limit;
      if (this.isSearchMode) {
        this.getLoginReportSearch(); // fetch next page of search results
      } else {
        this.loadLoginReports(); // fetch next page of default list
      }
    }
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

}