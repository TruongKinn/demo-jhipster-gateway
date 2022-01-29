import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DepartmentMySuffixService } from '../service/department-my-suffix.service';

import { DepartmentMySuffixComponent } from './department-my-suffix.component';

describe('DepartmentMySuffix Management Component', () => {
  let comp: DepartmentMySuffixComponent;
  let fixture: ComponentFixture<DepartmentMySuffixComponent>;
  let service: DepartmentMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DepartmentMySuffixComponent],
    })
      .overrideTemplate(DepartmentMySuffixComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DepartmentMySuffixComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DepartmentMySuffixService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.departments?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
