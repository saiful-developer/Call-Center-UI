import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://callmaster.kotha.com.bd:3090';

  constructor(private http: HttpClient) {}

  incomingReport(agent: string, campaignList: string[], offset: number, limit: number, isexport: boolean) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/supervisor/incoming/incomingCalls`, {
      agent: agent,
      campaignList: campaignList,
      offset: offset,
      limit: limit,
      export: isexport
    })
  }

  incomingReportOnFilter(agent: string, campain: string, campainList: string[], isexport: boolean, formDate: string, limit: number, offset: number, page: number, srcNumber: string, status: string, toDate: string) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/supervisor/incoming/incomingCallsOnFilter`, {
      agent: agent,
      campain: campain,
      campainList: campainList,
      export: isexport,
      formDate: formDate,
      limit: limit,
      offset: offset,
      page: page,
      srcNumber: srcNumber,
      status: status,
      toDate: toDate

    });
  }



}
