import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoderService {

    private loading$ = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.loading$.asObservable();

  private elapsed$ = new BehaviorSubject<number>(0);
  public elapsedMs$ = this.elapsed$.asObservable();

  private _start = 0;
  private _tickSub: Subscription | null = null;
  private _hideTimer: ReturnType<typeof setTimeout> | null = null;

  show() {
    this._start = performance.now();
    this.elapsed$.next(0);

    this.loading$.next(true);

    this._tickSub?.unsubscribe();
    this._tickSub = interval(100).subscribe(() => {
      this.elapsed$.next(performance.now() - this._start);
    });
  }

  hide(holdMs = 300) {
    const duration = performance.now() - this._start;
    this.elapsed$.next(duration);

    this._tickSub?.unsubscribe();
    this._tickSub = null;

    if (this._hideTimer) clearTimeout(this._hideTimer);
    this._hideTimer = setTimeout(() => {
      this.loading$.next(false);
      this.elapsed$.next(0);
      this._start = 0;
      this._hideTimer = null;
    }, holdMs);
  }
}
