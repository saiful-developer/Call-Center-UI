import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css'
})
export class Paginator implements OnChanges {

  @Input() projectList: any[] = [];
  @Output() pageChanged = new EventEmitter<{pagedList: any[], currentPage: number, pageSize: number}>();


  pageSize = 10;
  totalPages = 0;
  currentPage = 1;
  pagedList: any[] = [];

  updatePagedList() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedList = this.projectList.slice(startIndex, startIndex + this.pageSize);
    this.pageChanged.emit({
      pagedList: this.pagedList,
      currentPage: this.currentPage,
      pageSize: this.pageSize
    });
    // console.log(this.pagedList)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['projectList'] && this.projectList) {
      this.totalPages = Math.ceil(this.projectList.length / this.pageSize);
      this.currentPage = 1;
      this.updatePagedList();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedList();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedList();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedList();
    }
  }





}
