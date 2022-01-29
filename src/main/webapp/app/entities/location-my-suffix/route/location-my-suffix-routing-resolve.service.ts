import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILocationMySuffix, LocationMySuffix } from '../location-my-suffix.model';
import { LocationMySuffixService } from '../service/location-my-suffix.service';

@Injectable({ providedIn: 'root' })
export class LocationMySuffixRoutingResolveService implements Resolve<ILocationMySuffix> {
  constructor(protected service: LocationMySuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocationMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((location: HttpResponse<LocationMySuffix>) => {
          if (location.body) {
            return of(location.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LocationMySuffix());
  }
}
