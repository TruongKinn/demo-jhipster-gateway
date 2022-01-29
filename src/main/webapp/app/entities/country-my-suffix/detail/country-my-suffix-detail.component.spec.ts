import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CountryMySuffixDetailComponent } from './country-my-suffix-detail.component';

describe('CountryMySuffix Management Detail Component', () => {
  let comp: CountryMySuffixDetailComponent;
  let fixture: ComponentFixture<CountryMySuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryMySuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ country: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CountryMySuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CountryMySuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load country on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.country).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
