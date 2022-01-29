import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { LocationMySuffixService } from '../service/location-my-suffix.service';

import { LocationMySuffixComponent } from './location-my-suffix.component';

describe('LocationMySuffix Management Component', () => {
  let comp: LocationMySuffixComponent;
  let fixture: ComponentFixture<LocationMySuffixComponent>;
  let service: LocationMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LocationMySuffixComponent],
    })
      .overrideTemplate(LocationMySuffixComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LocationMySuffixComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(LocationMySuffixService);

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
    expect(comp.locations?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
