import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IEmployeeMySuffix, EmployeeMySuffix } from '../employee-my-suffix.model';
import { EmployeeMySuffixService } from '../service/employee-my-suffix.service';
import { IDepartmentMySuffix } from 'app/entities/department-my-suffix/department-my-suffix.model';
import { DepartmentMySuffixService } from 'app/entities/department-my-suffix/service/department-my-suffix.service';

@Component({
  selector: 'jhi-employee-my-suffix-update',
  templateUrl: './employee-my-suffix-update.component.html',
})
export class EmployeeMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  employeesSharedCollection: IEmployeeMySuffix[] = [];
  departmentsSharedCollection: IDepartmentMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    email: [],
    phoneNumber: [],
    hireDate: [],
    salary: [],
    commissionPct: [],
    manager: [],
    department: [],
  });

  constructor(
    protected employeeService: EmployeeMySuffixService,
    protected departmentService: DepartmentMySuffixService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employee }) => {
      if (employee.id === undefined) {
        const today = dayjs().startOf('day');
        employee.hireDate = today;
      }

      this.updateForm(employee);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employee = this.createFromForm();
    if (employee.id !== undefined) {
      this.subscribeToSaveResponse(this.employeeService.update(employee));
    } else {
      this.subscribeToSaveResponse(this.employeeService.create(employee));
    }
  }

  trackEmployeeMySuffixById(index: number, item: IEmployeeMySuffix): number {
    return item.id!;
  }

  trackDepartmentMySuffixById(index: number, item: IDepartmentMySuffix): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeMySuffix>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(employee: IEmployeeMySuffix): void {
    this.editForm.patchValue({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      hireDate: employee.hireDate ? employee.hireDate.format(DATE_TIME_FORMAT) : null,
      salary: employee.salary,
      commissionPct: employee.commissionPct,
      manager: employee.manager,
      department: employee.department,
    });

    this.employeesSharedCollection = this.employeeService.addEmployeeMySuffixToCollectionIfMissing(
      this.employeesSharedCollection,
      employee.manager
    );
    this.departmentsSharedCollection = this.departmentService.addDepartmentMySuffixToCollectionIfMissing(
      this.departmentsSharedCollection,
      employee.department
    );
  }

  protected loadRelationshipsOptions(): void {
    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployeeMySuffix[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployeeMySuffix[]) =>
          this.employeeService.addEmployeeMySuffixToCollectionIfMissing(employees, this.editForm.get('manager')!.value)
        )
      )
      .subscribe((employees: IEmployeeMySuffix[]) => (this.employeesSharedCollection = employees));

    this.departmentService
      .query()
      .pipe(map((res: HttpResponse<IDepartmentMySuffix[]>) => res.body ?? []))
      .pipe(
        map((departments: IDepartmentMySuffix[]) =>
          this.departmentService.addDepartmentMySuffixToCollectionIfMissing(departments, this.editForm.get('department')!.value)
        )
      )
      .subscribe((departments: IDepartmentMySuffix[]) => (this.departmentsSharedCollection = departments));
  }

  protected createFromForm(): IEmployeeMySuffix {
    return {
      ...new EmployeeMySuffix(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      hireDate: this.editForm.get(['hireDate'])!.value ? dayjs(this.editForm.get(['hireDate'])!.value, DATE_TIME_FORMAT) : undefined,
      salary: this.editForm.get(['salary'])!.value,
      commissionPct: this.editForm.get(['commissionPct'])!.value,
      manager: this.editForm.get(['manager'])!.value,
      department: this.editForm.get(['department'])!.value,
    };
  }
}
