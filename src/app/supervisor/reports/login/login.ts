import { Component } from '@angular/core';
import { PageHeader } from "../../shared/page-header/page-header";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Paginator } from "../../shared/paginator/paginator";
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';

@Component({
  selector: 'app-login',
  imports: [PageHeader, ReactiveFormsModule, DatePipe, CommonModule, Paginator, StickyTableHeaderDirective],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginReportsData: any
  campains: any;
  isSearchMode: boolean = false
  offset: any;
  limit: any;
  hasMore: any;
  sl: any

  searchFormLoginReport = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl('')
  });


  getLoginReportSearch() {

  }

  resetSearch() {

  }

  nextPage() {
    throw new Error('Method not implemented.');
  }
  prevPage() {
    throw new Error('Method not implemented.');
  }

}
