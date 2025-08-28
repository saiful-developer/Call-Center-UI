import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-paginator',
  imports: [CommonModule],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css'
})
export class Paginator {

  @Input() offset = 0;           // current offset (from parent)
  @Input() limit = 10;           // page size
  @Input() hasMore = true;       // parent tells if more data exists
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
}
