import { Component, Input } from '@angular/core';
import { AgentBreadcrumbs } from '../../../shared/breadcrumbs/agent-breadcrumbs';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-page-header',
  imports: [AgentBreadcrumbs, NgClass],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css'
})
export class PageHeader {

  @Input() title: string = '';
  @Input() iconClass: string = '';

}
