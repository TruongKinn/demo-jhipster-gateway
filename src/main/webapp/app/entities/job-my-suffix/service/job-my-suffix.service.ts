import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IJobMySuffix, getJobMySuffixIdentifier } from '../job-my-suffix.model';

export type EntityResponseType = HttpResponse<IJobMySuffix>;
export type EntityArrayResponseType = HttpResponse<IJobMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class JobMySuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/jobs');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(job: IJobMySuffix): Observable<EntityResponseType> {
    return this.http.post<IJobMySuffix>(this.resourceUrl, job, { observe: 'response' });
  }

  update(job: IJobMySuffix): Observable<EntityResponseType> {
    return this.http.put<IJobMySuffix>(`${this.resourceUrl}/${getJobMySuffixIdentifier(job) as number}`, job, { observe: 'response' });
  }

  partialUpdate(job: IJobMySuffix): Observable<EntityResponseType> {
    return this.http.patch<IJobMySuffix>(`${this.resourceUrl}/${getJobMySuffixIdentifier(job) as number}`, job, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IJobMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IJobMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addJobMySuffixToCollectionIfMissing(jobCollection: IJobMySuffix[], ...jobsToCheck: (IJobMySuffix | null | undefined)[]): IJobMySuffix[] {
    const jobs: IJobMySuffix[] = jobsToCheck.filter(isPresent);
    if (jobs.length > 0) {
      const jobCollectionIdentifiers = jobCollection.map(jobItem => getJobMySuffixIdentifier(jobItem)!);
      const jobsToAdd = jobs.filter(jobItem => {
        const jobIdentifier = getJobMySuffixIdentifier(jobItem);
        if (jobIdentifier == null || jobCollectionIdentifiers.includes(jobIdentifier)) {
          return false;
        }
        jobCollectionIdentifiers.push(jobIdentifier);
        return true;
      });
      return [...jobsToAdd, ...jobCollection];
    }
    return jobCollection;
  }
}
