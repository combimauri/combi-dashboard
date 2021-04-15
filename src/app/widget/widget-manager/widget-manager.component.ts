import { Component, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { WidgetEditorComponent } from './widget-editor/widget-editor.component';
import { Widget } from '../../core/models/widget.model';
import { WidgetData } from '../../core/models/widget-data.model';
import { WidgetComponent } from '../../core/models/widget-component.model';
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
  widgetDataList: Array<WidgetData>;
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
          this.widgetService
            .getWidget(selectedWidgetId)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((widget) => {
              if (widget) {
                this.selectedWidget = widget;

                if (widget.type) {
                  this.widgetEditor.initializeWidget(widget);
                }
              }
            });
        }
      });

    this.widgetDataList = this.widgetService.getWidgetDataList();
    this.widgetList$ = this.widgetService
      .getWidgetList()
      .pipe(finalize(() => (this.loadingWidgets = false)));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectWidget(widget: Widget): void {
    this.selectedWidget = widget;

    this.widgetEditor.initializeWidget(this.selectedWidget);
  }

  selectWidgetType(widgetComponentType: Type<WidgetComponent>): void {
    this.selectedWidget.type = widgetComponentType;

    this.widgetEditor.initializeWidget(this.selectedWidget);
  }
}
