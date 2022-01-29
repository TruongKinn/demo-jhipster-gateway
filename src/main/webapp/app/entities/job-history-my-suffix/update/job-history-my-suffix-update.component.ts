import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IJobHistoryMySuffix, JobHistoryMySuffix } from '../job-history-my-suffix.model';
import { JobHistoryMySuffixService } from '../service/job-history-my-suffix.service';
import { IJobMySuffix } from 'app/entities/job-my-suffix/job-my-suffix.model';
import { JobMySuffixService } from 'app/entities/job-my-suffix/service/job-my-suffix.service';
import { IDepartmentMySuffix } from 'app/entities/department-my-suffix/department-my-suffix.model';
import { DepartmentMySuffixService } from 'app/entities/department-my-suffix/service/department-my-suffix.service';
import { IEmployeeMySuffix } from 'app/entities/employee-my-suffix/employee-my-suffix.model';
import { EmployeeMySuffixService } from 'app/entities/employee-my-suffix/service/employee-my-suffix.service';
import { Language } from 'app/entities/enumerations/language.model';

@Component({
  selector: 'jhi-job-history-my-suffix-update',
  templateUrl: './job-history-my-suffix-update.component.html',
})
export class JobHistoryMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  languageValues = Object.keys(Language);

  jobsCollection: IJobMySuffix[] = [];
  departmentsCollection: IDepartmentMySuffix[] = [];
  employeesCollection: IEmployeeMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    startDate: [],
    endDate: [],
    language: [],
    job: [],
    department: [],
    employee: [],
  });

  constructor(
    protected jobHistoryService: JobHistoryMySuffixService,
    protected jobService: JobMySuffixService,
    protected departmentService: DepartmentMySuffixService,
    protected employeeService: EmployeeMySuffixService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobHistory }) => {
      if (jobHistory.id === undefined) {
        const today = dayjs().startOf('day');
        jobHistory.startDate = today;
        jobHistory.endDate = today;
      }

      this.updateForm(jobHistory);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const jobHistory = this.createFromForm();
    if (jobHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.jobHistoryService.update(jobHistory));
    } else {
      this.subscribeToSaveResponse(this.jobHistoryService.create(jobHistory));
    }
  }

  trackJobMySuffixById(index: number, item: IJobMySuffix): number {
    return item.id!;
  }

  trackDepartmentMySuffixById(index: number, item: IDepartmentMySuffix): number {
    return item.id!;
  }

  trackEmployeeMySuffixById(index: number, item: IEmployeeMySuffix): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobHistoryMySuffix>>): void {
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

  protected updateForm(jobHistory: IJobHistoryMySuffix): void {
    this.editForm.patchValue({
      id: jobHistory.id,
      startDate: jobHistory.startDate ? jobHistory.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: jobHistory.endDate ? jobHistory.endDate.format(DATE_TIME_FORMAT) : null,
      language: jobHistory.language,
      job: jobHistory.job,
      department: jobHistory.department,
      employee: jobHistory.employee,
    });

    this.jobsCollection = this.jobService.addJobMySuffixToCollectionIfMissing(this.jobsCollection, jobHistory.job);
    this.departmentsCollection = this.departmentService.addDepartmentMySuffixToCollectionIfMissing(
      this.departmentsCollection,
      jobHistory.department
    );
    this.employeesCollection = this.employeeService.addEmployeeMySuffixToCollectionIfMissing(this.employeesCollection, jobHistory.employee);
  }

  protected loadRelationshipsOptions(): void {
    this.jobService
      .query({ filter: 'jobhistory-is-null' })
      .pipe(map((res: HttpResponse<IJobMySuffix[]>) => res.body ?? []))
      .pipe(map((jobs: IJobMySuffix[]) => this.jobService.addJobMySuffixToCollectionIfMissing(jobs, this.editForm.get('job')!.value)))
      .subscribe((jobs: IJobMySuffix[]) => (this.jobsCollection = jobs));

    this.departmentService
      .query({ filter: 'jobhistory-is-null' })
      .pipe(map((res: HttpResponse<IDepartmentMySuffix[]>) => res.body ?? []))
      .pipe(
        map((departments: IDepartmentMySuffix[]) =>
          this.departmentService.addDepartmentMySuffixToCollectionIfMissing(departments, this.editForm.get('department')!.value)
        )
      )
      .subscribe((departments: IDepartmentMySuffix[]) => (this.departmentsCollection = departments));

    this.employeeService
      .query({ filter: 'jobhistory-is-null' })
      .pipe(map((res: HttpResponse<IEmployeeMySuffix[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployeeMySuffix[]) =>
          this.employeeService.addEmployeeMySuffixToCollectionIfMissing(employees, this.editForm.get('employee')!.value)
        )
      )
      .subscribe((employees: IEmployeeMySuffix[]) => (this.employeesCollection = employees));
  }

  protected createFromForm(): IJobHistoryMySuffix {
    return {
      ...new JobHistoryMySuffix(),
      id: this.editForm.get(['id'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? dayjs(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? dayjs(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      language: this.editForm.get(['language'])!.value,
      job: this.editForm.get(['job'])!.value,
      department: this.editForm.get(['department'])!.value,
      employee: this.editForm.get(['employee'])!.value,
    };
  }
}
