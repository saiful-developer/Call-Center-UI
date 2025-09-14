import { Component, Input } from '@angular/core';
import { Breadcrumbs } from '../../../shared/breadcrumbs/breadcrumbs';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-page-header',
  imports: [Breadcrumbs, NgClass],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css'
})
export class PageHeader {

  @Input() title: string = '';
  @Input() iconClass: string = '';

}
