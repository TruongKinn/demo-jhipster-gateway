import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IDepartmentMySuffix, DepartmentMySuffix } from '../department-my-suffix.model';
import { DepartmentMySuffixService } from '../service/department-my-suffix.service';

import { DepartmentMySuffixRoutingResolveService } from './department-my-suffix-routing-resolve.service';

describe('DepartmentMySuffix routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: DepartmentMySuffixRoutingResolveService;
  let service: DepartmentMySuffixService;
  let resultDepartmentMySuffix: IDepartmentMySuffix | undefined;

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
    routingResolveService = TestBed.inject(DepartmentMySuffixRoutingResolveService);
    service = TestBed.inject(DepartmentMySuffixService);
    resultDepartmentMySuffix = undefined;
  });

  describe('resolve', () => {
    it('should return IDepartmentMySuffix returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDepartmentMySuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDepartmentMySuffix).toEqual({ id: 123 });
    });

    it('should return new IDepartmentMySuffix if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDepartmentMySuffix = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDepartmentMySuffix).toEqual(new DepartmentMySuffix());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as DepartmentMySuffix })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDepartmentMySuffix = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDepartmentMySuffix).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
