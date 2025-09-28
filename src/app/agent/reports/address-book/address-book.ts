import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PageHeader } from '../../shared/page-header/page-header';
import { CommonModule } from '@angular/common';
import { Paginator } from '../../shared/paginator/paginator';
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';

export interface AddressBookData {
  name: string,
  phone: string,
  office_number: string,
  other_number: string,
  email: string,
  description: string
}

@Component({
  selector: 'app-address-book',
  imports: [PageHeader, CommonModule, Paginator, StickyTableHeaderDirective],
  templateUrl: './address-book.html',
  styleUrl: './address-book.css'
})
export class AddressBook implements OnInit {
  limit = 50;
  offset = 0;
  sl = 0;
  isSearchMode = false;
  totalCount = 0;
  hasMore = true;

  addressBookData: AddressBookData[] = [];
  campains: string[] = [];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCampainList()
    this.loadAddressBook()
  }

  loadAddressBook() {
    this.apiService.addressBook(this.campains).subscribe({
      next: (res) => {
        console.log(this.campains)
        console.log(res);
        this.formateData(res);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  loadCampainList() {
    this.apiService.loadCampaigns().subscribe({
      next: (res: any) => {
        const parseCampainData = JSON.parse(res.data);
        this.campains = parseCampainData.rows.map((c: any) => c.campaign_id);
        this.loadAddressBook()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  formateData(res: any) {
    try {
      if (res.success === 'YES' && res.data) {
        let rows: AddressBookData[] = [];
        // this.totalCount = 0;

        // Check if res.data is a string (initial load)
        if (typeof res.data === 'string') {
          const parsedData = JSON.parse(res.data); // { count, rows }
          if (parsedData && Array.isArray(parsedData.rows)) {
            rows = parsedData.rows;
            this.totalCount = parsedData.count;

          }
        }
        // If res.data is already an array (search)
        else if (Array.isArray(res.data)) {
          rows = res.data;
          this.totalCount = res.count;
        }
        // console.log(totalCount)

        // Map to your table format
        this.addressBookData = rows.map((item: AddressBookData) => ({
          name: item.name || '',
          phone: item.phone || '',
          office_number: item.office_number || '',
          other_number: item.other_number || '',
          email: item.email || '',
          description: item.description || ''
        }));
        // Update paginator info
        this.hasMore = (this.offset + this.limit) < this.totalCount;
      } else {
        this.addressBookData = [];
        this.hasMore = false;
      }
    } catch (error) {
      console.error(error);
      this.addressBookData = [];
      this.hasMore = false;
    }

    this.cdr.detectChanges();
  }

  nextPage() {
    const nextOffset = this.offset + this.limit;
    // Check if next offset exceeds total count
    if (nextOffset < this.totalCount) {
      this.offset = nextOffset;
      this.sl += this.limit;
      this.loadAddressBook();
    }
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.sl -= this.limit;
      this.loadAddressBook();
    }
  }

}
