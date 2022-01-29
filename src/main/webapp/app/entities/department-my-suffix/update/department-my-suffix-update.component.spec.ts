import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DepartmentMySuffixService } from '../service/department-my-suffix.service';
import { IDepartmentMySuffix, DepartmentMySuffix } from '../department-my-suffix.model';
import { ILocationMySuffix } from 'app/entities/location-my-suffix/location-my-suffix.model';
import { LocationMySuffixService } from 'app/entities/location-my-suffix/service/location-my-suffix.service';

import { DepartmentMySuffixUpdateComponent } from './department-my-suffix-update.component';

describe('DepartmentMySuffix Management Update Component', () => {
  let comp: DepartmentMySuffixUpdateComponent;
  let fixture: ComponentFixture<DepartmentMySuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let departmentService: DepartmentMySuffixService;
  let locationService: LocationMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DepartmentMySuffixUpdateComponent],
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
      .overrideTemplate(DepartmentMySuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DepartmentMySuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    departmentService = TestBed.inject(DepartmentMySuffixService);
    locationService = TestBed.inject(LocationMySuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call location query and add missing value', () => {
      const department: IDepartmentMySuffix = { id: 456 };
      const location: ILocationMySuffix = { id: 16862 };
      department.location = location;

      const locationCollection: ILocationMySuffix[] = [{ id: 88431 }];
      jest.spyOn(locationService, 'query').mockReturnValue(of(new HttpResponse({ body: locationCollection })));
      const expectedCollection: ILocationMySuffix[] = [location, ...locationCollection];
      jest.spyOn(locationService, 'addLocationMySuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ department });
      comp.ngOnInit();

      expect(locationService.query).toHaveBeenCalled();
      expect(locationService.addLocationMySuffixToCollectionIfMissing).toHaveBeenCalledWith(locationCollection, location);
      expect(comp.locationsCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const department: IDepartmentMySuffix = { id: 456 };
      const location: ILocationMySuffix = { id: 56466 };
      department.location = location;

      activatedRoute.data = of({ department });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(department));
      expect(comp.locationsCollection).toContain(location);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DepartmentMySuffix>>();
      const department = { id: 123 };
      jest.spyOn(departmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ department });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: department }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(departmentService.update).toHaveBeenCalledWith(department);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DepartmentMySuffix>>();
      const department = new DepartmentMySuffix();
      jest.spyOn(departmentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ department });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: department }));
      saveSubject.complete();

      // THEN
      expect(departmentService.create).toHaveBeenCalledWith(department);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DepartmentMySuffix>>();
      const department = { id: 123 };
      jest.spyOn(departmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ department });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(departmentService.update).toHaveBeenCalledWith(department);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackLocationMySuffixById', () => {
      it('Should return tracked LocationMySuffix primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackLocationMySuffixById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
