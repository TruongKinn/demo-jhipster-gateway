import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RegionMySuffixDetailComponent } from './region-my-suffix-detail.component';

describe('RegionMySuffix Management Detail Component', () => {
  let comp: RegionMySuffixDetailComponent;
  let fixture: ComponentFixture<RegionMySuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegionMySuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ region: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RegionMySuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RegionMySuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load region on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.region).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
