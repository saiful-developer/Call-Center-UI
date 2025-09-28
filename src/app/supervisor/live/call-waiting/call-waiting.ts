import { Component } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';
import { Paginator } from '../../shared/paginator/paginator';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

export interface WaitingCallData {
  UniqueID: string,
  Calldate: string,
  Caller: string,
  Campaign: string,
  Channel: string,
  Position: string
}

@Component({
  selector: 'app-call-waiting',
  imports: [PageHeader, Paginator, CommonModule],
  templateUrl: './call-waiting.html',
  styleUrl: './call-waiting.css'
})
export class CallWaiting {
  limit = 30;
  offset = 0;
  sl = 0;
  totalCount = 0;
  isSearchMode = false;
  hasMore = true;

  witingCallData: WaitingCallData[] = [];

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.loadWaitingCalls()
  }

  loadWaitingCalls() {
    this.api.queueWaitingCalls().subscribe({
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
    if (res.success === 'YES' && res.data) {
      let rows: WaitingCallData[] = [];

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
      this.witingCallData = rows.map((item: WaitingCallData) => ({
        UniqueID: item.UniqueID || '-',
        Calldate: item.Calldate || '-',
        Caller: item.Caller || '-',
        Campaign: item.Campaign || '-',
        Channel: item.Channel || '-',
        Position: item.Position || '-'
      }));
      // Update paginator info
      this.hasMore = (this.offset + this.limit) < this.totalCount;
    } else {
      this.witingCallData = [];
      this.hasMore = false;
    }
    console.log(this.witingCallData)
  }

  nextPage() {
    this.offset += this.limit;
    this.sl += this.limit;
    this.loadWaitingCalls()
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.sl -= this.limit;
      this.loadWaitingCalls();
    }
  }



}
