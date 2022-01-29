import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITaskMySuffix, TaskMySuffix } from '../task-my-suffix.model';

import { TaskMySuffixService } from './task-my-suffix.service';

describe('TaskMySuffix Service', () => {
  let service: TaskMySuffixService;
  let httpMock: HttpTestingController;
  let elemDefault: ITaskMySuffix;
  let expectedResult: ITaskMySuffix | ITaskMySuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TaskMySuffixService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      title: 'AAAAAAA',
      description: 'AAAAAAA',
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

    it('should create a TaskMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TaskMySuffix()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TaskMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          title: 'BBBBBB',
          description: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TaskMySuffix', () => {
      const patchObject = Object.assign({}, new TaskMySuffix());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TaskMySuffix', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          title: 'BBBBBB',
          description: 'BBBBBB',
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

    it('should delete a TaskMySuffix', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTaskMySuffixToCollectionIfMissing', () => {
      it('should add a TaskMySuffix to an empty array', () => {
        const task: ITaskMySuffix = { id: 123 };
        expectedResult = service.addTaskMySuffixToCollectionIfMissing([], task);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(task);
      });

      it('should not add a TaskMySuffix to an array that contains it', () => {
        const task: ITaskMySuffix = { id: 123 };
        const taskCollection: ITaskMySuffix[] = [
          {
            ...task,
          },
          { id: 456 },
        ];
        expectedResult = service.addTaskMySuffixToCollectionIfMissing(taskCollection, task);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TaskMySuffix to an array that doesn't contain it", () => {
        const task: ITaskMySuffix = { id: 123 };
        const taskCollection: ITaskMySuffix[] = [{ id: 456 }];
        expectedResult = service.addTaskMySuffixToCollectionIfMissing(taskCollection, task);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(task);
      });

      it('should add only unique TaskMySuffix to an array', () => {
        const taskArray: ITaskMySuffix[] = [{ id: 123 }, { id: 456 }, { id: 90209 }];
        const taskCollection: ITaskMySuffix[] = [{ id: 123 }];
        expectedResult = service.addTaskMySuffixToCollectionIfMissing(taskCollection, ...taskArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const task: ITaskMySuffix = { id: 123 };
        const task2: ITaskMySuffix = { id: 456 };
        expectedResult = service.addTaskMySuffixToCollectionIfMissing([], task, task2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(task);
        expect(expectedResult).toContain(task2);
      });

      it('should accept null and undefined values', () => {
        const task: ITaskMySuffix = { id: 123 };
        expectedResult = service.addTaskMySuffixToCollectionIfMissing([], null, task, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(task);
      });

      it('should return initial array if no TaskMySuffix is added', () => {
        const taskCollection: ITaskMySuffix[] = [{ id: 123 }];
        expectedResult = service.addTaskMySuffixToCollectionIfMissing(taskCollection, undefined, null);
        expect(expectedResult).toEqual(taskCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
