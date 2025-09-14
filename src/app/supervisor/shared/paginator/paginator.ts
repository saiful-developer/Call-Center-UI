import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [],
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
