import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDepartmentMySuffix } from '../department-my-suffix.model';

@Component({
  selector: 'jhi-department-my-suffix-detail',
  templateUrl: './department-my-suffix-detail.component.html',
})
export class DepartmentMySuffixDetailComponent implements OnInit {
  department: IDepartmentMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.department = department;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
