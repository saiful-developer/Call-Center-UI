import { Component } from '@angular/core';

// components
import { MessageList } from './message-list/message-list';
import { MessageDetails } from './message-details/message-details';

@Component({
  selector: 'app-agent-inbox',
  imports: [MessageList, MessageDetails],
  templateUrl: './agent-inbox.html',
  styleUrl: './agent-inbox.css'
})
export class AgentInbox {

  selectedMessage: any = null;

  onMessageSelected(message: any) {
    this.selectedMessage = message;
  }

}
