import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { GridsterItem } from 'angular-gridster2';
import { Subject } from 'rxjs';

import { Widget } from '../../core/models/widget.model';
import { WidgetComponent } from '../../core/models/widget-component.model';

@Component({
  selector: 'combi-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.scss'],
})
export class WidgetContainerComponent {
  @ViewChild('widgetContainer', { read: ViewContainerRef, static: true })
  widgetContainer: ViewContainerRef;
  widgetName: string;
  widgetComponent: ComponentRef<WidgetComponent>;
  gridItem: GridsterItem = {
    x: 0,
    y: 0,
    cols: 6,
    rows: 3
  };
  destroy$ = new Subject<void>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  initializeWidget({ name, type }: Widget): void {
    this.widgetName = name;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      type
    );
    this.gridItem.widgetComponent = this.widgetContainer.createComponent(
      componentFactory
    ).instance;
  }

  deleteWidget(): void {
    this.destroy$.next();
  }
}
