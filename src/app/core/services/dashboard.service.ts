import { Injectable } from '@angular/core';

import { cloneDeep } from 'lodash';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { Dashboard } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private dashboardList: Array<Dashboard> = [
    {
      id: '20a62da2-d2ba-4456-819d-d700e50fe7f2',
      name: 'Default Dashboard',
      description: 'This is the default dashboard',
    },
  ];

  getDashboard(id: string): Observable<Dashboard | undefined> {
    return timer(500).pipe(
      map(() => {
        const selectedDashboard = this.dashboardList.find(
          (dashboard) => dashboard.id === id
        );

        if (selectedDashboard) {
          return { ...selectedDashboard };
        }

        return selectedDashboard;
      })
    );
  }

  getDashboardList(): Observable<Array<Dashboard>> {
    return timer(500).pipe(map(() => cloneDeep(this.dashboardList)));
  }

  addDashboard(dashboard: Dashboard): Observable<Dashboard> {
    return timer(500).pipe(
      map(() => {
        dashboard.id = uuidv4();

        this.dashboardList.push(dashboard);

        return dashboard;
      })
    );
  }

  deleteDashboard(id: string): void {
    const itemIndex = this.dashboardList.findIndex(
      (dashboard) => dashboard.id === id
    );

    if (itemIndex >= 0) {
      this.dashboardList.splice(itemIndex, 1);
    }
  }
}
