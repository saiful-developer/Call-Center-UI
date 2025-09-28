import { Component } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';
import { Paginator } from '../../shared/paginator/paginator';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';

export interface TrunkStatusData {
  Username: string,
  Domain: string,
  Status: string;
  Event: string,
  Privilege: string,
  ChannelType: string,
  datetime: string
}

@Component({
  selector: 'app-trunk-status',
  imports: [PageHeader, Paginator, CommonModule],
  templateUrl: './trunk-status.html',
  styleUrl: './trunk-status.css'
})
export class TrunkStatus {
  limit: number = 30;
  offset: number = 0;
  sl: number = 0;
  totalCount: number = 0;
  isSearchMode: boolean = false;
  hasMore: boolean = true;

  trunkStatusData: TrunkStatusData[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.loadtrunkStatus()
  }

  loadtrunkStatus() {
    this.apiService.activeTrunk().subscribe({
      next: (res) => {
        console.log(res)
        this.formateData(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  formateData(res: any) {
    try {
      if (res.success === 'YES' && res.data) {
        let rows: TrunkStatusData[] = [];
        this.sl = this.offset;

        // Check if res.data is a string (initial load)
        if (typeof res.data === 'string') {
          const parsedData = JSON.parse(res.data); // { count, rows }
          if (parsedData && Array.isArray(parsedData)) {
            rows = parsedData;
          }
        }
        // If res.data is already an array (search)
        else if (Array.isArray(res.data)) {
          rows = res.data;
        }

        this.totalCount = rows.length;

        // Map to your table format
        this.trunkStatusData = rows.map((item: TrunkStatusData) => ({
          Username: item.Username || '-',
          Domain: item.Domain || '-',
          Status: item.Status || '-',
          Event: item.Event || '-',
          Privilege: item.Privilege || '-',
          ChannelType: item.ChannelType || '-',
          datetime: item.datetime || '-'
        }));
        // Update paginator info
        this.hasMore = (this.offset + this.limit) < this.totalCount;
      } else {
        this.trunkStatusData = [];
        this.hasMore = false;
      }
    } catch (error) {
      console.error('Error parsing break data:', error);
      this.trunkStatusData = [];
      this.hasMore = false;
    }
  }

  onPageChange(newOffset: number) {
    this.offset = newOffset;
    this.loadtrunkStatus();
  }

}
