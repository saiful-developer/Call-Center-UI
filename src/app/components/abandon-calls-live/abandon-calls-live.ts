import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PageHeader } from '../page-header/page-header';
import { CommonModule } from '@angular/common';
import { Paginator } from '../paginator/paginator';
import { StickyTableHeaderDirective } from '../../directives/sticky-table-header';

export interface AbandonCallData {
  uniqueid: string;
  enterqueue_time: string;
  src: string;
  dst: string;
  campaign: string;
  queue_duration: number;
  hangup_time: string;
  callback: number;
}


@Component({
  selector: 'app-abandon-calls-live',
  imports: [PageHeader, CommonModule, Paginator, StickyTableHeaderDirective],
  templateUrl: './abandon-calls-live.html',
  styleUrl: './abandon-calls-live.css'
})
export class AbandonCallsLive implements OnInit {
  limit = 50;
  offset = 0;
  sl = 0;
  isSearchMode = false;
  totalCount = 0;
  hasMore = true;

  abandonCallData: any[] = [];
  campains: string[] = [];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCampainList()
  }

  loadAbandonCall() {
    this.apiService.abandonCallStatus(this.campains).subscribe({
      next: (res) => {
        console.log(this.campains)
        console.log();
        
        console.log(res)
        this.formateAbandonCallData(res);
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
        this.loadAbandonCall()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  formateAbandonCallData(res: any) {
    try {
      if (res.success === 'YES' && res.data) {
        let rows: AbandonCallData[] = [];
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
        this.abandonCallData = rows.map((item: AbandonCallData) => ({
          uniqueid: item.uniqueid || '',
          enterqueue_time: item.enterqueue_time || '',
          src: item.src || '',
          dst: item.dst || '',
          campaign: item.campaign || '',
          queue_duration: item.queue_duration || 0,
          hangup_time: item.hangup_time || '',
          callback: item.callback || 0
        }));
        // Update paginator info
        this.hasMore = (this.offset + this.limit) < this.totalCount;
      } else {
        this.abandonCallData = [];
        this.hasMore = false;
      }
    } catch (error) {
      console.error(error);
      this.abandonCallData = [];
      this.hasMore = false;
    }

    this.cdr.detectChanges();
  }

  nextPage() {
  const nextOffset = this.offset + this.limit;

  console.log('nextOffset: ', nextOffset);
  console.log('offset: ', this.offset);
  console.log('next offset: ', nextOffset);
  console.log('limit: ', this.limit);
  console.log('total count', this.totalCount);
  
  
  // Check if next offset exceeds total count
  if (nextOffset < this.totalCount) {
    this.offset = nextOffset;
    this.sl += this.limit;
    this.loadAbandonCall();
  }
  }

  prevPage() {


  if (this.offset >= this.limit) {
    this.offset -= this.limit;
    this.sl -= this.limit;
    this.loadAbandonCall();
  }
        console.log('offset: ', this.offset);
  // console.log('next offset: ', nextOffset);
  console.log('limit: ', this.limit);
  console.log('total count', this.totalCount);

  }

}
