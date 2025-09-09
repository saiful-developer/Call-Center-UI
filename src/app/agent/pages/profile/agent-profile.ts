import { Component } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';

@Component({
  selector: 'app-agent-profile',
  imports: [PageHeader],
  templateUrl: './agent-profile.html',
  styleUrl: './agent-profile.css'
})
export class AgentProfile {

  pageTitle: string = 'Profile'

}
