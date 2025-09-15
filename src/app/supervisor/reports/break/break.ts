import { Component } from '@angular/core';
import { PageHeader } from "../../shared/page-header/page-header";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Paginator } from "../../shared/paginator/paginator";
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';

@Component({
  selector: 'app-break',
  imports: [PageHeader, CommonModule, ReactiveFormsModule, Paginator, StickyTableHeaderDirective],
  templateUrl: './break.html',
  styleUrl: './break.css'
})
export class Break {
  nextPage() {
    throw new Error('Method not implemented.');
  }
  prevPage() {
    throw new Error('Method not implemented.');
  }
  campains: any;
  breakReportList: any;
  isSearchMode: any;
  offset: any;
  limit: any;
  hasMore: any;
  sl: any


  searchFormBreak = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl('')
  });


  getBreakSearch() {

  }

  resetSearch() {
    throw new Error('Method not implemented.');
  }

}
