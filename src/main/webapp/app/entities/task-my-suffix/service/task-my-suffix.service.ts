import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITaskMySuffix, getTaskMySuffixIdentifier } from '../task-my-suffix.model';

export type EntityResponseType = HttpResponse<ITaskMySuffix>;
export type EntityArrayResponseType = HttpResponse<ITaskMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TaskMySuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tasks');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(task: ITaskMySuffix): Observable<EntityResponseType> {
    return this.http.post<ITaskMySuffix>(this.resourceUrl, task, { observe: 'response' });
  }

  update(task: ITaskMySuffix): Observable<EntityResponseType> {
    return this.http.put<ITaskMySuffix>(`${this.resourceUrl}/${getTaskMySuffixIdentifier(task) as number}`, task, { observe: 'response' });
  }

  partialUpdate(task: ITaskMySuffix): Observable<EntityResponseType> {
    return this.http.patch<ITaskMySuffix>(`${this.resourceUrl}/${getTaskMySuffixIdentifier(task) as number}`, task, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITaskMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaskMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTaskMySuffixToCollectionIfMissing(
    taskCollection: ITaskMySuffix[],
    ...tasksToCheck: (ITaskMySuffix | null | undefined)[]
  ): ITaskMySuffix[] {
    const tasks: ITaskMySuffix[] = tasksToCheck.filter(isPresent);
    if (tasks.length > 0) {
      const taskCollectionIdentifiers = taskCollection.map(taskItem => getTaskMySuffixIdentifier(taskItem)!);
      const tasksToAdd = tasks.filter(taskItem => {
        const taskIdentifier = getTaskMySuffixIdentifier(taskItem);
        if (taskIdentifier == null || taskCollectionIdentifiers.includes(taskIdentifier)) {
          return false;
        }
        taskCollectionIdentifiers.push(taskIdentifier);
        return true;
      });
      return [...tasksToAdd, ...taskCollection];
    }
    return taskCollection;
  }
}
