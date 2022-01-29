import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TaskMySuffixDetailComponent } from './task-my-suffix-detail.component';

describe('TaskMySuffix Management Detail Component', () => {
  let comp: TaskMySuffixDetailComponent;
  let fixture: ComponentFixture<TaskMySuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskMySuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ task: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TaskMySuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TaskMySuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load task on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.task).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
