import { Component } from '@angular/core';

// components
import { PageHeader } from '../../components/page-header/page-header';
import { MessageList } from './message-list/message-list';
import { MessageDetails } from './message-details/message-details';
import { SentInput } from './sent-input/sent-input';


@Component({
  selector: 'app-agent-inbox',
  imports: [MessageList, MessageDetails, PageHeader, SentInput],
  templateUrl: './agent-inbox.html',
  styleUrl: './agent-inbox.css'
})
export class AgentInbox {

  selectedMessage: any = null;

  onMessageSelected(message: any) {
    this.selectedMessage = message;
  }

}
