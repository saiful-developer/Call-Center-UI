import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  imports: [CommonModule],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css'
})
export class Paginator {
  @Input() offset = 0;        // Current offset
  @Input() limit = 50;        // Items per page
  @Input() totalCount = 0;    // Total items
  @Output() pageChange = new EventEmitter<number>();



  get totalPages(): number {
    return Math.ceil(this.totalCount / this.limit);
  }

  get currentPage(): number {
    return Math.floor(this.offset / this.limit) + 1;
    /**
     * offset = 0
     * limit = 50
     * current 0/50 + 1 = 1
     * 
     * offset = 50
     * current = 50/50 + 1  = 2
     * 
     * 
     * offset = 150
     * current = 150 / 50 + 1 = 4
     * 
     */
  }

  get pages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const total = this.totalPages;
    const current = this.currentPage;

    if (total <= 7) {
      // Show all pages if small total
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Case: very close to start (page 1, 2, 3)
      if (current <= 3) {
        for (let i = 2; i <= 4; i++) {
          if (i < total) pages.push(i);
        }
        pages.push('...');
      }

      // Case: in the middle
      else if (current > 3 && current < total - 2) {
        pages.push('...');
        pages.push(current - 1, current, current + 1);
        pages.push('...');
      }

      // Case: close to the end (last 3 pages)
      else if (current >= total - 2) {
        pages.push('...');
        for (let i = total - 3; i < total; i++) {
          if (i > 1) pages.push(i);
        }
      }

      // Always show last page
      pages.push(total);
    }

    return pages;
  }


  goToPage(page: number | string) {
    this.check()
    if (typeof page === 'number') {
      this.pageChange.emit((page - 1) * this.limit);
    }
  }

  prevPage() {
    this.check()
    if (this.currentPage > 1) this.pageChange.emit((this.currentPage - 2) * this.limit);
  }

  nextPage() {
    this.check()
    if (this.currentPage < this.totalPages) this.pageChange.emit(this.currentPage * this.limit);
  }

  check() {
    console.log('paginator offset', this.offset);
    console.log('paginator limit', this.limit);
    console.log('paginator totalCount', this.totalCount);
  }
}
