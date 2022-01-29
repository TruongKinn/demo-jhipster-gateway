import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LocationMySuffixDetailComponent } from './location-my-suffix-detail.component';

describe('LocationMySuffix Management Detail Component', () => {
  let comp: LocationMySuffixDetailComponent;
  let fixture: ComponentFixture<LocationMySuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationMySuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ location: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(LocationMySuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(LocationMySuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load location on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.location).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
