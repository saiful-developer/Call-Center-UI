import { Directive, ElementRef, Renderer2, AfterViewInit, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appStickyTableHeader]',
  standalone: true
})
export class StickyTableHeaderDirective implements AfterViewInit {
  @Input() offsetElements: string[] = [];
  private clonedHeader: HTMLElement | null = null;
  private offsetTop: number = 0;
  private originalHeader: HTMLTableSectionElement | null = null;
  private scrollContainer: HTMLElement | Window = window;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const table = this.el.nativeElement as HTMLTableElement;
    this.originalHeader = table.querySelector('thead') as HTMLTableSectionElement | null;
    if (!this.originalHeader) {
      console.warn('StickyTableHeaderDirective: No thead found in table');
      return;
    }

    // Find the scrollable parent or use window
    this.scrollContainer = this.findScrollableParent(table) || window;
    this.calculateOffset();

    // Clone the header
    this.clonedHeader = this.originalHeader.cloneNode(true) as HTMLElement;
    this.renderer.addClass(this.clonedHeader, 'cloned-header');
    this.renderer.setStyle(this.clonedHeader, 'position', 'fixed');
    this.renderer.setStyle(this.clonedHeader, 'top', `${this.offsetTop}px`);
    this.renderer.setStyle(this.clonedHeader, 'width', `${table.getBoundingClientRect().width}px`);
    this.renderer.setStyle(this.clonedHeader, 'zIndex', '10000'); // Increased z-index
    this.renderer.setStyle(this.clonedHeader, 'backgroundColor', '#b46bff');
    this.renderer.setStyle(this.clonedHeader, 'color', 'white');
    this.renderer.setStyle(this.clonedHeader, 'display', 'none');
    this.renderer.setStyle(this.clonedHeader, 'table-layout', 'fixed');
    this.renderer.setStyle(this.clonedHeader, 'borderCollapse', 'collapse');
    this.renderer.setStyle(this.clonedHeader, 'margin', '0');

    // Copy thead styles
    const originalTheadStyles = getComputedStyle(this.originalHeader);
    ['padding', 'border', 'fontSize', 'fontWeight', 'lineHeight'].forEach(prop => {
      this.renderer.setStyle(this.clonedHeader, prop, originalTheadStyles.getPropertyValue(prop));
    });

    this.renderer.appendChild(document.body, this.clonedHeader);
    this.syncColumnWidths();
    this.onScroll();

    // Listen for scroll on the scroll container
    if (this.scrollContainer !== window) {
      this.renderer.listen(this.scrollContainer, 'scroll', () => this.onScroll());
    }
  }

  private findScrollableParent(element: HTMLElement): HTMLElement | null {
    let parent = element.parentElement;
    while (parent) {
      const style = getComputedStyle(parent);
      if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
        return parent;
      }
      parent = parent.parentElement;
    }
    return null;
  }

  private calculateOffset() {
    this.offsetTop = 0;
    this.offsetElements.forEach(selector => {
      const element = document.querySelector(selector) as HTMLElement | null;
      if (element && (getComputedStyle(element).position === 'fixed' || getComputedStyle(element).position === 'sticky')) {
        const height = element.getBoundingClientRect().height;
        this.offsetTop += height;
        console.log(`Adding height of ${selector}: ${height}px`);
      } else {
        console.warn(`StickyTableHeaderDirective: Element ${selector} not found or not fixed/sticky`);
      }
    });
    console.log('Final offsetTop:', this.offsetTop);
  }

  private syncColumnWidths() {
    if (!this.clonedHeader || !this.originalHeader) return;
    const originalThs = Array.from(this.originalHeader.querySelectorAll('th'));
    const clonedThs = Array.from(this.clonedHeader.querySelectorAll('th'));

    if (originalThs.length !== clonedThs.length) {
      console.warn('StickyTableHeaderDirective: Mismatch in number of th elements');
      return;
    }

    originalThs.forEach((th: HTMLElement, index: number) => {
      const thStyles = getComputedStyle(th);
      const width = th.getBoundingClientRect().width;
      this.renderer.setStyle(clonedThs[index], 'width', `${width}px`);
      this.renderer.setStyle(clonedThs[index], 'minWidth', `${width}px`);
      this.renderer.setStyle(clonedThs[index], 'boxSizing', 'border-box');
      ['padding', 'fontSize', 'fontWeight', 'lineHeight', 'textAlign', 'border', 'backgroundColor', 'color'].forEach(prop => {
        this.renderer.setStyle(clonedThs[index], prop, thStyles.getPropertyValue(prop));
      });
    });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (!this.clonedHeader || !this.originalHeader) return;
    this.calculateOffset();
    const table = this.el.nativeElement as HTMLTableElement;
    const tableRect = table.getBoundingClientRect();
    const originalHeaderRect = this.originalHeader.getBoundingClientRect();

    if (originalHeaderRect.top <= this.offsetTop && tableRect.bottom > this.offsetTop) {
      this.renderer.setStyle(this.clonedHeader, 'display', 'table');
      this.renderer.setStyle(this.clonedHeader, 'top', `${this.offsetTop}px`);
      this.renderer.setStyle(this.clonedHeader, 'left', `${tableRect.left}px`);
      this.renderer.setStyle(this.clonedHeader, 'width', `${tableRect.width}px`);
      this.syncColumnWidths();
    } else {
      this.renderer.setStyle(this.clonedHeader, 'display', 'none');
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    if (!this.clonedHeader || !this.originalHeader) return;
    const table = this.el.nativeElement as HTMLTableElement;
    this.calculateOffset();
    this.renderer.setStyle(this.clonedHeader, 'top', `${this.offsetTop}px`);
    this.renderer.setStyle(this.clonedHeader, 'width', `${table.getBoundingClientRect().width}px`);
    this.syncColumnWidths();
  }
}