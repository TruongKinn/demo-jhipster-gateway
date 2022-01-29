import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployeeMySuffix } from '../employee-my-suffix.model';

@Component({
  selector: 'jhi-employee-my-suffix-detail',
  templateUrl: './employee-my-suffix-detail.component.html',
})
export class EmployeeMySuffixDetailComponent implements OnInit {
  employee: IEmployeeMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employee }) => {
      this.employee = employee;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
