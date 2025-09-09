import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-agent-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './agent-breadcrumbs.html',
  styleUrl: './agent-breadcrumbs.css'
})
export class AgentBreadcrumbs {
  breadcrumbs: Array<{ label: string, url: string }> = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.buildBreadcrumbs());
  }

  private buildBreadcrumbs() {
    const crumbs: Array<{ label: string, url: string }> = [];
    let currentRoute = this.route.root;
    let url = '';

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
      const routeSnapshot = currentRoute.snapshot;

      if (routeSnapshot.data['breadcrumb']) {
        // split message/inbox into separate
        const parts = routeSnapshot.data['breadcrumb'].split('/');
        parts.forEach((part: string) => {
          url += `/${part.toLowerCase().replace(/\s+/g, '-')}`;
          crumbs.push({ label: part, url: url });
        });
      }
    }
    this.breadcrumbs = crumbs;
  }
}
