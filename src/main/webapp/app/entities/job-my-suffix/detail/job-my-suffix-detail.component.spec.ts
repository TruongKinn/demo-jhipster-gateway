import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobMySuffixDetailComponent } from './job-my-suffix-detail.component';

describe('JobMySuffix Management Detail Component', () => {
  let comp: JobMySuffixDetailComponent;
  let fixture: ComponentFixture<JobMySuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobMySuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ job: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(JobMySuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(JobMySuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load job on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.job).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
