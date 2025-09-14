import { Component } from '@angular/core';
import { PageHeader } from "../../shared/page-header/page-header";
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';
import { Paginator } from '../../shared/paginator/paginator';

@Component({
  selector: 'app-outgoing',
  imports: [PageHeader, CommonModule, ReactiveFormsModule, FormsModule, StickyTableHeaderDirective, Paginator],
  templateUrl: './outgoing.html',
  styleUrl: './outgoing.css'
})
export class Outgoing {

  isSearchMode: any;
  outgoingReportsData: any
  campains: any = [];
  sl: any;
  offset: any;
  limit: any;
  hasMore: any;




  searchFormOutgoing = new FormGroup({
    extension: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    campain: new FormControl(''),
    status: new FormControl('')
  });



  getOutgoingSearch() {

  }

  resetSearch() {
    throw new Error('Method not implemented.');
  }

    nextPage() {
    throw new Error('Method not implemented.');
  }
  prevPage() {
    throw new Error('Method not implemented.');
  }
}
