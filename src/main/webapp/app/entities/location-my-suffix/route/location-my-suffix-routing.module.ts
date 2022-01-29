import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LocationMySuffixComponent } from '../list/location-my-suffix.component';
import { LocationMySuffixDetailComponent } from '../detail/location-my-suffix-detail.component';
import { LocationMySuffixUpdateComponent } from '../update/location-my-suffix-update.component';
import { LocationMySuffixRoutingResolveService } from './location-my-suffix-routing-resolve.service';

const locationRoute: Routes = [
  {
    path: '',
    component: LocationMySuffixComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LocationMySuffixDetailComponent,
    resolve: {
      location: LocationMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LocationMySuffixUpdateComponent,
    resolve: {
      location: LocationMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LocationMySuffixUpdateComponent,
    resolve: {
      location: LocationMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(locationRoute)],
  exports: [RouterModule],
})
export class LocationMySuffixRoutingModule {}
