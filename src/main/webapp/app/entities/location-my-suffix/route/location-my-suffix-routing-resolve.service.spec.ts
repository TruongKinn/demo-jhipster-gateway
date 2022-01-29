import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ILocationMySuffix, LocationMySuffix } from '../location-my-suffix.model';
import { LocationMySuffixService } from '../service/location-my-suffix.service';

import { LocationMySuffixRoutingResolveService } from './location-my-suffix-routing-resolve.service';

describe('LocationMySuffix routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: LocationMySuffixRoutingResolveService;
  let service: LocationMySuffixService;
  let resultLocationMySuffix: ILocationMySuffix | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(LocationMySuffixRoutingResolveService);
    service = TestBed.inject(LocationMySuffixService);
    resultLocationMySuffix = undefined;
  });

  describe('resolve', () => {
    it('should return ILocationMySuffix returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLocationMySuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultLocationMySuffix).toEqual({ id: 123 });
    });

    it('should return new ILocationMySuffix if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLocationMySuffix = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultLocationMySuffix).toEqual(new LocationMySuffix());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as LocationMySuffix })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLocationMySuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultLocationMySuffix).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
