import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subject, timer } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { Dashboard } from '../../core/models/dashboard.model';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'combi-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
})
export class DashboardListComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  dashboardForm: FormGroup;
  dashboardList$: Observable<Array<Dashboard>>;
  loadingDashboards = true;
  isAddModalVisible = false;
  creatingDashboard = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NzModalService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.dashboardForm = this.formBuilder.group({
      id: '',
      name: ['', [Validators.required]],
      description: '',
    });
    this.dashboardList$ = this.dashboardService
      .getDashboardList()
      .pipe(finalize(() => (this.loadingDashboards = false)));
  }

  openCreateDashboardModal(): void {
    this.isAddModalVisible = true;

    timer(300)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.nameInput.nativeElement.focus());
  }

  createDashboard(): void {
    if (this.dashboardForm.valid) {
      this.creatingDashboard = true;

      this.dashboardService
        .addDashboard({ ...this.dashboardForm.value })
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(({ id }) => this.router.navigate(['/dashboards', id]));
    }
  }

  showDeleteDashboardConfirm({ id, name }: Dashboard): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this dashboard?',
      nzContent: `<b style="color: red;">You are about to delete the ${name} dashboard</b>`,
      nzOkText: 'Yes',
      nzCancelText: 'No',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.dashboardService.deleteDashboard(id),
    });
  }

  cancelDashboardCreation(): void {
    this.isAddModalVisible = false;
    this.creatingDashboard = false;

    this.dashboardForm.reset();
  }
}
