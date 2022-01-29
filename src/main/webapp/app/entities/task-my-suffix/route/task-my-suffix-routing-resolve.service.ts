import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITaskMySuffix, TaskMySuffix } from '../task-my-suffix.model';
import { TaskMySuffixService } from '../service/task-my-suffix.service';

@Injectable({ providedIn: 'root' })
export class TaskMySuffixRoutingResolveService implements Resolve<ITaskMySuffix> {
  constructor(protected service: TaskMySuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITaskMySuffix> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((task: HttpResponse<TaskMySuffix>) => {
          if (task.body) {
            return of(task.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TaskMySuffix());
  }
}
