import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDepartmentMySuffix, DepartmentMySuffix } from '../department-my-suffix.model';

import { DepartmentMySuffixService } from './department-my-suffix.service';

describe('DepartmentMySuffix Service', () => {
  let service: DepartmentMySuffixService;
  let httpMock: HttpTestingController;
  let elemDefault: IDepartmentMySuffix;
  let expectedResult: IDepartmentMySuffix | IDepartmentMySuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DepartmentMySuffixService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      departmentName: 'AAAAAAA',
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

    it('should create a DepartmentMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new DepartmentMySuffix()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DepartmentMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          departmentName: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DepartmentMySuffix', () => {
      const patchObject = Object.assign({}, new DepartmentMySuffix());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DepartmentMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          departmentName: 'BBBBBB',
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

    it('should delete a DepartmentMySuffix', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDepartmentMySuffixToCollectionIfMissing', () => {
      it('should add a DepartmentMySuffix to an empty array', () => {
        const department: IDepartmentMySuffix = { id: 123 };
        expectedResult = service.addDepartmentMySuffixToCollectionIfMissing([], department);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(department);
      });

      it('should not add a DepartmentMySuffix to an array that contains it', () => {
        const department: IDepartmentMySuffix = { id: 123 };
        const departmentCollection: IDepartmentMySuffix[] = [
          {
            ...department,
          },
          { id: 456 },
        ];
        expectedResult = service.addDepartmentMySuffixToCollectionIfMissing(departmentCollection, department);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DepartmentMySuffix to an array that doesn't contain it", () => {
        const department: IDepartmentMySuffix = { id: 123 };
        const departmentCollection: IDepartmentMySuffix[] = [{ id: 456 }];
        expectedResult = service.addDepartmentMySuffixToCollectionIfMissing(departmentCollection, department);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(department);
      });

      it('should add only unique DepartmentMySuffix to an array', () => {
        const departmentArray: IDepartmentMySuffix[] = [{ id: 123 }, { id: 456 }, { id: 6882 }];
        const departmentCollection: IDepartmentMySuffix[] = [{ id: 123 }];
        expectedResult = service.addDepartmentMySuffixToCollectionIfMissing(departmentCollection, ...departmentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const department: IDepartmentMySuffix = { id: 123 };
        const department2: IDepartmentMySuffix = { id: 456 };
        expectedResult = service.addDepartmentMySuffixToCollectionIfMissing([], department, department2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(department);
        expect(expectedResult).toContain(department2);
      });

      it('should accept null and undefined values', () => {
        const department: IDepartmentMySuffix = { id: 123 };
        expectedResult = service.addDepartmentMySuffixToCollectionIfMissing([], null, department, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(department);
      });

      it('should return initial array if no DepartmentMySuffix is added', () => {
        const departmentCollection: IDepartmentMySuffix[] = [{ id: 123 }];
        expectedResult = service.addDepartmentMySuffixToCollectionIfMissing(departmentCollection, undefined, null);
        expect(expectedResult).toEqual(departmentCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
