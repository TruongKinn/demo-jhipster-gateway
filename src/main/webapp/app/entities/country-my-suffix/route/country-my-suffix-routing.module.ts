import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CountryMySuffixComponent } from '../list/country-my-suffix.component';
import { CountryMySuffixDetailComponent } from '../detail/country-my-suffix-detail.component';
import { CountryMySuffixUpdateComponent } from '../update/country-my-suffix-update.component';
import { CountryMySuffixRoutingResolveService } from './country-my-suffix-routing-resolve.service';

const countryRoute: Routes = [
  {
    path: '',
    component: CountryMySuffixComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CountryMySuffixDetailComponent,
    resolve: {
      country: CountryMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CountryMySuffixUpdateComponent,
    resolve: {
      country: CountryMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CountryMySuffixUpdateComponent,
    resolve: {
      country: CountryMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(countryRoute)],
  exports: [RouterModule],
})
export class CountryMySuffixRoutingModule {}
