  // theme.service.ts
  import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })
  export class ThemeService {
    private renderer: Renderer2;
    private styleRefs: HTMLLinkElement[] = [];
    private scriptRefs: HTMLScriptElement[] = [];

    constructor(rendererFactory: RendererFactory2) {
      this.renderer = rendererFactory.createRenderer(null, null);
    }

    /** Load theme based on role */
    loadTheme(role: 'agent' | 'supervisor'): void {
      // First clear any existing role theme
      this.clearTheme();

      // CSS files for both roles
      const themes: Record<string, string[]> = {
        agent: [
          'assets/agent/vendors/ti-icons/css/themify-icons.css',
          'assets/agent/vendors/css/vendor.bundle.base.css',
          'assets/agent/vendors/font-awesome/css/font-awesome.min.css',
          'assets/agent/vendors/bootstrap-datepicker/bootstrap-datepicker.min.css',
          'assets/agent/css/style.css'
        ],
        supervisor: [
          'assets/supervisor/css/vendors_css.css',
          'assets/supervisor/css/style.css',
          'assets/supervisor/skin_color.css'
        ]
      };

      // Inject CSS
      themes[role].forEach(href => this.addStyle(href));

      // Only inject JS if Supervisor
      // if (role === 'supervisor') {
      //   const jsFiles = [
      //     'assets/supervisor/js/vendors.min.js',
      //     'assets/supervisor/js/chat-popup.js',
      //     'assets/supervisor/js/feather.min.js',
      //     'assets/supervisor/js/apexcharts.js',
      //     'assets/supervisor/js/progressbar.js',
      //     'https://cdn.amcharts.com/lib/4/core.js',
      //     'https://cdn.amcharts.com/lib/4/charts.js',
      //     'https://cdn.amcharts.com/lib/4/themes/animated.js',
      //     'https://cdn.amcharts.com/lib/4/maps.js',
      //     'https://cdn.amcharts.com/lib/4/geodata/worldLow.js',
      //     'assets/supervisor/js/template.js',
      //     'assets/supervisor/js/dashboard.js'
      //   ];

      //   jsFiles.forEach(src => this.addScript(src));
      // }
    }

    /** Remove all injected styles and scripts */
    clearTheme(): void {
      this.styleRefs.forEach(link => this.renderer.removeChild(document.head, link));
      this.styleRefs = [];

      this.scriptRefs.forEach(script => this.renderer.removeChild(document.body, script));
      this.scriptRefs = [];
    }

    private addStyle(href: string): void {
      const linkEl = this.renderer.createElement('link');
      this.renderer.setAttribute(linkEl, 'rel', 'stylesheet');
      this.renderer.setAttribute(linkEl, 'href', href);
      this.renderer.appendChild(document.head, linkEl);
      this.styleRefs.push(linkEl);
      console.log(this.styleRefs);
      
    }

    private addScript(src: string): void {
      const scriptEl = this.renderer.createElement('script');
      this.renderer.setAttribute(scriptEl, 'src', src);
      this.renderer.setAttribute(scriptEl, 'type', 'text/javascript');
      this.renderer.appendChild(document.body, scriptEl);
      this.scriptRefs.push(scriptEl);
    }
  }
