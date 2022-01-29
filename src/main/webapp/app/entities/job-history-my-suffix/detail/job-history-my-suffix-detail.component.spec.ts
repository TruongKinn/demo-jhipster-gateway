import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobHistoryMySuffixDetailComponent } from './job-history-my-suffix-detail.component';

describe('JobHistoryMySuffix Management Detail Component', () => {
  let comp: JobHistoryMySuffixDetailComponent;
  let fixture: ComponentFixture<JobHistoryMySuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobHistoryMySuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ jobHistory: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(JobHistoryMySuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(JobHistoryMySuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load jobHistory on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.jobHistory).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
