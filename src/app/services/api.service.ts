import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';



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


  incomingReport (agent: string, limit: number, offset: number) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/agent/incoming/getIncomingOnLimit`, {
      agent: agent,
      limit: limit,
      offset: offset
    });
  }

  outgoingReport (agent: string, limit: number, offset: number) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/agent/outgoing/getOutgoingOnLimit`, {
      agent: agent,
      limit: limit,
      offset: offset
    });
  }

}
