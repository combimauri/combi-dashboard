import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  HostBinding,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Widget } from '../../core/models/widget.model';
import { WidgetComponent } from '../../core/models/widget-component.model';

@Component({
  selector: 'combi-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.scss'],
})
export class WidgetContainerComponent {
  @HostBinding('id') componentId = uuidv4();
  @HostBinding('attr.gs-w') gsW = '6';
  @HostBinding('attr.gs-h') gsH = '4';
  @HostBinding('class.grid-stack-item') itemClass = true;
  @ViewChild('widgetContainer', { read: ViewContainerRef, static: true })
  widgetContainer: ViewContainerRef;
  widgetName: string;
  widgetComponentRef: ComponentRef<WidgetComponent>;
  destroy$ = new Subject<void>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  initializeWidget({ name, componentType }: Widget): void {
    if (componentType) {
      this.widgetName = name;
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        componentType
      );
      this.widgetComponentRef = this.widgetContainer.createComponent(
        componentFactory
      );
    }
  }

  reflowWidget(): void {
    this.widgetComponentRef.instance.reflow();
  }

  deleteWidget(): void {
    this.widgetContainer.clear();
    this.destroy$.next();
  }
}
