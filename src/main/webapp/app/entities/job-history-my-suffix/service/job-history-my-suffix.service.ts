import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IJobHistoryMySuffix, getJobHistoryMySuffixIdentifier } from '../job-history-my-suffix.model';

export type EntityResponseType = HttpResponse<IJobHistoryMySuffix>;
export type EntityArrayResponseType = HttpResponse<IJobHistoryMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class JobHistoryMySuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/job-histories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(jobHistory: IJobHistoryMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(jobHistory);
    return this.http
      .post<IJobHistoryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(jobHistory: IJobHistoryMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(jobHistory);
    return this.http
      .put<IJobHistoryMySuffix>(`${this.resourceUrl}/${getJobHistoryMySuffixIdentifier(jobHistory) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(jobHistory: IJobHistoryMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(jobHistory);
    return this.http
      .patch<IJobHistoryMySuffix>(`${this.resourceUrl}/${getJobHistoryMySuffixIdentifier(jobHistory) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IJobHistoryMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IJobHistoryMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addJobHistoryMySuffixToCollectionIfMissing(
    jobHistoryCollection: IJobHistoryMySuffix[],
    ...jobHistoriesToCheck: (IJobHistoryMySuffix | null | undefined)[]
  ): IJobHistoryMySuffix[] {
    const jobHistories: IJobHistoryMySuffix[] = jobHistoriesToCheck.filter(isPresent);
    if (jobHistories.length > 0) {
      const jobHistoryCollectionIdentifiers = jobHistoryCollection.map(jobHistoryItem => getJobHistoryMySuffixIdentifier(jobHistoryItem)!);
      const jobHistoriesToAdd = jobHistories.filter(jobHistoryItem => {
        const jobHistoryIdentifier = getJobHistoryMySuffixIdentifier(jobHistoryItem);
        if (jobHistoryIdentifier == null || jobHistoryCollectionIdentifiers.includes(jobHistoryIdentifier)) {
          return false;
        }
        jobHistoryCollectionIdentifiers.push(jobHistoryIdentifier);
        return true;
      });
      return [...jobHistoriesToAdd, ...jobHistoryCollection];
    }
    return jobHistoryCollection;
  }

  protected convertDateFromClient(jobHistory: IJobHistoryMySuffix): IJobHistoryMySuffix {
    return Object.assign({}, jobHistory, {
      startDate: jobHistory.startDate?.isValid() ? jobHistory.startDate.toJSON() : undefined,
      endDate: jobHistory.endDate?.isValid() ? jobHistory.endDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate ? dayjs(res.body.startDate) : undefined;
      res.body.endDate = res.body.endDate ? dayjs(res.body.endDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((jobHistory: IJobHistoryMySuffix) => {
        jobHistory.startDate = jobHistory.startDate ? dayjs(jobHistory.startDate) : undefined;
        jobHistory.endDate = jobHistory.endDate ? dayjs(jobHistory.endDate) : undefined;
      });
    }
    return res;
  }
}
