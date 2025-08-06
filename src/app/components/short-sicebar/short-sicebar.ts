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
      hoverItems: ['Dashboard']
    },
    {
      icon: 'mdi mdi-account',
      link: '/agent/profile',
      hoverItems: ['View Profile', 'Edit Profile']
    },
    {
      icon: 'mdi-message-text',
      link: '/agent/message',
      hoverItems: ['Send Message', 'Inbox']
    },
    {
      icon: 'mdi-chart-bar',
      link: '/agent/chart ',
      hoverItems: ['Charts']
    },
    {
      icon: 'mdi-table-large',
      link: '/agent/table ',
      hoverItems: ['Table']
    },
    {
      icon: 'bi-gear',
      link: '/agent/settings ',
      hoverItems: ['Settings']
    },
    {
      icon: 'bi-box-arrow-right',
      link: '/agent/settings ',
      hoverItems: ['Logout']
    }
  ]

}
