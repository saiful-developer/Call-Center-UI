import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-short-sicebar',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './short-sicebar.html',
  styleUrl: './short-sicebar.css'
})

export class ShortSicebar {


  shorBartlist = [
    {
      icon: 'mdi-home',
      link: 'dashboard',
      hoverItems: ['Dashboard'],
      hoverItemsRouterLinks: ['dashboard']
    },
    {
      icon: 'mdi mdi-account',
      link: 'profile',
      hoverItems: ['View Profile', 'Edit Profile'],
      hoverItemsRouterLinks: ['profile', 'edit-profile']
    },
    {
      icon: 'mdi-message-text',
      link: 'message',
      hoverItems: ['Send Message', 'Inbox'],
      hoverItemsRouterLinks: ['message', 'inbox']
    },
    {
      icon: 'mdi-format-list-bulleted',
      link: 'add-project',
      hoverItems: ['Add Projects', 'Multiple Forms'],
      hoverItemsRouterLinks: ['add-project', 'multiple-forms']
    },
    {
      icon: 'mdi-chart-bar',
      link: 'chartjs',
      hoverItems: ['Charts'],
      hoverItemsRouterLinks: ['chartjs']
    },
    {
      icon: 'mdi-table-large',
      link: 'reports/incoming',
      hoverItems: ['Incoming Report', 'Outgoing Report', 'Break', 'Login', 'Abandon', 'Ring No Answer'],
      hoverItemsRouterLinks: ['reports/incoming', 'reports/outgoing', 'reports/break', 'reports/login', 'reports/abandon', 'reports/rna']
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
      icon: 'mdi-plus',
      link: 'add-project',
      hoverItems: ['Add Project'],
      hoverItemsRouterLinks: ['add-project']
    },
    {
      icon: 'bi-gear',
      link: 'settings',
      hoverItems: ['Settings'],
      hoverItemsRouterLinks: ['settings']
    },
  ]



}
