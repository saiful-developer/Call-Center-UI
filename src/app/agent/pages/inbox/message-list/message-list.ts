import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-message-list',
  imports: [],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css'
})
export class MessageList {

  @Output() selectMessage = new EventEmitter<any>();
  selectedMessageId: number | null = null;

  messages = [
    { id: 1, subject: 'Hello Agent', from: 'user1@example.com', body: 'Hi there!', avatar: '' },
    { id: 2, subject: 'Project Update', from: 'user2@example.com', body: 'Project is on track.', avatar: '' },
    { id: 3, subject: 'Meeting Schedule', from: 'user3@example.com', body: 'Meeting at 3 PM.', avatar: '' },
    { id: 4, subject: 'Add a Project', from: 'user4@example.com', body: 'Add the project as soon as possible.', avatar: '' },
    { id: 5, subject: 'Weekly Report', from: 'user5@example.com', body: 'Here is the weekly report.', avatar: '' },
    { id: 6, subject: 'Client Feedback', from: 'user6@example.com', body: 'Client liked the new design.', avatar: '' },
    { id: 7, subject: 'Bug Fix', from: 'user7@example.com', body: 'Fixed the critical bug.', avatar: '' },
    { id: 8, subject: 'Team Meeting', from: 'user8@example.com', body: 'Meeting rescheduled to tomorrow.', avatar: '' },
    { id: 9, subject: 'Holiday Notice', from: 'user9@example.com', body: 'Office closed next Friday.', avatar: '' },
    { id: 10, subject: 'New Policy', from: 'user10@example.com', body: 'Please read the updated policy.', avatar: '' },
  ];

  select(msg: any) {
    this.selectedMessageId = msg.id;
    this.selectMessage.emit(msg);
  }

}
