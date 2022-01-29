import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRegionMySuffix, RegionMySuffix } from '../region-my-suffix.model';

import { RegionMySuffixService } from './region-my-suffix.service';

describe('RegionMySuffix Service', () => {
  let service: RegionMySuffixService;
  let httpMock: HttpTestingController;
  let elemDefault: IRegionMySuffix;
  let expectedResult: IRegionMySuffix | IRegionMySuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RegionMySuffixService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      regionName: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a RegionMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new RegionMySuffix()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RegionMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          regionName: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RegionMySuffix', () => {
      const patchObject = Object.assign({}, new RegionMySuffix());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RegionMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          regionName: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a RegionMySuffix', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addRegionMySuffixToCollectionIfMissing', () => {
      it('should add a RegionMySuffix to an empty array', () => {
        const region: IRegionMySuffix = { id: 123 };
        expectedResult = service.addRegionMySuffixToCollectionIfMissing([], region);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(region);
      });

      it('should not add a RegionMySuffix to an array that contains it', () => {
        const region: IRegionMySuffix = { id: 123 };
        const regionCollection: IRegionMySuffix[] = [
          {
            ...region,
          },
          { id: 456 },
        ];
        expectedResult = service.addRegionMySuffixToCollectionIfMissing(regionCollection, region);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RegionMySuffix to an array that doesn't contain it", () => {
        const region: IRegionMySuffix = { id: 123 };
        const regionCollection: IRegionMySuffix[] = [{ id: 456 }];
        expectedResult = service.addRegionMySuffixToCollectionIfMissing(regionCollection, region);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(region);
      });

      it('should add only unique RegionMySuffix to an array', () => {
        const regionArray: IRegionMySuffix[] = [{ id: 123 }, { id: 456 }, { id: 52888 }];
        const regionCollection: IRegionMySuffix[] = [{ id: 123 }];
        expectedResult = service.addRegionMySuffixToCollectionIfMissing(regionCollection, ...regionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const region: IRegionMySuffix = { id: 123 };
        const region2: IRegionMySuffix = { id: 456 };
        expectedResult = service.addRegionMySuffixToCollectionIfMissing([], region, region2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(region);
        expect(expectedResult).toContain(region2);
      });

      it('should accept null and undefined values', () => {
        const region: IRegionMySuffix = { id: 123 };
        expectedResult = service.addRegionMySuffixToCollectionIfMissing([], null, region, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(region);
      });

      it('should return initial array if no RegionMySuffix is added', () => {
        const regionCollection: IRegionMySuffix[] = [{ id: 123 }];
        expectedResult = service.addRegionMySuffixToCollectionIfMissing(regionCollection, undefined, null);
        expect(expectedResult).toEqual(regionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
