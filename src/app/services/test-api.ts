import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestApiService {
  // Reports of Agent Panel
  baseURL = 'http://callmaster.kotha.com.bd'

  constructor(private http: HttpClient){}

  getData1(): Observable<any> {
    console.log(this.baseURL)
    return this.http.get<any>(this.baseURL);
    
  }

  getData2() {

  }

  
}
