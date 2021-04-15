import { Component } from '@angular/core';

import { WidgetComponent } from '../../../core/models/widget-component.model';

@Component({
  selector: 'combi-timeline-widget',
  templateUrl: './timeline-widget.component.html',
  styleUrls: ['./timeline-widget.component.scss'],
})
export class TimelineWidgetComponent implements WidgetComponent {
  reflow(): void {}
}
