import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Paginator } from "../../shared/paginator/paginator";
import { StickyTableHeaderDirective } from '../../../directives/sticky-table-header';
import { PageHeader } from '../../shared/page-header/page-header';

export interface AgentStatusList {
  monitor: string;              // Not present in response → need to map manually
  agent: string;                //  agentName
  agentID: string                //Agent Id
  extension: number;            //  agentExtension
  campaign: string[];           //  campaigns (array of strings)
  status: string;               //  agentStatus
  break: string;                //  Break
  calldate: string;             //   datetime
  caller: string;               //   callerNumber
  duration: string;             //   callStartTime (empty string now, so string type)
  direction: string;            //   callType
  callQueue: string;            //   callQueue
  loginTime: string;            //   datetime or sessionid (depending on use case)
  Paused: number;               //   BreakReason
  callsTaken: string;           //   CallsTaken
  inCall: number;               //   InCall
  lastCall: number;             //   LastCall
}

//json for check
[
  {
    "agentName": "Agent 1",
    "agentID": "agent1",
    "agentExtension": 2002,
    "agentStatus": "READY",
    "email": "agent1@bdcom.com",
    "campaigns": ["bdcom"],
    "sessionid": "20250923145811005",
    "datetime": "2025-09-23 14:58:11",
    "remoteIP": "210.4.77.231",
    "branchid": 27,
    "gender": "1",
    "expireTimestamp": 1758646669000,
    "socketID": "IL0MCXXnGv80ksrHAAAR",
    "Break": "0",
    "BreakReason": "",
    "Paused": 1,
    "PausedReason": "",
    "callRunning": 0,
    "CallsTaken": "0",
    "callQueue": "bdcom",
    "callType": "OUT",
    "callStatus": "CONNECT",
    "callerNumber": "01713331461",
    "callStartTime": "",
    "InCall": "0",
    "LastCall": "0"
  }
]




@Component({
  selector: 'app-agent-status',
  imports: [PageHeader, ReactiveFormsModule, CommonModule, Paginator, StickyTableHeaderDirective],
  templateUrl: './agent-status.html',
  styleUrl: './agent-status.css'
})
export class AgentStatus implements OnInit {

  campaignList: string[] = [];
  allAgentStatusData: AgentStatusList[] = [];
  agentStatusList: AgentStatusList[] = [];
  agent: string = '';
  isSearchMode: boolean = false;
  offset: number = 0;
  limit: number = 50;
  hasMore: boolean = true;
  sl: number = 0;
  page: number = 1;
  count: number = 0;
  searchFormBreak: any;

  constructor(
    private api: ApiService
  ) { }


  ngOnInit(): void {
    this.getAgentStatus()
    this.campainListFromSesson()

  }

  getAgentStatus() {
    this.api.agentStatus().subscribe({
      next: (res) => {
        console.log(res);
        this.formateAgentStatusData(res)

      },
      error: (err) => {
        console.log(err);

      }
    })
  }



  agentStatusForm = new FormGroup({
    name: new FormControl(''),
    agentId: new FormControl(''),
    extension: new FormControl(''),
    campain: new FormControl(''),
    status: new FormControl('')
  });


  onSearchUi() {

    console.log(this.agentStatusForm.value);

    const { name, agentId, extension, campain, status } = this.agentStatusForm.value;

    this.agentStatusList = this.allAgentStatusData.filter(agent => {
      return (
        (!name || agent.agent.toLowerCase().includes(name.toLowerCase())) &&
        (!agentId || agent.agentID.toLowerCase().includes(agentId.toLowerCase())) &&
        (!extension || agent.extension === +extension) &&
        (!campain || agent.campaign.includes(campain)) &&
        (!status || agent.status === status)
      );
    });



  }

  resetSearch() {
    this.agentStatusForm.reset();
    this.agentStatusList = [...this.allAgentStatusData];
  }

  nextPage() {
    const nextOffset = this.offset + this.limit;
    this.offset = nextOffset;
    this.sl += this.limit;
    this.getAgentStatus();
  }

  prevPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.sl -= this.limit;
      this.getAgentStatus();
    }
  }

  onPageChange(newOffset: number) {
  this.offset = newOffset;
  this.getAgentStatus();
}

  // for initial load and search result
  formateAgentStatusData(res: any) {
    if (res.success === 'YES' && res.data) {
      let rows: AgentStatusList[] = [];

      // Check if res.data is a string (initial load)
      if (typeof res.data === 'string') {
        const parsedData = JSON.parse(res.data); // { count, rows }

        if (parsedData && Array.isArray(parsedData)) {
          rows = parsedData;
        }
      }
      // If res.data is already an array
      else if (Array.isArray(res.data)) {
        rows = res.data;
      }

      console.log(rows.length);


      // map  table format
      this.agentStatusList = rows.map((item: any): AgentStatusList => ({
        monitor: '-',
        agent: item.agentName,
        agentID: item.agentID,
        extension: item.agentExtension,
        campaign: item.campaigns,
        status: item.agentStatus,
        break: item.Break,
        calldate: item.datetime,
        caller: item.callerNumber,
        duration: item.callStartTime,
        direction: item.callType,
        callQueue: item.callQueue,
        loginTime: item.datetime,
        Paused: item.Paused,
        callsTaken: item.CallsTaken,
        inCall: Number(item.InCall),
        lastCall: Number(item.LastCall)
      }));


      this.allAgentStatusData = [...this.agentStatusList];

    } else {
      this.agentStatusList = [];
    }
  }


  // get campain form sesson
  campainListFromSesson() {
    const jsonString = sessionStorage.getItem('user')

    if (jsonString) {
      const obj = JSON.parse(jsonString);
      this.campaignList = obj.campaigns;
    }
  }

}


interface CallCenterStats {
  offeredCalls: number;
  receivedCalls: number;
  completedCaller: number;
  completedAgent: number;
  abandonedCalls: number;
  ringNoAnswer: number;

  averageQueueTime: string;
  averageSpeedOfAnswer: string;
  averageTalkTime: string;
  averageAbandonTime: string;
  maximumTalkTime: string;
  maxQueueWaitTime: string;
  firstResponseTime: string;
  averageRingTime: string;
  oldestCall: string;

  answerCallRatio: string;
  abandonCallRatio: string;
  serviceLevel20Sec: string;
}