import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDepartmentMySuffix, DepartmentMySuffix } from '../department-my-suffix.model';
import { DepartmentMySuffixService } from '../service/department-my-suffix.service';

@Injectable({ providedIn: 'root' })
export class DepartmentMySuffixRoutingResolveService implements Resolve<IDepartmentMySuffix> {
  constructor(protected service: DepartmentMySuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDepartmentMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((department: HttpResponse<DepartmentMySuffix>) => {
          if (department.body) {
            return of(department.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DepartmentMySuffix());
  }
}
