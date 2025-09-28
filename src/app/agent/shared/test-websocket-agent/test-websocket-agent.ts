import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { WebSoketService } from '../../../services/web-soket.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-test-websocket-agent',
  imports: [FormsModule, CommonModule],
  templateUrl: './test-websocket-agent.html',
  styleUrl: './test-websocket-agent.css'
})
export class TestWebsocketAgent implements OnInit, OnDestroy {
  notificationAgent: string = '';
  getNotificatioinListAgent: string[] = [];

  socketSub?: Subscription;

  constructor(private websocketService: WebSoketService) {}

  ngOnInit(): void {
    this.getNotificationFromSupervisor();
  }

  getNotificationFromSupervisor(): void {
    this.socketSub = this.websocketService.on('Message').subscribe((msg) => {
      this.getNotificatioinListAgent.push(String(msg));
    })
  }

  sendNotification(): void {
    if(this.notificationAgent !== '') {
      this.websocketService.emit('Message', this.notificationAgent);
      this.notificationAgent = '';
    }
  }

  ngOnDestroy(): void {
    this.socketSub?.unsubscribe();
  }


}
