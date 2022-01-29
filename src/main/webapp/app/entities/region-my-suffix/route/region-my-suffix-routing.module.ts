import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RegionMySuffixComponent } from '../list/region-my-suffix.component';
import { RegionMySuffixDetailComponent } from '../detail/region-my-suffix-detail.component';
import { RegionMySuffixUpdateComponent } from '../update/region-my-suffix-update.component';
import { RegionMySuffixRoutingResolveService } from './region-my-suffix-routing-resolve.service';

const regionRoute: Routes = [
  {
    path: '',
    component: RegionMySuffixComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RegionMySuffixDetailComponent,
    resolve: {
      region: RegionMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RegionMySuffixUpdateComponent,
    resolve: {
      region: RegionMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RegionMySuffixUpdateComponent,
    resolve: {
      region: RegionMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(regionRoute)],
  exports: [RouterModule],
})
export class RegionMySuffixRoutingModule {}
