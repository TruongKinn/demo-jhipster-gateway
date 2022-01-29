import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICountryMySuffix, getCountryMySuffixIdentifier } from '../country-my-suffix.model';

export type EntityResponseType = HttpResponse<ICountryMySuffix>;
export type EntityArrayResponseType = HttpResponse<ICountryMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CountryMySuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/countries');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(country: ICountryMySuffix): Observable<EntityResponseType> {
    return this.http.post<ICountryMySuffix>(this.resourceUrl, country, { observe: 'response' });
  }

  update(country: ICountryMySuffix): Observable<EntityResponseType> {
    return this.http.put<ICountryMySuffix>(`${this.resourceUrl}/${getCountryMySuffixIdentifier(country) as number}`, country, {
      observe: 'response',
    });
  }

  partialUpdate(country: ICountryMySuffix): Observable<EntityResponseType> {
    return this.http.patch<ICountryMySuffix>(`${this.resourceUrl}/${getCountryMySuffixIdentifier(country) as number}`, country, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICountryMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICountryMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCountryMySuffixToCollectionIfMissing(
    countryCollection: ICountryMySuffix[],
    ...countriesToCheck: (ICountryMySuffix | null | undefined)[]
  ): ICountryMySuffix[] {
    const countries: ICountryMySuffix[] = countriesToCheck.filter(isPresent);
    if (countries.length > 0) {
      const countryCollectionIdentifiers = countryCollection.map(countryItem => getCountryMySuffixIdentifier(countryItem)!);
      const countriesToAdd = countries.filter(countryItem => {
        const countryIdentifier = getCountryMySuffixIdentifier(countryItem);
        if (countryIdentifier == null || countryCollectionIdentifiers.includes(countryIdentifier)) {
          return false;
        }
        countryCollectionIdentifiers.push(countryIdentifier);
        return true;
      });
      return [...countriesToAdd, ...countryCollection];
    }
    return countryCollection;
  }
}
