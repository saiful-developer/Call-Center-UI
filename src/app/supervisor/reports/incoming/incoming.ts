import { Component } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Paginator } from '../../shared/paginator/paginator';
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';


@Component({
  selector: 'app-incoming',
  imports: [PageHeader, FormsModule, ReactiveFormsModule, CommonModule, Paginator,StickyTableHeaderDirective],
  templateUrl: './incoming.html',
  styleUrl: './incoming.css'
})
export class Incoming {
  isSearchMode = false;
  campains: any[] = [];
  incomingReportsData = [];
  sl: any;
  offset: any;
  limit: any;
  hasMore: any;


  searchFormIncoming = new FormGroup({
    caller: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl(''),
    status: new FormControl('')
  });


  getIncomingBySearch() {

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
