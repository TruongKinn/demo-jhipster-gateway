import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDepartmentMySuffix, getDepartmentMySuffixIdentifier } from '../department-my-suffix.model';

export type EntityResponseType = HttpResponse<IDepartmentMySuffix>;
export type EntityArrayResponseType = HttpResponse<IDepartmentMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class DepartmentMySuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/departments');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(department: IDepartmentMySuffix): Observable<EntityResponseType> {
    return this.http.post<IDepartmentMySuffix>(this.resourceUrl, department, { observe: 'response' });
  }

  update(department: IDepartmentMySuffix): Observable<EntityResponseType> {
    return this.http.put<IDepartmentMySuffix>(`${this.resourceUrl}/${getDepartmentMySuffixIdentifier(department) as number}`, department, {
      observe: 'response',
    });
  }

  partialUpdate(department: IDepartmentMySuffix): Observable<EntityResponseType> {
    return this.http.patch<IDepartmentMySuffix>(
      `${this.resourceUrl}/${getDepartmentMySuffixIdentifier(department) as number}`,
      department,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDepartmentMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepartmentMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDepartmentMySuffixToCollectionIfMissing(
    departmentCollection: IDepartmentMySuffix[],
    ...departmentsToCheck: (IDepartmentMySuffix | null | undefined)[]
  ): IDepartmentMySuffix[] {
    const departments: IDepartmentMySuffix[] = departmentsToCheck.filter(isPresent);
    if (departments.length > 0) {
      const departmentCollectionIdentifiers = departmentCollection.map(departmentItem => getDepartmentMySuffixIdentifier(departmentItem)!);
      const departmentsToAdd = departments.filter(departmentItem => {
        const departmentIdentifier = getDepartmentMySuffixIdentifier(departmentItem);
        if (departmentIdentifier == null || departmentCollectionIdentifiers.includes(departmentIdentifier)) {
          return false;
        }
        departmentCollectionIdentifiers.push(departmentIdentifier);
        return true;
      });
      return [...departmentsToAdd, ...departmentCollection];
    }
    return departmentCollection;
  }
}
