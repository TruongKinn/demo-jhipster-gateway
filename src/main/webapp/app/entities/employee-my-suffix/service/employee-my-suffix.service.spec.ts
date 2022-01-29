import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IEmployeeMySuffix, EmployeeMySuffix } from '../employee-my-suffix.model';

import { EmployeeMySuffixService } from './employee-my-suffix.service';

describe('EmployeeMySuffix Service', () => {
  let service: EmployeeMySuffixService;
  let httpMock: HttpTestingController;
  let elemDefault: IEmployeeMySuffix;
  let expectedResult: IEmployeeMySuffix | IEmployeeMySuffix[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EmployeeMySuffixService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      firstName: 'AAAAAAA',
      lastName: 'AAAAAAA',
      email: 'AAAAAAA',
      phoneNumber: 'AAAAAAA',
      hireDate: currentDate,
      salary: 0,
      commissionPct: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          hireDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a EmployeeMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          hireDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          hireDate: currentDate,
        },
        returnedFromService
      );

      service.create(new EmployeeMySuffix()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EmployeeMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          firstName: 'BBBBBB',
          lastName: 'BBBBBB',
          email: 'BBBBBB',
          phoneNumber: 'BBBBBB',
          hireDate: currentDate.format(DATE_TIME_FORMAT),
          salary: 1,
          commissionPct: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          hireDate: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EmployeeMySuffix', () => {
      const patchObject = Object.assign(
        {
          lastName: 'BBBBBB',
          email: 'BBBBBB',
          phoneNumber: 'BBBBBB',
          hireDate: currentDate.format(DATE_TIME_FORMAT),
          salary: 1,
          commissionPct: 1,
        },
        new EmployeeMySuffix()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          hireDate: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EmployeeMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          firstName: 'BBBBBB',
          lastName: 'BBBBBB',
          email: 'BBBBBB',
          phoneNumber: 'BBBBBB',
          hireDate: currentDate.format(DATE_TIME_FORMAT),
          salary: 1,
          commissionPct: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          hireDate: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a EmployeeMySuffix', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addEmployeeMySuffixToCollectionIfMissing', () => {
      it('should add a EmployeeMySuffix to an empty array', () => {
        const employee: IEmployeeMySuffix = { id: 123 };
        expectedResult = service.addEmployeeMySuffixToCollectionIfMissing([], employee);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(employee);
      });

      it('should not add a EmployeeMySuffix to an array that contains it', () => {
        const employee: IEmployeeMySuffix = { id: 123 };
        const employeeCollection: IEmployeeMySuffix[] = [
          {
            ...employee,
          },
          { id: 456 },
        ];
        expectedResult = service.addEmployeeMySuffixToCollectionIfMissing(employeeCollection, employee);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EmployeeMySuffix to an array that doesn't contain it", () => {
        const employee: IEmployeeMySuffix = { id: 123 };
        const employeeCollection: IEmployeeMySuffix[] = [{ id: 456 }];
        expectedResult = service.addEmployeeMySuffixToCollectionIfMissing(employeeCollection, employee);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(employee);
      });

      it('should add only unique EmployeeMySuffix to an array', () => {
        const employeeArray: IEmployeeMySuffix[] = [{ id: 123 }, { id: 456 }, { id: 88217 }];
        const employeeCollection: IEmployeeMySuffix[] = [{ id: 123 }];
        expectedResult = service.addEmployeeMySuffixToCollectionIfMissing(employeeCollection, ...employeeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const employee: IEmployeeMySuffix = { id: 123 };
        const employee2: IEmployeeMySuffix = { id: 456 };
        expectedResult = service.addEmployeeMySuffixToCollectionIfMissing([], employee, employee2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(employee);
        expect(expectedResult).toContain(employee2);
      });

      it('should accept null and undefined values', () => {
        const employee: IEmployeeMySuffix = { id: 123 };
        expectedResult = service.addEmployeeMySuffixToCollectionIfMissing([], null, employee, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(employee);
      });

      it('should return initial array if no EmployeeMySuffix is added', () => {
        const employeeCollection: IEmployeeMySuffix[] = [{ id: 123 }];
        expectedResult = service.addEmployeeMySuffixToCollectionIfMissing(employeeCollection, undefined, null);
        expect(expectedResult).toEqual(employeeCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
