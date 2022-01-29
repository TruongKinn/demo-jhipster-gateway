import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { JobMySuffixService } from '../service/job-my-suffix.service';
import { IJobMySuffix, JobMySuffix } from '../job-my-suffix.model';
import { ITaskMySuffix } from 'app/entities/task-my-suffix/task-my-suffix.model';
import { TaskMySuffixService } from 'app/entities/task-my-suffix/service/task-my-suffix.service';
import { IEmployeeMySuffix } from 'app/entities/employee-my-suffix/employee-my-suffix.model';
import { EmployeeMySuffixService } from 'app/entities/employee-my-suffix/service/employee-my-suffix.service';

import { JobMySuffixUpdateComponent } from './job-my-suffix-update.component';

describe('JobMySuffix Management Update Component', () => {
  let comp: JobMySuffixUpdateComponent;
  let fixture: ComponentFixture<JobMySuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let jobService: JobMySuffixService;
  let taskService: TaskMySuffixService;
  let employeeService: EmployeeMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [JobMySuffixUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(JobMySuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(JobMySuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    jobService = TestBed.inject(JobMySuffixService);
    taskService = TestBed.inject(TaskMySuffixService);
    employeeService = TestBed.inject(EmployeeMySuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TaskMySuffix query and add missing value', () => {
      const job: IJobMySuffix = { id: 456 };
      const tasks: ITaskMySuffix[] = [{ id: 92497 }];
      job.tasks = tasks;

      const taskCollection: ITaskMySuffix[] = [{ id: 18447 }];
      jest.spyOn(taskService, 'query').mockReturnValue(of(new HttpResponse({ body: taskCollection })));
      const additionalTaskMySuffixes = [...tasks];
      const expectedCollection: ITaskMySuffix[] = [...additionalTaskMySuffixes, ...taskCollection];
      jest.spyOn(taskService, 'addTaskMySuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ job });
      comp.ngOnInit();

      expect(taskService.query).toHaveBeenCalled();
      expect(taskService.addTaskMySuffixToCollectionIfMissing).toHaveBeenCalledWith(taskCollection, ...additionalTaskMySuffixes);
      expect(comp.tasksSharedCollection).toEqual(expectedCollection);
    });

    it('Should call EmployeeMySuffix query and add missing value', () => {
      const job: IJobMySuffix = { id: 456 };
      const employee: IEmployeeMySuffix = { id: 75146 };
      job.employee = employee;

      const employeeCollection: IEmployeeMySuffix[] = [{ id: 78248 }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const additionalEmployeeMySuffixes = [employee];
      const expectedCollection: IEmployeeMySuffix[] = [...additionalEmployeeMySuffixes, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeMySuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ job });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeMySuffixToCollectionIfMissing).toHaveBeenCalledWith(
        employeeCollection,
        ...additionalEmployeeMySuffixes
      );
      expect(comp.employeesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const job: IJobMySuffix = { id: 456 };
      const tasks: ITaskMySuffix = { id: 88679 };
      job.tasks = [tasks];
      const employee: IEmployeeMySuffix = { id: 21743 };
      job.employee = employee;

      activatedRoute.data = of({ job });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(job));
      expect(comp.tasksSharedCollection).toContain(tasks);
      expect(comp.employeesSharedCollection).toContain(employee);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<JobMySuffix>>();
      const job = { id: 123 };
      jest.spyOn(jobService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ job });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: job }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(jobService.update).toHaveBeenCalledWith(job);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<JobMySuffix>>();
      const job = new JobMySuffix();
      jest.spyOn(jobService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ job });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: job }));
      saveSubject.complete();

      // THEN
      expect(jobService.create).toHaveBeenCalledWith(job);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<JobMySuffix>>();
      const job = { id: 123 };
      jest.spyOn(jobService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ job });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(jobService.update).toHaveBeenCalledWith(job);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackTaskMySuffixById', () => {
      it('Should return tracked TaskMySuffix primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackTaskMySuffixById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackEmployeeMySuffixById', () => {
      it('Should return tracked EmployeeMySuffix primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEmployeeMySuffixById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedTaskMySuffix', () => {
      it('Should return option if no TaskMySuffix is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedTaskMySuffix(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected TaskMySuffix for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedTaskMySuffix(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this TaskMySuffix is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedTaskMySuffix(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
