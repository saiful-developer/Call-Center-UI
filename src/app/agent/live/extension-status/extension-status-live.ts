import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
//components
import { PageHeader } from '../../shared/page-header/page-header';
import { Paginator } from '../../shared/paginator/paginator';
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';

export interface ExtensionStatusData {
  Exten: string,
  Address: string,
  PeerStatus: string,
  datetime: string,
  StatusText?: string,
  Context?: string
}

@Component({
  selector: 'app-extension-status-live',
  imports: [CommonModule, PageHeader, Paginator, StickyTableHeaderDirective],
  templateUrl: './extension-status-live.html',
  styleUrl: './extension-status-live.css'
})
export class ExtensionStatusLive implements OnInit {
  limit = 30;
  offset = 0;
  sl = 0;
  totalCount = 0;
  isSearchMode = false;
  hasMore = true;

  extensionStatusData: ExtensionStatusData[] = [];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadExtensionStatus()
  }

  loadExtensionStatus() {
    this.apiService.extensionStatus().subscribe({
      next: (res) => {
        console.log(res)
        this.formateData(res);

      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  // for initial load and search result
  formateData(res: any) {
    try {
      if (res.success === 'YES' && res.data) {
        let rows: ExtensionStatusData[] = [];


        if (typeof res.data === 'string') {
          const parsedData = JSON.parse(res.data); 

          if (parsedData && Array.isArray(parsedData)) {
            rows = parsedData;
            this.totalCount = parsedData.length;
          }
        }
        // If res.data is already an array (search)
        else if (Array.isArray(res.data)) {
          rows = res.data;
          this.totalCount = res.length;
        }

        // Map to your table format
        this.extensionStatusData = rows.map((item: ExtensionStatusData) => ({
          Exten: item.Exten || '-',
          Address: item.Address || '-',
          PeerStatus: item.PeerStatus || '-',
          datetime: item.datetime || '-',
          StatusText: item.StatusText || '-',
          Context: item.Context || '-'
        }));
        // Update paginator info
        this.hasMore = (this.offset + this.limit) < this.totalCount;
      } else {
        this.extensionStatusData = [];
        this.hasMore = false;
      }
    } catch (error) {
      console.error('Error parsing break data:', error);
      this.extensionStatusData = [];
      this.hasMore = false;
    }

    this.cdr.detectChanges();
  }


  nextPage() {
    this.offset += this.limit;
    this.sl += this.limit;
    this.loadExtensionStatus(); // fetch next page of default list

  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.sl -= this.limit;
      this.loadExtensionStatus();
    }
  }

}
