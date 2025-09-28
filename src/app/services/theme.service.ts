import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { LoderService } from './loder.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private styleRefs: HTMLLinkElement[] = [];

  constructor(rendererFactory: RendererFactory2, private loader: LoderService) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /** Load theme based on role */
  loadTheme(role: 'agent' | 'supervisor'): void {
    // First clear any existing in array styleRefs
    this.clearTheme();

    // CSS files for both roles
    const themes: Record<string, string[]> = {
      agent: [
        'assets/agent/vendors/ti-icons/css/themify-icons.css',
        'assets/agent/vendors/css/vendor.bundle.base.css',
        'assets/agent/vendors/bootstrap-datepicker/bootstrap-datepicker.min.css',
        'assets/agent/css/style.css'
      ],
      supervisor: [
        // removed unused css file, classes and imports
        'assets/supervisor/css/style.css'
      ]
    };

    const cssFiles = themes[role];
    this.loader.show();
    let loadedCount = 0;
    const totalFiles = cssFiles.length;

    cssFiles.forEach(href => {
      this.addStyle(href, () => {
        loadedCount++;
        // hide loader only when all CSS files are fully loaded
        if (loadedCount === totalFiles) {
          this.loader.hide();
        }
      });
    });

  }

  /** Remove all injected styles and scripts */
  clearTheme(): void {
    this.styleRefs.forEach(link => this.renderer.removeChild(document.head, link));
    this.styleRefs = [];
  }

  /** Add CSS with optional onLoad callback (supports preload) */
  private addStyle(href: string, onLoad?: () => void, preload: boolean = false): void {
    if (preload) {
      const preloadEl = this.renderer.createElement('link');
      this.renderer.setAttribute(preloadEl, 'rel', 'preload');
      this.renderer.setAttribute(preloadEl, 'as', 'style');
      this.renderer.setAttribute(preloadEl, 'href', href);
      this.renderer.appendChild(document.head, preloadEl);
    }

    const linkEl = this.renderer.createElement('link');
    this.renderer.setAttribute(linkEl, 'rel', 'stylesheet');
    this.renderer.setAttribute(linkEl, 'href', href);
    if (onLoad) linkEl.onload = onLoad; // handle loader hide
    this.renderer.appendChild(document.head, linkEl);
    this.styleRefs.push(linkEl);
    console.log(this.styleRefs);
  }
}
