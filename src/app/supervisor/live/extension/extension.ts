import { Component } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';
import { Paginator } from '../../shared/paginator/paginator';
import { CommonModule } from '@angular/common';
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';
import { ApiService } from '../../services/api.service';

export interface ExtensionStatusData {
  Exten: string,
  Address: string,
  PeerStatus: string,
  datetime: string,
  StatusText?: string,
  Context?: string
}

@Component({
  selector: 'app-extension',
  imports: [PageHeader, Paginator, CommonModule, StickyTableHeaderDirective],
  templateUrl: './extension.html',
  styleUrl: './extension.css'
})
export class Extension {
  offset: number = 0;
  sl: number = 0
  limit: number = 50;
  hasMore: boolean = true;
  totalCount: number = 0;

  extensionStatusData: ExtensionStatusData[] = [];

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.loadExtensionStatus()
  }

  loadExtensionStatus() {
    this.apiService.activeExtentation().subscribe({
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
        this.sl = this.offset;


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
  }

  onPageChange(newOffset: number) {
  this.offset = newOffset;
  this.loadExtensionStatus();
}


}
