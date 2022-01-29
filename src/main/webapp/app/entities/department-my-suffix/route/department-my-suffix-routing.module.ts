import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DepartmentMySuffixComponent } from '../list/department-my-suffix.component';
import { DepartmentMySuffixDetailComponent } from '../detail/department-my-suffix-detail.component';
import { DepartmentMySuffixUpdateComponent } from '../update/department-my-suffix-update.component';
import { DepartmentMySuffixRoutingResolveService } from './department-my-suffix-routing-resolve.service';

const departmentRoute: Routes = [
  {
    path: '',
    component: DepartmentMySuffixComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DepartmentMySuffixDetailComponent,
    resolve: {
      department: DepartmentMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DepartmentMySuffixUpdateComponent,
    resolve: {
      department: DepartmentMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DepartmentMySuffixUpdateComponent,
    resolve: {
      department: DepartmentMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(departmentRoute)],
  exports: [RouterModule],
})
export class DepartmentMySuffixRoutingModule {}
