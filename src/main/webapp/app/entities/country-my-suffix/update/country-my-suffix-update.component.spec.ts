import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CountryMySuffixService } from '../service/country-my-suffix.service';
import { ICountryMySuffix, CountryMySuffix } from '../country-my-suffix.model';
import { IRegionMySuffix } from 'app/entities/region-my-suffix/region-my-suffix.model';
import { RegionMySuffixService } from 'app/entities/region-my-suffix/service/region-my-suffix.service';

import { CountryMySuffixUpdateComponent } from './country-my-suffix-update.component';

describe('CountryMySuffix Management Update Component', () => {
  let comp: CountryMySuffixUpdateComponent;
  let fixture: ComponentFixture<CountryMySuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let countryService: CountryMySuffixService;
  let regionService: RegionMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CountryMySuffixUpdateComponent],
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
      .overrideTemplate(CountryMySuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CountryMySuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    countryService = TestBed.inject(CountryMySuffixService);
    regionService = TestBed.inject(RegionMySuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call region query and add missing value', () => {
      const country: ICountryMySuffix = { id: 456 };
      const region: IRegionMySuffix = { id: 80617 };
      country.region = region;

      const regionCollection: IRegionMySuffix[] = [{ id: 61002 }];
      jest.spyOn(regionService, 'query').mockReturnValue(of(new HttpResponse({ body: regionCollection })));
      const expectedCollection: IRegionMySuffix[] = [region, ...regionCollection];
      jest.spyOn(regionService, 'addRegionMySuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ country });
      comp.ngOnInit();

      expect(regionService.query).toHaveBeenCalled();
      expect(regionService.addRegionMySuffixToCollectionIfMissing).toHaveBeenCalledWith(regionCollection, region);
      expect(comp.regionsCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const country: ICountryMySuffix = { id: 456 };
      const region: IRegionMySuffix = { id: 67940 };
      country.region = region;

      activatedRoute.data = of({ country });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(country));
      expect(comp.regionsCollection).toContain(region);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<CountryMySuffix>>();
      const country = { id: 123 };
      jest.spyOn(countryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ country });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: country }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(countryService.update).toHaveBeenCalledWith(country);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<CountryMySuffix>>();
      const country = new CountryMySuffix();
      jest.spyOn(countryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ country });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: country }));
      saveSubject.complete();

      // THEN
      expect(countryService.create).toHaveBeenCalledWith(country);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<CountryMySuffix>>();
      const country = { id: 123 };
      jest.spyOn(countryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ country });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(countryService.update).toHaveBeenCalledWith(country);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackRegionMySuffixById', () => {
      it('Should return tracked RegionMySuffix primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackRegionMySuffixById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
