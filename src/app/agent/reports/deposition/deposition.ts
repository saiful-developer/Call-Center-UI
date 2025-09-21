import { Component, OnInit } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';
import { Paginator } from '../../shared/paginator/paginator';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-deposition',
  imports: [PageHeader, Paginator, CommonModule, ReactiveFormsModule],
  templateUrl: './deposition.html',
  styleUrl: './deposition.css'
})
export class Deposition implements OnInit {
  dispositionData: any = []
  limit = 30;
  offset = 0;
  sl = 0;
  totalCount = 0;
  isSearchMode = false;
  hasMore = true;
  agent: string = '';
  campains: string[] = []

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadAgentDispostion()
    this.getAgentAndCampain()
  }

  searchForm = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl('')
  });

  loadAgentDispostion() {
    // this.apiService.disposition(this.agent, )
  }

  getSearchResult() {
    this.isSearchMode = true;
    const today = new Date().toISOString().split('T')[0];
    // Check fromDate
    if (!this.searchForm.get('fromDate')?.value) {
      this.searchForm.get('fromDate')?.setValue(today);
    }

    // Check toDate
    if (!this.searchForm.get('toDate')?.value) {
      this.searchForm.get('toDate')?.setValue(today);
    }
  
    const fromDate = this.searchForm.value.fromDate || ''
    const toDate = this.searchForm.value.toDate || ''
    const campaign = this.searchForm.value.campain || ''

    this.apiService.disposition(this.agent, fromDate, this.limit, this.offset, toDate).subscribe({
      next: (res) => {
        console.log('response', res)
        this.dispositionData = res.data.rows;
      },
      error: (err) => {
        console.log(err);
        
      }
    })


  }

  resetSearch() {

  }

  getAgentAndCampain() {
    const user: any = sessionStorage.getItem('user')
    const userObj = JSON.parse(user);
    console.log(userObj);
    this.agent = userObj.agentID;
    this.campains = userObj.campaigns;

  }

  nextPage() { }
  prevPage() { }

}
