import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RegionMySuffixService } from '../service/region-my-suffix.service';
import { IRegionMySuffix, RegionMySuffix } from '../region-my-suffix.model';

import { RegionMySuffixUpdateComponent } from './region-my-suffix-update.component';

describe('RegionMySuffix Management Update Component', () => {
  let comp: RegionMySuffixUpdateComponent;
  let fixture: ComponentFixture<RegionMySuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let regionService: RegionMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RegionMySuffixUpdateComponent],
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
      .overrideTemplate(RegionMySuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RegionMySuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    regionService = TestBed.inject(RegionMySuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const region: IRegionMySuffix = { id: 456 };

      activatedRoute.data = of({ region });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(region));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RegionMySuffix>>();
      const region = { id: 123 };
      jest.spyOn(regionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ region });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: region }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(regionService.update).toHaveBeenCalledWith(region);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RegionMySuffix>>();
      const region = new RegionMySuffix();
      jest.spyOn(regionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ region });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: region }));
      saveSubject.complete();

      // THEN
      expect(regionService.create).toHaveBeenCalledWith(region);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RegionMySuffix>>();
      const region = { id: 123 };
      jest.spyOn(regionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ region });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(regionService.update).toHaveBeenCalledWith(region);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
