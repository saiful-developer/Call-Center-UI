import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  getLoginTime(): number | null {
    const loginTime = sessionStorage.getItem('loginTime');
    return loginTime ? parseInt(loginTime, 10) : null;
  }

  getFormattedLoginTime(): string {
    const loginTime = this.getLoginTime();
    if (!loginTime) return 'Not logged in';

    const date = new Date(loginTime);

    // Format in 12h with AM/PM
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 -> 12

    return `${hours}h : ${minutes}m : ${seconds}s ${ampm}`;
  }

  getLoginDuration(): string {
    const loginTime = this.getLoginTime();
    if (!loginTime) return 'Not logged in';

    const now = Date.now();
    const diff = now - loginTime; // ms

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

}
