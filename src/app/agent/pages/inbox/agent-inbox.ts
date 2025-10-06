import { Component, OnInit } from '@angular/core';

// components
import { PageHeader } from '../../shared/page-header/page-header';

//service for socket
import { IncomingMessage, SocketService } from '../../../services/socket.service';

interface Supervisor {
  id: string,
  name: string
}


@Component({
  selector: 'app-agent-inbox',
  imports: [PageHeader],
  templateUrl: './agent-inbox.html',
  styleUrl: './agent-inbox.css'
})
export class AgentInbox implements OnInit {

  messages: IncomingMessage[] = [];
  supervisors: Supervisor[] = [];
  selectedSupervisorId: string | null = null;


  constructor(
    private socketService: SocketService        
  ) { }


  ngOnInit(): void {

  }

}
