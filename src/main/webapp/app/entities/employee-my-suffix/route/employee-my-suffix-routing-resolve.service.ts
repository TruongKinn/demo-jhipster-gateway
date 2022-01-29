import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmployeeMySuffix, EmployeeMySuffix } from '../employee-my-suffix.model';
import { EmployeeMySuffixService } from '../service/employee-my-suffix.service';

@Injectable({ providedIn: 'root' })
export class EmployeeMySuffixRoutingResolveService implements Resolve<IEmployeeMySuffix> {
  constructor(protected service: EmployeeMySuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployeeMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((employee: HttpResponse<EmployeeMySuffix>) => {
          if (employee.body) {
            return of(employee.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EmployeeMySuffix());
  }
}
