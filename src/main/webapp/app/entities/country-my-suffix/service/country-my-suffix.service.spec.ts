import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICountryMySuffix, CountryMySuffix } from '../country-my-suffix.model';

import { CountryMySuffixService } from './country-my-suffix.service';

describe('CountryMySuffix Service', () => {
  let service: CountryMySuffixService;
  let httpMock: HttpTestingController;
  let elemDefault: ICountryMySuffix;
  let expectedResult: ICountryMySuffix | ICountryMySuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CountryMySuffixService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      countryName: 'AAAAAAA',
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

    it('should create a CountryMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new CountryMySuffix()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CountryMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          countryName: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CountryMySuffix', () => {
      const patchObject = Object.assign({}, new CountryMySuffix());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CountryMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          countryName: 'BBBBBB',
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

    it('should delete a CountryMySuffix', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCountryMySuffixToCollectionIfMissing', () => {
      it('should add a CountryMySuffix to an empty array', () => {
        const country: ICountryMySuffix = { id: 123 };
        expectedResult = service.addCountryMySuffixToCollectionIfMissing([], country);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(country);
      });

      it('should not add a CountryMySuffix to an array that contains it', () => {
        const country: ICountryMySuffix = { id: 123 };
        const countryCollection: ICountryMySuffix[] = [
          {
            ...country,
          },
          { id: 456 },
        ];
        expectedResult = service.addCountryMySuffixToCollectionIfMissing(countryCollection, country);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CountryMySuffix to an array that doesn't contain it", () => {
        const country: ICountryMySuffix = { id: 123 };
        const countryCollection: ICountryMySuffix[] = [{ id: 456 }];
        expectedResult = service.addCountryMySuffixToCollectionIfMissing(countryCollection, country);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(country);
      });

      it('should add only unique CountryMySuffix to an array', () => {
        const countryArray: ICountryMySuffix[] = [{ id: 123 }, { id: 456 }, { id: 86835 }];
        const countryCollection: ICountryMySuffix[] = [{ id: 123 }];
        expectedResult = service.addCountryMySuffixToCollectionIfMissing(countryCollection, ...countryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const country: ICountryMySuffix = { id: 123 };
        const country2: ICountryMySuffix = { id: 456 };
        expectedResult = service.addCountryMySuffixToCollectionIfMissing([], country, country2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(country);
        expect(expectedResult).toContain(country2);
      });

      it('should accept null and undefined values', () => {
        const country: ICountryMySuffix = { id: 123 };
        expectedResult = service.addCountryMySuffixToCollectionIfMissing([], null, country, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(country);
      });

      it('should return initial array if no CountryMySuffix is added', () => {
        const countryCollection: ICountryMySuffix[] = [{ id: 123 }];
        expectedResult = service.addCountryMySuffixToCollectionIfMissing(countryCollection, undefined, null);
        expect(expectedResult).toEqual(countryCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
