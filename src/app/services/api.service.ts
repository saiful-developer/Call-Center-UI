import { Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://callmaster.kotha.com.bd:3090';

  constructor(private http: HttpClient) { }

  loginAgent(agentId: string, password: string, extension: number) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/auth/loginbyid`, {
      agentid: agentId,
      password: password,
      extension: extension
    });
  }

  loadCampaigns() {
    return this.http.get<any[]>(`${this.baseUrl}/api/v1/agent/campaign/lists`);
  }




  incomingReport(agent: string, limit: number, offset: number) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/agent/incoming/getIncomingOnLimit`, {
      agent: agent,
      limit: limit,
      offset: offset
    });
  }

  incomingBySearch(agent: string, campaign: string, fromDate: string, toDate: string, srcNumber: string, status: string, limit: number, offset: number, page: number) {
    return this.http.post(`${this.baseUrl}/api/v1/agent/incoming/incomingBySearch`, {
      agent: agent,
      campaign: campaign,
      fromDate: fromDate,
      toDate: toDate,
      srcNumber: srcNumber,
      status: status,
      limit: limit,
      offset: offset,
      page: page
    })

  }

  outgoingBySearch(agent: string, campaign: string, fromDate: string, toDate: string, destNumber: string, status: string, limit: number, offset: number, page: number) {
    return this.http.post(`${this.baseUrl}/api/v1/agent/outgoing/outgoingOnFilter`, {
      agent: agent,
      campaign: campaign,
      fromDate: fromDate,
      toDate: toDate,
      destNumber: destNumber,
      status: status,
      limit: limit,
      offset: offset,
      page: page
    });

  }

  outgoingReport(agent: string, limit: number, offset: number) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/agent/outgoing/getOutgoingOnLimit`, {
      agent: agent,
      limit: limit,
      offset: offset
    });
  }

  BreakReports(agent: string, limit: number, offset: number) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/agent/break/getAgentBreakOnLimit`, {
      agent: agent,
      limit: limit,
      offset: offset
    });
  }

  BreakReportsSearch(agent: string, campaign: string, fromDate: string, toDate: string, limit: number, offset: number, page: number) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/agent/break/getAgentBreakOnFilter`, {
      agent: agent,
      campaign: campaign,
      FormData: fromDate,
      toDate: toDate,
      limit: limit,
      offset: offset,
      page: page
    })
  }

  loginReports(agent: string, limit: number, offset: number) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/agent/auth/getAgentLoginOnLimit`, {
      agent: agent,
      limit: limit,
      offset: offset
    });
  }

  loginReportsSearch(agent: string, campaign: string, fromDate: string, toDate: string, limit: number, offset: number, page: number) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/agent/auth/getAgentLoginOnFilter`, {
      agent: agent,
      campaign: campaign,
      fromDate: fromDate,
      toDate: toDate,
      limit: limit,
      offset: offset,
      page: page
    })
  }

  abandonReports(agent: string, campaign: string[], limit: number, offset: number) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/agent/incoming/getAbandonNoCallbackCalls`, {
      agent: agent,
      campaign: campaign,
      limit: limit,
      offset: offset
    })
  }

  ringNoAnswerReport(agent: string, limit: number, offset: number) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/agent/incoming/getRNAOnLimit`, {
      agent: agent,
      limit: limit,
      offset: offset
    })
  }

  tingNoAnswerReportsSearch(agent: string, campaign: string, fromDate: string, toDate: string, limit: number, offset: number, page: number) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/agent/incoming/getRNAOnFilter`, {
      agent: agent,
      campaign: campaign,
      fromDate: fromDate,
      toDate: toDate,
      limit: limit,
      offset: offset,
      page: page
    })
  }

  abandonCallStatus(campaign: string[]) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/agent/incoming/abandonCallOnCampaign`, {
      campaign: campaign
    });
  }

}
