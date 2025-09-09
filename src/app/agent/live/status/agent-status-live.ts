import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
//components
import { PageHeader } from '../../shared/page-header/page-header';
import { Paginator } from '../../shared/paginator/paginator';
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';

export interface AgentStatusData {
  name: string,
  agentID: string,
  extension: number
  agentStatus: string,
  campaigns: string[],
  sessionid: string,
  loginTime: string,
  remoteIP: string
}

@Component({
  selector: 'app-agent-status-live',
  imports: [CommonModule, PageHeader, Paginator, StickyTableHeaderDirective],
  templateUrl: './agent-status-live.html',
  styleUrl: './agent-status-live.css'
})
export class AgentStatusLive implements OnInit {
  limit = 30;
  offset = 0;
  sl = 0;
  hasMore = true;
  totalCount = 0;
  agentStatusData: AgentStatusData[] = []

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadAgentStatus()
  }

  loadAgentStatus() {
    this.apiService.agentStatus().subscribe({
      next: (res) => {
        console.log(res);
        // console.log(JSON.parse(res.data))
        this.formateData(res);

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  formateData(res: any) {
    try {
      if (res.success === 'YES' && res.data) {
        let rows: AgentStatusData[] = [];

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

        // Map table format
        this.agentStatusData = rows.map((item: AgentStatusData) => ({
          name: item.name || '-',
          agentID: item.agentID || '-',
          extension: item.extension || 0,
          agentStatus: item.agentStatus || '-',
          campaigns: item.campaigns || ['-'],
          sessionid: item.sessionid || '-',
          loginTime: item.loginTime || '-',
          remoteIP: item.remoteIP || '-'
        }));
        // Update paginator info
        this.hasMore = (this.offset + this.limit) < this.totalCount;
      } else {
        this.agentStatusData = [];
        this.hasMore = false;
      }
    } catch (error) {
      console.error(error);
      this.agentStatusData = [];
      this.hasMore = false;
    }

    this.cdr.detectChanges();
  }

  nextPage() {
    const nextOffset = this.offset + this.limit;
    this.offset = nextOffset;
    this.sl += this.limit;
    this.loadAgentStatus();
  }

  prevPage() {


    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.sl -= this.limit;
      this.loadAgentStatus();
    }
  }


}
