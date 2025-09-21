import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
//components
import { PageHeader } from '../../shared/page-header/page-header';
import { Paginator } from '../../shared/paginator/paginator';
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

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
  imports: [CommonModule, PageHeader, Paginator, StickyTableHeaderDirective, ReactiveFormsModule, FormsModule],
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
  allAgentStatusData: AgentStatusData[] = []; //store all data for filtering

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadAgentStatus()
    this.campainListFromSesson()
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
        // Save original data for filtering
        this.allAgentStatusData = [...this.agentStatusData];
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



  // **************Search functionality

  campains: string[] = [];

  searchActiveAgent = new FormGroup({
    name: new FormControl(''),
    agentId: new FormControl(''),
    extension: new FormControl(''),
    campaign: new FormControl(''),
    status: new FormControl('')
  });

  onSearchUi() {
    console.log(this.searchActiveAgent.value)

    const { name, agentId, extension, campaign, status } = this.searchActiveAgent.value;

    console.log(name)

    this.agentStatusData = this.allAgentStatusData.filter(agent => {
      return (
        (!name || agent.name.toLowerCase().includes(name.toLowerCase())) &&
        (!agentId || agent.agentID.toLowerCase().includes(agentId.toLowerCase())) &&
        (!extension || agent.extension === +extension) &&
        (!campaign || agent.campaigns.includes(campaign)) &&
        (!status || agent.agentStatus === status)
      );
    });

    /*  
      name = '' --> !name = true;   
      name = 'agent' --> !name = false;

      if any of  condition(&&) false, item will not included
      only way of getting false is 
        field is not empty = flase || not includes = false --> false
    */
  }

  resetSearch() {
    this.searchActiveAgent.reset();
    this.agentStatusData = [...this.allAgentStatusData];
  }

  // get campain form sesson
  campainListFromSesson() {
    const jsonString = sessionStorage.getItem('user')

    if (jsonString) {
      const obj = JSON.parse(jsonString);
      this.campains = obj.campaigns;
    }
  }


}
