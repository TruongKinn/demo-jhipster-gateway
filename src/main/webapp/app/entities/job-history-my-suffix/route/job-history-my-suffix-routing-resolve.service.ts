import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IJobHistoryMySuffix, JobHistoryMySuffix } from '../job-history-my-suffix.model';
import { JobHistoryMySuffixService } from '../service/job-history-my-suffix.service';

@Injectable({ providedIn: 'root' })
export class JobHistoryMySuffixRoutingResolveService implements Resolve<IJobHistoryMySuffix> {
  constructor(protected service: JobHistoryMySuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJobHistoryMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((jobHistory: HttpResponse<JobHistoryMySuffix>) => {
          if (jobHistory.body) {
            return of(jobHistory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new JobHistoryMySuffix());
  }
}
