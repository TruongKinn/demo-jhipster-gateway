import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILocationMySuffix, getLocationMySuffixIdentifier } from '../location-my-suffix.model';

export type EntityResponseType = HttpResponse<ILocationMySuffix>;
export type EntityArrayResponseType = HttpResponse<ILocationMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class LocationMySuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/locations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(location: ILocationMySuffix): Observable<EntityResponseType> {
    return this.http.post<ILocationMySuffix>(this.resourceUrl, location, { observe: 'response' });
  }

  update(location: ILocationMySuffix): Observable<EntityResponseType> {
    return this.http.put<ILocationMySuffix>(`${this.resourceUrl}/${getLocationMySuffixIdentifier(location) as number}`, location, {
      observe: 'response',
    });
  }

  partialUpdate(location: ILocationMySuffix): Observable<EntityResponseType> {
    return this.http.patch<ILocationMySuffix>(`${this.resourceUrl}/${getLocationMySuffixIdentifier(location) as number}`, location, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILocationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILocationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addLocationMySuffixToCollectionIfMissing(
    locationCollection: ILocationMySuffix[],
    ...locationsToCheck: (ILocationMySuffix | null | undefined)[]
  ): ILocationMySuffix[] {
    const locations: ILocationMySuffix[] = locationsToCheck.filter(isPresent);
    if (locations.length > 0) {
      const locationCollectionIdentifiers = locationCollection.map(locationItem => getLocationMySuffixIdentifier(locationItem)!);
      const locationsToAdd = locations.filter(locationItem => {
        const locationIdentifier = getLocationMySuffixIdentifier(locationItem);
        if (locationIdentifier == null || locationCollectionIdentifiers.includes(locationIdentifier)) {
          return false;
        }
        locationCollectionIdentifiers.push(locationIdentifier);
        return true;
      });
      return [...locationsToAdd, ...locationCollection];
    }
    return locationCollection;
  }
}
