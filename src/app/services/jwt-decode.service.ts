import { Injectable } from '@angular/core';
import { JwtPayload } from '../interfaces/jwtpayload';

@Injectable({
  providedIn: 'root'
})
export class DecodeToken {
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
