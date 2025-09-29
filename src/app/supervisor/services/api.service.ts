import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://callmaster.kotha.com.bd:3090';

  constructor(private http: HttpClient) { }

  incomingSummary(agent: string, campaignList: string[], calldate: string) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/supervisor/dashboard/incomingSummary`, {
      agent: agent,
      campaignList: campaignList,
      calldate:calldate
    })
  }

  /** Reports **/

  incomingReport(agent: string, campaignList: string[], offset: number, limit: number, isexport: boolean) {
    
    
    return this.http.post<any>(`${this.baseUrl}/api/v1/supervisor/incoming/incomingCalls`, {
      agent: agent,
      campaignList: campaignList,
      offset: offset,
      limit: limit,
      isexport: isexport
      
    })
  }

  incomingReportOnFilter(agent: string, campain: string, campainList: string[], isexport: boolean, formDate: string, limit: number, offset: number, page: number, srcNumber: string, status: string, toDate: string) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/supervisor/incoming/incomingCallsOnFilter`, {
      agent: agent,
      campaign: campain,
      campaignList: campainList,
      export: isexport,
      fromDate: formDate,
      limit: limit,
      offset: offset,
      page: page,
      srcNumber: srcNumber,
      status: status,
      toDate: toDate
    });
  }

  outgoingReports(agent: string, campaignList: string[], isexport: boolean, limit: number, offset: number) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/supervisor/outgoing/outgoingCalls`, {
      agent: agent,
      campaignList: campaignList,
      export: isexport,
      limit: limit,
      offset: offset
    });
  }

  outgoingReportsOnFilter(agent: string, campaign: string, campaignList: string[], destNumber: string, isExport: boolean, fromDate: string, limit: number, offset: number, page: number, status: string, toDate: string) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/supervisor/outgoing/outgoingCallsOnFilter`, {
      agent: agent,
      campaign: campaign,
      campaignList: campaignList,
      destNumber: destNumber,
      export: isExport,
      fromDate: fromDate,
      limit: limit,
      offset: offset,
      page: page,
      status: status,
      toDate: toDate
    });
  }

  breakReports(agent: string, campaignList: string[], limit: number, offset: number) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/supervisor/break/agentBreakOnLimit`, {
      agent: agent,
      campaignList: campaignList,
      limit: limit,
      offset: offset
    })
  }

  breakReportOnFilter(agent: string, campaign: string, campaignList: string[], fromDate: string, limit: number, offset: number, page: number, toDate: string) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/supervisor/break/agentBreakOnFilter`, {
      agent: agent,
      campaign: campaign,
      campaignList: campaignList,
      fromDate: fromDate,
      limit: limit,
      offset: offset,
      page: page,
      toDate: toDate
    })
  }

  getLoginReport(agent: string, campaign: string, campaignList: string[], limit: number, offset: number) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/supervisor/agent/agentLoginOnLimit`, {
      agent: agent,
      campaign: campaign,
      campaignList: campaignList,
      limit: limit,
      offset: offset
    })
  }

  LoginReportOnFilter(agent: string, campaign: string, campaignList: string[], fromDate: string, limit: number, offset: number, page: number, toDate: string) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/supervisor/agent/agentLoginOnFilter`, {
      agent: agent,
      campaign: campaign,
      campaignList: campaignList,
      fromDate: fromDate,
      limit: limit,
      offset: offset,
      page: page,
      toDate: toDate
    })
  }

  //agnet pasing data 'hidoy'
  abandonCallReport(agent: string, campaign: string[], limit: number, offset: number) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/supervisor/incoming/abandonNoCallbackCalls`, {
      agent: agent,
      campaign: campaign,
      limit: limit,
      offset: offset
    })
  }

  //agnet is empty here
  abandonCallReportOnFilter(agent: string, campaign: string, campaignList: string[], fromDate: string, limit: number, offset: number, page: number, toDate: string) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/supervisor/incoming/abandonNoCallbackCallsOnFilter`, {
      agent: agent,
      campaign: campaign,
      campaignList: campaignList,
      fromDate: fromDate,
      limit: limit,
      offset: offset,
      page: page,
      toDate: toDate
    })
  }


  RNAReport(agent: string, limit: number, offset: number) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/supervisor/incoming/RNAOnLimit`, {
      agent: agent,
      limit: limit,
      offset: offset
    })
  }

  RNAOnFilter(agent: string, campaign: string, campaignList: string[], fromDate: string, limit: number, offset: number, page: number, toDate: string) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/supervisor/incoming/RNAOnFilter`, {
      agent: agent,
      campaign: campaign,
      campaignList: campaignList,
      fromDate: fromDate,
      limit: limit,
      offset: offset,
      page: page,
      toDate: toDate
    });
  }

  //disposition
  dispositionReport(campaigns: string[], fromDate: string, limit: number, offset: number, toDate: string, campaign?: string) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/supervisor/report/disposition/lists`, {
      campaign: campaign,
      campaigns: campaigns,
      fromDate: fromDate,
      limit: limit,
      offset: offset,
      toDate: toDate
    })
  }



  /** Live **/

  agentStatus() {
    return this.http.post<any>(`${this.baseUrl}/api/v1/agent/live/agent`, {

    })
  }

  activeExtentation() {
    return this.http.post<any>(`${this.baseUrl}/api/v1/agent/live/extension `, {});
  }

  activeTrunk() {
    return this.http.post<any>(`${this.baseUrl}/api/v1/agent/live/trunk`, {});
  }

  queueWaitingCalls() {
    return this.http.post<any>(`${this.baseUrl}/api/v1/agent/live/queuewaitcall`, {});
  }

  addressBook(campaigns: string[]) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/agent/live/addressbook`, {});

  }


}
