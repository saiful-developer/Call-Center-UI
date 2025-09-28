import { Component } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';
import { Paginator } from '../../shared/paginator/paginator';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

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
  imports: [PageHeader, Paginator, CommonModule],
  templateUrl: './address-book.html',
  styleUrl: './address-book.css'
})
export class AddressBook {
  limit: number = 50;
  offset: number = 0;
  sl: number = 0;
  isSearchMode: boolean = false;
  totalCount: number = 0;
  hasMore: boolean = true;

  addressBookData: AddressBookData[] = [];
  campains: string[] = [];


  ngOnInit(): void {
    this.getCampains();
    this.loadAddressBook()
  }

  constructor(
    private apiService: ApiService
  ) { }

  loadAddressBook() {
    this.apiService.addressBook(this.campains).subscribe({
      next: (res: any) => {
        console.log(this.campains)
        console.log(res);
        this.formateData(res);
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

getCampains() {

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
