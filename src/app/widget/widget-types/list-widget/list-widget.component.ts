import { Component } from '@angular/core';

import { WidgetComponent } from '../../../core/models/widget-component.model';

@Component({
  selector: 'combi-list-widget',
  templateUrl: './list-widget.component.html',
  styleUrls: ['./list-widget.component.scss'],
})
export class ListWidgetComponent implements WidgetComponent {
  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  reflow(): void {}
}
