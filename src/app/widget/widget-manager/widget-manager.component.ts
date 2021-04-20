import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';

import { WidgetEditorComponent } from './widget-editor/widget-editor.component';
import { Widget } from '../../core/models/widget.model';
import { WidgetType } from '../../core/models/widget-type.enum';
import { WidgetService } from '../../core/services/widget.service';

@Component({
  selector: 'combi-widget-manager',
  templateUrl: './widget-manager.component.html',
  styleUrls: ['./widget-manager.component.scss'],
})
export class WidgetManagerComponent implements OnInit, OnDestroy {
  @ViewChild('widgetEditor') widgetEditor: WidgetEditorComponent;
  widgetList$: Observable<Array<Widget>>;
  selectedWidget: Widget;
  widgetDataList: Array<{ label: string; type: WidgetType }>;
  loadingWidgets = true;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private widgetService: WidgetService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((paramMap) => {
        const selectedWidgetId = paramMap.get('id');

        if (selectedWidgetId) {
          this.widgetDataList = this.widgetService.getWidgetDataList();
          this.widgetList$ = this.widgetService.getWidgetList().pipe(
            tap((widgets) => {
              if (widgets.length) {
                const selectedWidget = widgets.find(
                  (widget) => widget.id === selectedWidgetId
                );

                if (selectedWidget) {
                  this.selectedWidget = selectedWidget;

                  this.widgetEditor.initializeWidget(this.selectedWidget);
                }
              }
            }),
            finalize(() => (this.loadingWidgets = false))
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectWidget(widget: Widget): void {
    this.selectedWidget = widget;

    this.widgetEditor.initializeWidget(this.selectedWidget);
  }

  selectWidgetType(type: WidgetType): void {
    this.selectedWidget.type = type;
    this.selectedWidget.componentType = this.widgetService.getWidgetComponentType(
      type
    );

    this.widgetEditor.initializeWidget(this.selectedWidget);
  }
}
