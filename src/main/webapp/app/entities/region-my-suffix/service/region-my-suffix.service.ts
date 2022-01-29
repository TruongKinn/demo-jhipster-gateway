import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRegionMySuffix, getRegionMySuffixIdentifier } from '../region-my-suffix.model';

export type EntityResponseType = HttpResponse<IRegionMySuffix>;
export type EntityArrayResponseType = HttpResponse<IRegionMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class RegionMySuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/regions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(region: IRegionMySuffix): Observable<EntityResponseType> {
    return this.http.post<IRegionMySuffix>(this.resourceUrl, region, { observe: 'response' });
  }

  update(region: IRegionMySuffix): Observable<EntityResponseType> {
    return this.http.put<IRegionMySuffix>(`${this.resourceUrl}/${getRegionMySuffixIdentifier(region) as number}`, region, {
      observe: 'response',
    });
  }

  partialUpdate(region: IRegionMySuffix): Observable<EntityResponseType> {
    return this.http.patch<IRegionMySuffix>(`${this.resourceUrl}/${getRegionMySuffixIdentifier(region) as number}`, region, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRegionMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRegionMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRegionMySuffixToCollectionIfMissing(
    regionCollection: IRegionMySuffix[],
    ...regionsToCheck: (IRegionMySuffix | null | undefined)[]
  ): IRegionMySuffix[] {
    const regions: IRegionMySuffix[] = regionsToCheck.filter(isPresent);
    if (regions.length > 0) {
      const regionCollectionIdentifiers = regionCollection.map(regionItem => getRegionMySuffixIdentifier(regionItem)!);
      const regionsToAdd = regions.filter(regionItem => {
        const regionIdentifier = getRegionMySuffixIdentifier(regionItem);
        if (regionIdentifier == null || regionCollectionIdentifiers.includes(regionIdentifier)) {
          return false;
        }
        regionCollectionIdentifiers.push(regionIdentifier);
        return true;
      });
      return [...regionsToAdd, ...regionCollection];
    }
    return regionCollection;
  }
}
