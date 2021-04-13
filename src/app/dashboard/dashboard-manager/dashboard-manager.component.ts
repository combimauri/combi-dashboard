import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GridsterConfig, GridType } from 'angular-gridster2';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { Dashboard } from '../../core/models/dashboard.model';
import { Widget } from '../../core/models/widget.model';
import { DashboardService } from '../../core/services/dashboard.service';
import { WidgetService } from '../../core/services/widget.service';
import { WidgetContainerComponent } from '../../widget/widget-container/widget-container.component';

@Component({
  selector: 'combi-dashboard-manager',
  templateUrl: './dashboard-manager.component.html',
  styleUrls: ['./dashboard-manager.component.scss'],
})
export class DashboardManagerComponent implements OnInit, OnDestroy {
  @ViewChild('dashboardContainer', { read: ViewContainerRef })
  dashboardContainer: ViewContainerRef;
  selectedDashboardId: string | null;
  widgetList$: Observable<Array<Widget>>;
  dashboardList$: Observable<Array<Dashboard>>;
  loadingWidgets = true;
  loadingDashboards = true;
  isWidgetsModalVisible = false;
  gridOptions: GridsterConfig = {
    displayGrid: 'onDrag&Resize',
    draggable: {
      enabled: true,
      ignoreContent: true,
    },
    gridType: GridType.ScrollVertical,
    itemResizeCallback: (gridsterItem) => {
      if (gridsterItem.widgetComponent?.reflow) {
        gridsterItem.widgetComponent.reflow();
      }
    },
    maxCols: 12,
    minCols: 12,
    maxRows: 100,
    minRows: 3,
    mobileBreakpoint: 768,
    pushItems: true,
    resizable: {
      enabled: true,
    },
  };
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private dashboardService: DashboardService,
    private widgetService: WidgetService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((paramMap) => (this.selectedDashboardId = paramMap.get('id')));

    this.dashboardList$ = this.dashboardService
      .getDashboardList()
      .pipe(finalize(() => (this.loadingDashboards = false)));
    this.widgetList$ = this.widgetService
      .getWidgetList()
      .pipe(finalize(() => (this.loadingWidgets = false)));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addWidget(widget: Widget): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      WidgetContainerComponent
    );
    const component = this.dashboardContainer.createComponent(componentFactory);
    const { instance } = component;

    instance.initializeWidget(widget);
    instance.destroy$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => component.destroy());
    this.dismissAddWidget();
  }

  dismissAddWidget(): void {
    this.loadingWidgets = true;
    this.isWidgetsModalVisible = false;
  }
}
