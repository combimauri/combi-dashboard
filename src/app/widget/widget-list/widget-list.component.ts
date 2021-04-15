import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subject, timer } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { ChartWidgetComponent } from '../widget-types/chart-widget/chart-widget.component';
import { Widget } from '../../core/models/widget.model';
import { WidgetService } from '../../core/services/widget.service';

@Component({
  selector: 'combi-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.scss'],
})
export class WidgetListComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  widgetForm: FormGroup;
  widgetList$: Observable<Array<Widget>>;
  loadingWidgets = true;
  isAddModalVisible = false;
  creatingWidget = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NzModalService,
    private widgetService: WidgetService
  ) {}

  ngOnInit(): void {
    this.widgetForm = this.formBuilder.group({
      id: '',
      name: ['', [Validators.required]],
      type: null,
      description: '',
    });
    this.widgetList$ = this.widgetService
      .getWidgetList()
      .pipe(finalize(() => (this.loadingWidgets = false)));
  }

  openCreateWidgetModal(): void {
    this.isAddModalVisible = true;

    timer(300)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.nameInput.nativeElement.focus());
  }

  createWidget(): void {
    if (this.widgetForm.valid) {
      this.creatingWidget = true;

      this.widgetService
        .addWidget({ ...this.widgetForm.value })
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(({ id }) => this.router.navigate(['/widgets', id]));
    }
  }

  showDeleteWidgetConfirm({ id, name }: Widget): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this widget?',
      nzContent: `<b style="color: red;">You are about to delete the ${name} widget</b>`,
      nzOkText: 'Yes',
      nzCancelText: 'No',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.widgetService.deleteWidget(id),
    });
  }

  cancelWidgetCreation(): void {
    this.isAddModalVisible = false;
    this.creatingWidget = false;

    this.widgetForm.reset();
  }
}
