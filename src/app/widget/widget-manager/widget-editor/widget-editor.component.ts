import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { Widget } from '../../../core/models/widget.model';

@Component({
  selector: 'combi-widget-editor',
  templateUrl: './widget-editor.component.html',
  styleUrls: ['./widget-editor.component.scss'],
})
export class WidgetEditorComponent {
  @ViewChild('widgetContainer', { read: ViewContainerRef })
  widgetContainer: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  initializeWidget({ componentType }: Widget): void {
    if (componentType) {
      this.widgetContainer.clear();

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        componentType
      );

      this.widgetContainer.createComponent(componentFactory);
    }
  }
}
