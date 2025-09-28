import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { subscribeOn, Subscription } from 'rxjs';
import { WebSoketService } from '../../../services/web-soket.service';

@Component({
  selector: 'app-test-websocket-supervisor',
  imports: [CommonModule, FormsModule],
  templateUrl: './test-websocket-supervisor.html',
  styleUrl: './test-websocket-supervisor.css'
})
export class TestWebsocketSupervisor implements OnInit, OnDestroy {
  notificationSupervisor: string = '';
  getNotificatioinListSupervisor: string[] = [];

  socketSub?: Subscription;

  constructor(private websocketService: WebSoketService) { }

  ngOnInit(): void {
    this.getNotificationFromAgent()
  }

  getNotificationFromAgent() {
    this.socketSub = this.websocketService.on('Message').subscribe((msg) => {
      this.getNotificatioinListSupervisor.push(String(msg));
    })
  }

  sendNotification(): void {
    if (this.notificationSupervisor !== '') {
      this.websocketService.emit('Message', this.notificationSupervisor);
      this.notificationSupervisor = '';
    }
  }

    ngOnDestroy(): void {
      this.socketSub?.unsubscribe();
    }

  }
