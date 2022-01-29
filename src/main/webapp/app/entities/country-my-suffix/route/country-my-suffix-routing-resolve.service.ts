import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICountryMySuffix, CountryMySuffix } from '../country-my-suffix.model';
import { CountryMySuffixService } from '../service/country-my-suffix.service';

@Injectable({ providedIn: 'root' })
export class CountryMySuffixRoutingResolveService implements Resolve<ICountryMySuffix> {
  constructor(protected service: CountryMySuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICountryMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((country: HttpResponse<CountryMySuffix>) => {
          if (country.body) {
            return of(country.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CountryMySuffix());
  }
}
