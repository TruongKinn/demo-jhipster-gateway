import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IJobMySuffix, JobMySuffix } from '../job-my-suffix.model';

import { JobMySuffixService } from './job-my-suffix.service';

describe('JobMySuffix Service', () => {
  let service: JobMySuffixService;
  let httpMock: HttpTestingController;
  let elemDefault: IJobMySuffix;
  let expectedResult: IJobMySuffix | IJobMySuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(JobMySuffixService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      jobTitle: 'AAAAAAA',
      minSalary: 0,
      maxSalary: 0,
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

    it('should create a JobMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new JobMySuffix()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a JobMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          jobTitle: 'BBBBBB',
          minSalary: 1,
          maxSalary: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a JobMySuffix', () => {
      const patchObject = Object.assign(
        {
          jobTitle: 'BBBBBB',
          maxSalary: 1,
        },
        new JobMySuffix()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of JobMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          jobTitle: 'BBBBBB',
          minSalary: 1,
          maxSalary: 1,
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

    it('should delete a JobMySuffix', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addJobMySuffixToCollectionIfMissing', () => {
      it('should add a JobMySuffix to an empty array', () => {
        const job: IJobMySuffix = { id: 123 };
        expectedResult = service.addJobMySuffixToCollectionIfMissing([], job);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(job);
      });

      it('should not add a JobMySuffix to an array that contains it', () => {
        const job: IJobMySuffix = { id: 123 };
        const jobCollection: IJobMySuffix[] = [
          {
            ...job,
          },
          { id: 456 },
        ];
        expectedResult = service.addJobMySuffixToCollectionIfMissing(jobCollection, job);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a JobMySuffix to an array that doesn't contain it", () => {
        const job: IJobMySuffix = { id: 123 };
        const jobCollection: IJobMySuffix[] = [{ id: 456 }];
        expectedResult = service.addJobMySuffixToCollectionIfMissing(jobCollection, job);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(job);
      });

      it('should add only unique JobMySuffix to an array', () => {
        const jobArray: IJobMySuffix[] = [{ id: 123 }, { id: 456 }, { id: 68934 }];
        const jobCollection: IJobMySuffix[] = [{ id: 123 }];
        expectedResult = service.addJobMySuffixToCollectionIfMissing(jobCollection, ...jobArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const job: IJobMySuffix = { id: 123 };
        const job2: IJobMySuffix = { id: 456 };
        expectedResult = service.addJobMySuffixToCollectionIfMissing([], job, job2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(job);
        expect(expectedResult).toContain(job2);
      });

      it('should accept null and undefined values', () => {
        const job: IJobMySuffix = { id: 123 };
        expectedResult = service.addJobMySuffixToCollectionIfMissing([], null, job, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(job);
      });

      it('should return initial array if no JobMySuffix is added', () => {
        const jobCollection: IJobMySuffix[] = [{ id: 123 }];
        expectedResult = service.addJobMySuffixToCollectionIfMissing(jobCollection, undefined, null);
        expect(expectedResult).toEqual(jobCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
