import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRegionMySuffix, RegionMySuffix } from '../region-my-suffix.model';
import { RegionMySuffixService } from '../service/region-my-suffix.service';

@Injectable({ providedIn: 'root' })
export class RegionMySuffixRoutingResolveService implements Resolve<IRegionMySuffix> {
  constructor(protected service: RegionMySuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRegionMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((region: HttpResponse<RegionMySuffix>) => {
          if (region.body) {
            return of(region.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RegionMySuffix());
  }
}
