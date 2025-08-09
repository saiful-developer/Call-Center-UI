import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-message-list',
  imports: [],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css'
})
export class MessageList {

  @Output() selectMessage = new EventEmitter<any>();

  messages = [
    { id: 1, subject: 'Hello Agent', from: 'user1@example.com', body: 'Hi there!' },
    { id: 2, subject: 'Project Update', from: 'user2@example.com', body: 'Project is on track.' },
    { id: 3, subject: 'Meeting Schedule', from: 'user3@example.com', body: 'Meeting at 3 PM.' }
  ];
  select(msg: any) {
    this.selectMessage.emit(msg);
  }

}
