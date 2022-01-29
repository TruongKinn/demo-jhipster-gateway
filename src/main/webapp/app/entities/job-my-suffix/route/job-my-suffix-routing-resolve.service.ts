import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IJobMySuffix, JobMySuffix } from '../job-my-suffix.model';
import { JobMySuffixService } from '../service/job-my-suffix.service';

@Injectable({ providedIn: 'root' })
export class JobMySuffixRoutingResolveService implements Resolve<IJobMySuffix> {
  constructor(protected service: JobMySuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJobMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((job: HttpResponse<JobMySuffix>) => {
          if (job.body) {
            return of(job.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new JobMySuffix());
  }
}
