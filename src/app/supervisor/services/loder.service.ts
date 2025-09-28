/***
 * this service is for 'assets/supervisor/css/style.css',
 * this file is huge so I wnat to show a loader specific while loding this file
 */


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoderService {

  private loading = new BehaviorSubject(false);
  isLoading$ = this.loading.asObservable();

  show() { this.loading.next(true); }
  hide() { this.loading.next(false); }

}
