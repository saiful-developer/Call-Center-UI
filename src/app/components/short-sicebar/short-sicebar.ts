import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-short-sicebar',
  imports: [RouterLink, RouterModule],
  templateUrl: './short-sicebar.html',
  styleUrl: './short-sicebar.css'
})

export class ShortSicebar {

  shorBartlist = [
    {
      icon: 'mdi-home',
      link: '/agent/dashboard',
      hoverItems: ['Dashboard'],
      hoverItemsRouterLinks: ['/agent/dashboard']
    },
    {
      icon: 'mdi mdi-account',
      link: '/agent/profile',
      hoverItems: ['View Profile', 'Edit Profile'],
      hoverItemsRouterLinks: ['/agent/profile', '/agent/edit-profile']
    },
    {
      icon: 'mdi-message-text',
      link: '/agent/message',
      hoverItems: ['Send Message', 'Inbox'],
      hoverItemsRouterLinks: ['/agent/message', '/agent/inbox']
    },
    // /mdi mdi-format-list-bulleted menu-icon
    {
      icon: 'mdi-format-list-bulleted',
      link: '/agent/add-project',
      hoverItems: ['Add Projects', 'Multiple Forms'],
      hoverItemsRouterLinks: ['/agent/add-project', '/agent/multiple-forms']
    },
    {
      icon: 'mdi-chart-bar',
      link: '/agent/chartjs',
      hoverItems: ['Charts'],
      hoverItemsRouterLinks: ['/agent/chartjs']
    },
    {
      icon: 'mdi-table-large',
      link: 'agent/reporsts/incoming',
      hoverItems: ['Incoming Report', 'Outgoing Report', 'Break', 'Login', 'Abandon', 'Ring No Answer'],
      hoverItemsRouterLinks: ['agent/reports/incoming', 'agent/reports/outgoing']//need to add path respectivly
    },
    {
      icon: 'bi-person-lines-fill',
      link: 'agent/aboutus',
      hoverItems: ['About Us', 'Timeline'],
      hoverItemsRouterLinks: ['agent/aboutus', 'agent/timeline']
    },
    {
      icon: 'mdi-alert-circle-outline',
      link: 'agent/faq',
      hoverItems: ['FAQ'],
      hoverItemsRouterLinks: ['agent/faq']
    },
    {
      icon: 'mdi-plus',
      link: 'agent/add-project',
      hoverItems: ['Add Project'],
      hoverItemsRouterLinks: ['agent/add-project']
    },
    {
      icon: 'bi-gear',
      link: '/agent/settings',
      hoverItems: ['Settings'],
      hoverItemsRouterLinks: ['/agent/settings']
    },
    {
      icon: 'bi-box-arrow-right',
      link: '/agent/logout ',
      hoverItems: ['Logout'],
      hoverItemsRouterLinks: ['/logout']  
    }
  ]

}
// /mdi-alert-circle-outline