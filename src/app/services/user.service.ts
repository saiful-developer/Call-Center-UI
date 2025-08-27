import { Injectable } from '@angular/core';
import { AgentData, JwtPayload } from '../models/agent.model';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  decodeToken(token: any): JwtPayload | null {
    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1]; // header.payload.signature
      const payloadJson = atob(payloadBase64);  // decode base64
      return JSON.parse(payloadJson) as JwtPayload;

    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  }

}
