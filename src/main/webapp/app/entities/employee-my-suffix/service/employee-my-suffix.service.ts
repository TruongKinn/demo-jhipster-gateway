import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmployeeMySuffix, getEmployeeMySuffixIdentifier } from '../employee-my-suffix.model';

export type EntityResponseType = HttpResponse<IEmployeeMySuffix>;
export type EntityArrayResponseType = HttpResponse<IEmployeeMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeMySuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/employees');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(employee: IEmployeeMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employee);
    return this.http
      .post<IEmployeeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(employee: IEmployeeMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employee);
    return this.http
      .put<IEmployeeMySuffix>(`${this.resourceUrl}/${getEmployeeMySuffixIdentifier(employee) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(employee: IEmployeeMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employee);
    return this.http
      .patch<IEmployeeMySuffix>(`${this.resourceUrl}/${getEmployeeMySuffixIdentifier(employee) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEmployeeMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEmployeeMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEmployeeMySuffixToCollectionIfMissing(
    employeeCollection: IEmployeeMySuffix[],
    ...employeesToCheck: (IEmployeeMySuffix | null | undefined)[]
  ): IEmployeeMySuffix[] {
    const employees: IEmployeeMySuffix[] = employeesToCheck.filter(isPresent);
    if (employees.length > 0) {
      const employeeCollectionIdentifiers = employeeCollection.map(employeeItem => getEmployeeMySuffixIdentifier(employeeItem)!);
      const employeesToAdd = employees.filter(employeeItem => {
        const employeeIdentifier = getEmployeeMySuffixIdentifier(employeeItem);
        if (employeeIdentifier == null || employeeCollectionIdentifiers.includes(employeeIdentifier)) {
          return false;
        }
        employeeCollectionIdentifiers.push(employeeIdentifier);
        return true;
      });
      return [...employeesToAdd, ...employeeCollection];
    }
    return employeeCollection;
  }

  protected convertDateFromClient(employee: IEmployeeMySuffix): IEmployeeMySuffix {
    return Object.assign({}, employee, {
      hireDate: employee.hireDate?.isValid() ? employee.hireDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.hireDate = res.body.hireDate ? dayjs(res.body.hireDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((employee: IEmployeeMySuffix) => {
        employee.hireDate = employee.hireDate ? dayjs(employee.hireDate) : undefined;
      });
    }
    return res;
  }
}
