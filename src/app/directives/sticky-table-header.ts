import { Directive, ElementRef, Renderer2, AfterViewInit, HostListener, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appStickyTableHeader]',
  standalone: true
})
export class StickyTableHeaderDirective implements AfterViewInit, OnDestroy {
  @Input() scrollContainerSelector: string | null = null;  
  @Input() offsetElements: string[] = [];

  private clonedHeader: HTMLElement | null = null;
  private offsetTop: number = 0;
  private originalHeader: HTMLTableSectionElement | null = null;
  private scrollContainer: HTMLElement | Window = window;
  private scrollListener: (() => void) | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const table = this.el.nativeElement as HTMLTableElement;
    this.originalHeader = table.querySelector('thead') as HTMLTableSectionElement | null;

    if (!this.originalHeader) {
      console.warn('StickyTableHeaderDirective: No thead found in table');
      return;
    }

    // Use input selector if provided, otherwise auto-detect scrollable parent
    if (this.scrollContainerSelector) {
      const container = document.querySelector(this.scrollContainerSelector) as HTMLElement | null;
      this.scrollContainer = container || window;
    } else {
      this.scrollContainer = this.findScrollableParent(table) || window;
    }

    this.calculateOffset();

    // Clone header
    this.clonedHeader = this.originalHeader.cloneNode(true) as HTMLElement;
    this.renderer.addClass(this.clonedHeader, 'cloned-header');
    this.renderer.setStyle(this.clonedHeader, 'position', 'fixed');
    this.renderer.setStyle(this.clonedHeader, 'top', `${this.offsetTop}px`);
    this.renderer.setStyle(this.clonedHeader, 'zIndex', '10000');
    this.renderer.setStyle(this.clonedHeader, 'backgroundColor', '#b46bff');
    this.renderer.setStyle(this.clonedHeader, 'color', 'white');
    this.renderer.setStyle(this.clonedHeader, 'display', 'none');
    this.renderer.setStyle(this.clonedHeader, 'table-layout', 'fixed');
    this.renderer.setStyle(this.clonedHeader, 'borderCollapse', 'collapse');
    this.renderer.setStyle(this.clonedHeader, 'margin', '0');

    const originalTheadStyles = getComputedStyle(this.originalHeader);
    ['padding', 'border', 'fontSize', 'fontWeight', 'lineHeight'].forEach(prop => {
      this.renderer.setStyle(this.clonedHeader!, prop, originalTheadStyles.getPropertyValue(prop));
    });

    this.renderer.appendChild(document.body, this.clonedHeader);
    this.syncColumnWidths();
    this.onScroll();

    // Attach scroll listener dynamically
    if (this.scrollContainer instanceof Window) {
      this.scrollListener = this.renderer.listen(window, 'scroll', () => this.onScroll());
    } else {
      this.scrollListener = this.renderer.listen(this.scrollContainer, 'scroll', () => this.onScroll());
    }
  }

  ngOnDestroy(): void {
    if (this.scrollListener) this.scrollListener();
  }

  private findScrollableParent(element: HTMLElement): HTMLElement | null {
    let parent = element.parentElement;
    while (parent) {
      const style = getComputedStyle(parent);
      if (style.overflowY === 'auto' || style.overflowY === 'scroll') return parent;
      parent = parent.parentElement;
    }
    return null;
  }

  private calculateOffset() {
    this.offsetTop = 0;
    this.offsetElements.forEach(selector => {
      const el = document.querySelector(selector) as HTMLElement | null;
      if (el && (getComputedStyle(el).position === 'fixed' || getComputedStyle(el).position === 'sticky')) {
        this.offsetTop += el.getBoundingClientRect().height;
      }
    });
  }

  private syncColumnWidths() {
    if (!this.clonedHeader || !this.originalHeader) return;

    const origThs = Array.from(this.originalHeader.querySelectorAll('th'));
    const cloneThs = Array.from(this.clonedHeader.querySelectorAll('th'));

    origThs.forEach((th, i) => {
      const width = (th as HTMLElement).getBoundingClientRect().width + 'px';
      this.renderer.setStyle(cloneThs[i], 'width', width);
      this.renderer.setStyle(cloneThs[i], 'minWidth', width);
    });
  }

  onScroll() {
    if (!this.clonedHeader || !this.originalHeader) return;

    const tableRect = this.el.nativeElement.getBoundingClientRect();
    const headerHeight = this.offsetTop;

    let scrollTop = 0;
    if (this.scrollContainer instanceof Window) {
      scrollTop = window.scrollY;
    } else {
      scrollTop = (this.scrollContainer as HTMLElement).scrollTop + (this.scrollContainer as HTMLElement).getBoundingClientRect().top;
    }

    const originalHeaderRect = this.originalHeader.getBoundingClientRect();
    if (originalHeaderRect.top <= headerHeight && tableRect.bottom > headerHeight) {
      this.renderer.setStyle(this.clonedHeader, 'display', 'table');
      this.renderer.setStyle(this.clonedHeader, 'top', `${headerHeight}px`);
      this.renderer.setStyle(this.clonedHeader, 'left', `${tableRect.left}px`);
      this.renderer.setStyle(this.clonedHeader, 'width', `${tableRect.width}px`);
      this.syncColumnWidths();
    } else {
      this.renderer.setStyle(this.clonedHeader, 'display', 'none');
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (!this.clonedHeader || !this.originalHeader) return;
    const tableRect = this.el.nativeElement.getBoundingClientRect();
    this.renderer.setStyle(this.clonedHeader, 'top', `${this.offsetTop}px`);
    this.renderer.setStyle(this.clonedHeader, 'width', `${tableRect.width}px`);
    this.syncColumnWidths();
  }
}