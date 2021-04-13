import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import * as Highcharts from 'highcharts';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'combi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  currentPath: string;
  private unsubscribe$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event as NavigationEnd),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(({ url }: NavigationEnd) => this.buildCurrentPath(url));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private buildCurrentPath(url: string): void {
    this.currentPath = url.substring(1);
    const slashIndex = this.currentPath.indexOf('/');

    if (slashIndex >= 0) {
      this.currentPath = this.currentPath.substring(0, slashIndex);
    }
  }
}
