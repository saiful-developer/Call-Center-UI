import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
//comspnents
import { PageHeader } from '../page-header/page-header';
import { Paginator } from '../paginator/paginator';

export interface TrunkStatusData {
  Username: string,
  Domain: string,
  Status: string;
  Event: string,
  Privilege: string,
  ChannelType: string,
  datetime:string
}

@Component({
  selector: 'app-trunk-status-live',
  imports: [CommonModule, PageHeader, Paginator],
  templateUrl: './trunk-status-live.html',
  styleUrl: './trunk-status-live.css'
})
export class TrunkStatusLive implements OnInit {
  limit = 30;
  offset = 0;
  sl = 0;
  totalCount = 0;
  isSearchMode = false;
  hasMore = true;

  trunkStatusData: TrunkStatusData[] = [];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadtrunkStatus()
  }

  loadtrunkStatus() {
    this.apiService.trunkStatus().subscribe({
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

    this.cdr.detectChanges();
  }

  nextPage() {
    this.offset += this.limit;
    this.sl += this.limit;
    this.loadtrunkStatus()
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.sl -= this.limit;
      this.loadtrunkStatus();
    }
  }

}
