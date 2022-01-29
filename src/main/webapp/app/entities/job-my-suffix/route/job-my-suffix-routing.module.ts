import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { JobMySuffixComponent } from '../list/job-my-suffix.component';
import { JobMySuffixDetailComponent } from '../detail/job-my-suffix-detail.component';
import { JobMySuffixUpdateComponent } from '../update/job-my-suffix-update.component';
import { JobMySuffixRoutingResolveService } from './job-my-suffix-routing-resolve.service';

const jobRoute: Routes = [
  {
    path: '',
    component: JobMySuffixComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: JobMySuffixDetailComponent,
    resolve: {
      job: JobMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: JobMySuffixUpdateComponent,
    resolve: {
      job: JobMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: JobMySuffixUpdateComponent,
    resolve: {
      job: JobMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(jobRoute)],
  exports: [RouterModule],
})
export class JobMySuffixRoutingModule {}
