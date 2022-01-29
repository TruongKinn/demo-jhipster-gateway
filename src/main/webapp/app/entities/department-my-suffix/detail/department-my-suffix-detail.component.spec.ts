import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DepartmentMySuffixDetailComponent } from './department-my-suffix-detail.component';

describe('DepartmentMySuffix Management Detail Component', () => {
  let comp: DepartmentMySuffixDetailComponent;
  let fixture: ComponentFixture<DepartmentMySuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentMySuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ department: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DepartmentMySuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DepartmentMySuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load department on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.department).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
