import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EmployeeMySuffixComponent } from '../list/employee-my-suffix.component';
import { EmployeeMySuffixDetailComponent } from '../detail/employee-my-suffix-detail.component';
import { EmployeeMySuffixUpdateComponent } from '../update/employee-my-suffix-update.component';
import { EmployeeMySuffixRoutingResolveService } from './employee-my-suffix-routing-resolve.service';

const employeeRoute: Routes = [
  {
    path: '',
    component: EmployeeMySuffixComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmployeeMySuffixDetailComponent,
    resolve: {
      employee: EmployeeMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmployeeMySuffixUpdateComponent,
    resolve: {
      employee: EmployeeMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmployeeMySuffixUpdateComponent,
    resolve: {
      employee: EmployeeMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(employeeRoute)],
  exports: [RouterModule],
})
export class EmployeeMySuffixRoutingModule {}
