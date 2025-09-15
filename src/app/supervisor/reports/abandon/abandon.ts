import { Component } from '@angular/core';
import { PageHeader } from "../../shared/page-header/page-header";
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';
import { Paginator } from "../../shared/paginator/paginator";

@Component({
  selector: 'app-abandon',
  imports: [PageHeader, ReactiveFormsModule, DatePipe, CommonModule, StickyTableHeaderDirective, Paginator],
  templateUrl: './abandon.html',
  styleUrl: './abandon.css'
})
export class Abandon {
  nextPage() {
    throw new Error('Method not implemented.');
  }
  prevPage() {
    throw new Error('Method not implemented.');
  }

  abandonReportsData: any;
  campains: any;
  isSearchMode: any;

  sl: any;
  offset: any;
  limit: any;
  hasMore: any;



  searchFormAbandonReport = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl('')
  });


  getAbandonReportSearch() {

  }

  resetSearch() { }

}
