import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSoketService implements OnDestroy {

  private socket: Socket | undefined;

  constructor() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],    //force websocket
      reconnection: true,           //auto reconnect
      reconnectionAttempts: 5,      //retry limit
      reconnectionDelay: 1000       //retry every 1s 
    });

  }

  //emit an event to server
  emit(event: string, data?: any) {
    this.socket?.emit(event, data);
  }

  on<T>(eventName: string): Observable<T> {
    // this will send data whenever the socket receives an event
    return new Observable<T>((observer) => {

      // Listen for the event from the server
      const listener = (data: T) => {
        observer.next(data); // send the received data to whoever subscribed
      };

      this.socket?.on(eventName, listener); // attach listener to the socket

      // Cleanup function: called when subscriber unsubscribes
      return () => {
        this.socket?.off(eventName, listener); // remove the listener
      };
    });
  }



  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
