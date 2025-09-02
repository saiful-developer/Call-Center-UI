import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
//comspnents
import { PageHeader } from '../page-header/page-header';
import { Paginator } from '../paginator/paginator';

export interface WaitingCallData {
  UniqueID: string,
  Calldate: string,
  Caller: string,
  Campaign: string,
  Channel: string,
  Position: string
}

@Component({
  selector: 'app-waiting-calls-live',
  imports: [CommonModule, PageHeader, Paginator],
  templateUrl: './waiting-calls-live.html',
  styleUrl: './waiting-calls-live.css'
})
export class WaitingCallsLive implements OnInit {
  limit = 30;
  offset = 0;
  sl = 0;
  totalCount = 0;
  isSearchMode = false;
  hasMore = true;

  errorMassage = ''

  witingCallData: WaitingCallData[] = [];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadWaitingCalls()
  }

  loadWaitingCalls() {
    this.apiService.waitingCalls().subscribe({
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
        this.errorMassage = 'Data Not Found'
      }
    } catch (error) {
      console.error(error);
      this.witingCallData = [];
      this.hasMore = false;
      this.errorMassage = 'Data Not Found';
    }

    console.log(this.witingCallData)

    this.cdr.detectChanges();
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
