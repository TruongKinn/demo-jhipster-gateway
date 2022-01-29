import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EmployeeMySuffixService } from '../service/employee-my-suffix.service';
import { IEmployeeMySuffix, EmployeeMySuffix } from '../employee-my-suffix.model';
import { IDepartmentMySuffix } from 'app/entities/department-my-suffix/department-my-suffix.model';
import { DepartmentMySuffixService } from 'app/entities/department-my-suffix/service/department-my-suffix.service';

import { EmployeeMySuffixUpdateComponent } from './employee-my-suffix-update.component';

describe('EmployeeMySuffix Management Update Component', () => {
  let comp: EmployeeMySuffixUpdateComponent;
  let fixture: ComponentFixture<EmployeeMySuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let employeeService: EmployeeMySuffixService;
  let departmentService: DepartmentMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EmployeeMySuffixUpdateComponent],
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
      .overrideTemplate(EmployeeMySuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmployeeMySuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    employeeService = TestBed.inject(EmployeeMySuffixService);
    departmentService = TestBed.inject(DepartmentMySuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call EmployeeMySuffix query and add missing value', () => {
      const employee: IEmployeeMySuffix = { id: 456 };
      const manager: IEmployeeMySuffix = { id: 4374 };
      employee.manager = manager;

      const employeeCollection: IEmployeeMySuffix[] = [{ id: 10177 }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const additionalEmployeeMySuffixes = [manager];
      const expectedCollection: IEmployeeMySuffix[] = [...additionalEmployeeMySuffixes, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeMySuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ employee });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeMySuffixToCollectionIfMissing).toHaveBeenCalledWith(
        employeeCollection,
        ...additionalEmployeeMySuffixes
      );
      expect(comp.employeesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DepartmentMySuffix query and add missing value', () => {
      const employee: IEmployeeMySuffix = { id: 456 };
      const department: IDepartmentMySuffix = { id: 35363 };
      employee.department = department;

      const departmentCollection: IDepartmentMySuffix[] = [{ id: 78278 }];
      jest.spyOn(departmentService, 'query').mockReturnValue(of(new HttpResponse({ body: departmentCollection })));
      const additionalDepartmentMySuffixes = [department];
      const expectedCollection: IDepartmentMySuffix[] = [...additionalDepartmentMySuffixes, ...departmentCollection];
      jest.spyOn(departmentService, 'addDepartmentMySuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ employee });
      comp.ngOnInit();

      expect(departmentService.query).toHaveBeenCalled();
      expect(departmentService.addDepartmentMySuffixToCollectionIfMissing).toHaveBeenCalledWith(
        departmentCollection,
        ...additionalDepartmentMySuffixes
      );
      expect(comp.departmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const employee: IEmployeeMySuffix = { id: 456 };
      const manager: IEmployeeMySuffix = { id: 79320 };
      employee.manager = manager;
      const department: IDepartmentMySuffix = { id: 60127 };
      employee.department = department;

      activatedRoute.data = of({ employee });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(employee));
      expect(comp.employeesSharedCollection).toContain(manager);
      expect(comp.departmentsSharedCollection).toContain(department);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EmployeeMySuffix>>();
      const employee = { id: 123 };
      jest.spyOn(employeeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employee });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employee }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(employeeService.update).toHaveBeenCalledWith(employee);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EmployeeMySuffix>>();
      const employee = new EmployeeMySuffix();
      jest.spyOn(employeeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employee });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employee }));
      saveSubject.complete();

      // THEN
      expect(employeeService.create).toHaveBeenCalledWith(employee);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EmployeeMySuffix>>();
      const employee = { id: 123 };
      jest.spyOn(employeeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employee });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(employeeService.update).toHaveBeenCalledWith(employee);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackEmployeeMySuffixById', () => {
      it('Should return tracked EmployeeMySuffix primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEmployeeMySuffixById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackDepartmentMySuffixById', () => {
      it('Should return tracked DepartmentMySuffix primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDepartmentMySuffixById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
