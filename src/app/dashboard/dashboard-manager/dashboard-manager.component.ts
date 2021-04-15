import { DOCUMENT } from '@angular/common';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'gridstack/dist/h5/gridstack-dd-native';
import {
  GridItemHTMLElement,
  GridStack,
  GridStackElement,
  GridStackNode,
} from 'gridstack';
import { Observable, Subject, timer } from 'rxjs';
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
  grid: GridStack;
  selectedDashboard: Dashboard;
  dateRange: string;
  widgetList$: Observable<Array<Widget>>;
  dashboardList$: Observable<Array<Dashboard>>;
  widgetContainers: Array<WidgetContainerComponent> = [];
  loadingWidgets = true;
  loadingDashboards = true;
  isWidgetsModalVisible = false;
  isDashboardEmpty = true;
  private unsubscribe$ = new Subject<void>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private dashboardService: DashboardService,
    private widgetService: WidgetService
  ) {}

  ngOnInit(): void {
    this.initializeGrid();
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((paramMap) => {
        const selectedDashboardId = paramMap.get('id');

        if (selectedDashboardId) {
          this.dashboardService
            .getDashboard(selectedDashboardId)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((dashboard) => {
              if (dashboard) {
                this.selectedDashboard = dashboard;
              }
            });
        }
      });

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
    const widgetContainerRef = this.createWidgetContainerRef();
    const { instance } = widgetContainerRef;

    this.widgetContainers.push(instance);
    this.initializeWidget(widget, widgetContainerRef);
    this.makeGridWidget(instance);
    this.dismissAddWidget();
  }

  dismissAddWidget(): void {
    this.loadingWidgets = true;
    this.isWidgetsModalVisible = false;
  }

  private initializeGrid(): void {
    this.grid = GridStack.init({
      cellHeight: '100px',
      handle: '.drag-handler',
      margin: 8,
    });

    this.listenToGridEvents();
  }

  private listenToGridEvents(): void {
    this.grid.on('added', (event, items) => {
      items = items as Array<GridStackNode>;

      items.forEach((item) => this.reflowWidget(item.el?.id));
    });
    this.grid.on('resizestop', (event, element) =>
      this.reflowWidget((element as GridItemHTMLElement)?.id)
    );
  }

  private reflowWidget(widgetId: string | undefined): void {
    if (widgetId) {
      const widgetContainer = this.widgetContainers.find(
        (container) => container.componentId === widgetId
      );

      widgetContainer?.reflowWidget();
    }
  }

  private createWidgetContainerRef(): ComponentRef<WidgetContainerComponent> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      WidgetContainerComponent
    );

    return this.dashboardContainer.createComponent(componentFactory);
  }

  private initializeWidget(
    widget: Widget,
    containerRef: ComponentRef<WidgetContainerComponent>
  ): void {
    const { instance } = containerRef;
    this.isDashboardEmpty = false;

    instance.initializeWidget(widget);
    instance.destroy$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.deleteWidget(containerRef));
  }

  private deleteWidget(
    containerRef: ComponentRef<WidgetContainerComponent>
  ): void {
    const { componentId } = containerRef.instance;
    const widgetElement = this.document.getElementById(
      componentId
    ) as GridStackElement;
    const widgetIndex = this.widgetContainers.findIndex(
      (widgetContainer) => widgetContainer.componentId === componentId
    );

    this.grid.removeWidget(widgetElement);
    containerRef.destroy();
    this.widgetContainers.splice(widgetIndex, 1);

    this.isDashboardEmpty = this.dashboardContainer.length === 0;
  }

  private makeGridWidget(widgetComponent: WidgetContainerComponent): void {
    timer(100).subscribe(() =>
      this.grid.makeWidget(`#${widgetComponent.componentId}`)
    );
  }
}
