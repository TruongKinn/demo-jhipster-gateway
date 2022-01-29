import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { JobHistoryMySuffixComponent } from '../list/job-history-my-suffix.component';
import { JobHistoryMySuffixDetailComponent } from '../detail/job-history-my-suffix-detail.component';
import { JobHistoryMySuffixUpdateComponent } from '../update/job-history-my-suffix-update.component';
import { JobHistoryMySuffixRoutingResolveService } from './job-history-my-suffix-routing-resolve.service';

const jobHistoryRoute: Routes = [
  {
    path: '',
    component: JobHistoryMySuffixComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: JobHistoryMySuffixDetailComponent,
    resolve: {
      jobHistory: JobHistoryMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: JobHistoryMySuffixUpdateComponent,
    resolve: {
      jobHistory: JobHistoryMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: JobHistoryMySuffixUpdateComponent,
    resolve: {
      jobHistory: JobHistoryMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(jobHistoryRoute)],
  exports: [RouterModule],
})
export class JobHistoryMySuffixRoutingModule {}
