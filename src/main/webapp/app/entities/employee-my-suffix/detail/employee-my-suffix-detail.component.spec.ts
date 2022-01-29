import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EmployeeMySuffixDetailComponent } from './employee-my-suffix-detail.component';

describe('EmployeeMySuffix Management Detail Component', () => {
  let comp: EmployeeMySuffixDetailComponent;
  let fixture: ComponentFixture<EmployeeMySuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeMySuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ employee: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EmployeeMySuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EmployeeMySuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load employee on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.employee).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
