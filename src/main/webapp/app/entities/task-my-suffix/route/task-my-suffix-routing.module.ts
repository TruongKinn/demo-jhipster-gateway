import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TaskMySuffixComponent } from '../list/task-my-suffix.component';
import { TaskMySuffixDetailComponent } from '../detail/task-my-suffix-detail.component';
import { TaskMySuffixUpdateComponent } from '../update/task-my-suffix-update.component';
import { TaskMySuffixRoutingResolveService } from './task-my-suffix-routing-resolve.service';

const taskRoute: Routes = [
  {
    path: '',
    component: TaskMySuffixComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaskMySuffixDetailComponent,
    resolve: {
      task: TaskMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaskMySuffixUpdateComponent,
    resolve: {
      task: TaskMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaskMySuffixUpdateComponent,
    resolve: {
      task: TaskMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(taskRoute)],
  exports: [RouterModule],
})
export class TaskMySuffixRoutingModule {}
