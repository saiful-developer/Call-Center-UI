import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-thin-sidebar',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './thin-sidebar.html',
  styleUrl: './thin-sidebar.css'
})
export class ThinSidebar {

    shorBartlist = [
    {
      icon: 'bi bi-grid-1x2',
      link: 'dashboard',
      hoverItems: ['Dashboard'],
      hoverItemsRouterLinks: ['dashboard']
    },
    {
      icon: 'bi bi-file-earmark-text',
      link: 'Reports',
      hoverItems: ['Incoming', 'Outgoing', 'Break', 'Login', 'Abandon', 'Ring No Answer'],
      hoverItemsRouterLinks: ['reports/incoming', 'reports/outgoing','reports/break',  'reports/login', 'reports/abandon', 'reports/rna']
    },
    {
      icon: 'bi bi-broadcast me-1',
      link: 'live/abandon',
      hoverItems: ['Abandon Calls', 'Agent Status', 'Campain Status', 'Extension Status', 'Trunk Status', 'Waiting Calls'],
      hoverItemsRouterLinks: ['live/abandon-call', 'live/agent-status', 'live/campain-status', 'live/extension-status', 'live/trunk-status', 'live/waiting-calls']
    },
    {
      icon: 'bi-person-lines-fill',
      link: 'address-book',
      hoverItems: ['Address Book'],
      hoverItemsRouterLinks: ['address-book']
    },
    {
      icon: 'bi bi-info-circle',
      link: 'aboutus',
      hoverItems: ['About Us', 'Timeline', 'Contact Us'],
      hoverItemsRouterLinks: ['aboutus', 'timeline', 'contact']
    },
    {
      icon: 'bi bi-question-circle',
      link: 'faq',
      hoverItems: ['FAQ'],
      hoverItemsRouterLinks: ['faq']
    },
    {
      icon: 'bi-gear',
      link: 'settings',
      hoverItems: ['Settings'],
      hoverItemsRouterLinks: ['settings']
    },
  ]

}
