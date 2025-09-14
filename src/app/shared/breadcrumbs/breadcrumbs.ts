import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink, CommonModule],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.css'
})
export class Breadcrumbs implements OnInit {
  breadcrumbs: Array<{ label: string, url: string }> = [];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.buildBreadcrumbs(this.route.root);
      });

    // Build breadcrumbs on initial load
    this.buildBreadcrumbs(this.route.root);
  }

  private buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: any[] = []) {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      this.breadcrumbs = breadcrumbs;
      return;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL) {
        url += ` / ${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      this.buildBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
