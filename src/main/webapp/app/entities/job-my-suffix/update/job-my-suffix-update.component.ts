import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IJobMySuffix, JobMySuffix } from '../job-my-suffix.model';
import { JobMySuffixService } from '../service/job-my-suffix.service';
import { ITaskMySuffix } from 'app/entities/task-my-suffix/task-my-suffix.model';
import { TaskMySuffixService } from 'app/entities/task-my-suffix/service/task-my-suffix.service';
import { IEmployeeMySuffix } from 'app/entities/employee-my-suffix/employee-my-suffix.model';
import { EmployeeMySuffixService } from 'app/entities/employee-my-suffix/service/employee-my-suffix.service';

@Component({
  selector: 'jhi-job-my-suffix-update',
  templateUrl: './job-my-suffix-update.component.html',
})
export class JobMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  tasksSharedCollection: ITaskMySuffix[] = [];
  employeesSharedCollection: IEmployeeMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    jobTitle: [],
    minSalary: [],
    maxSalary: [],
    tasks: [],
    employee: [],
  });

  constructor(
    protected jobService: JobMySuffixService,
    protected taskService: TaskMySuffixService,
    protected employeeService: EmployeeMySuffixService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ job }) => {
      this.updateForm(job);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const job = this.createFromForm();
    if (job.id !== undefined) {
      this.subscribeToSaveResponse(this.jobService.update(job));
    } else {
      this.subscribeToSaveResponse(this.jobService.create(job));
    }
  }

  trackTaskMySuffixById(index: number, item: ITaskMySuffix): number {
    return item.id!;
  }

  trackEmployeeMySuffixById(index: number, item: IEmployeeMySuffix): number {
    return item.id!;
  }

  getSelectedTaskMySuffix(option: ITaskMySuffix, selectedVals?: ITaskMySuffix[]): ITaskMySuffix {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobMySuffix>>): void {
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

  protected updateForm(job: IJobMySuffix): void {
    this.editForm.patchValue({
      id: job.id,
      jobTitle: job.jobTitle,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
      tasks: job.tasks,
      employee: job.employee,
    });

    this.tasksSharedCollection = this.taskService.addTaskMySuffixToCollectionIfMissing(this.tasksSharedCollection, ...(job.tasks ?? []));
    this.employeesSharedCollection = this.employeeService.addEmployeeMySuffixToCollectionIfMissing(
      this.employeesSharedCollection,
      job.employee
    );
  }

  protected loadRelationshipsOptions(): void {
    this.taskService
      .query()
      .pipe(map((res: HttpResponse<ITaskMySuffix[]>) => res.body ?? []))
      .pipe(
        map((tasks: ITaskMySuffix[]) =>
          this.taskService.addTaskMySuffixToCollectionIfMissing(tasks, ...(this.editForm.get('tasks')!.value ?? []))
        )
      )
      .subscribe((tasks: ITaskMySuffix[]) => (this.tasksSharedCollection = tasks));

    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployeeMySuffix[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployeeMySuffix[]) =>
          this.employeeService.addEmployeeMySuffixToCollectionIfMissing(employees, this.editForm.get('employee')!.value)
        )
      )
      .subscribe((employees: IEmployeeMySuffix[]) => (this.employeesSharedCollection = employees));
  }

  protected createFromForm(): IJobMySuffix {
    return {
      ...new JobMySuffix(),
      id: this.editForm.get(['id'])!.value,
      jobTitle: this.editForm.get(['jobTitle'])!.value,
      minSalary: this.editForm.get(['minSalary'])!.value,
      maxSalary: this.editForm.get(['maxSalary'])!.value,
      tasks: this.editForm.get(['tasks'])!.value,
      employee: this.editForm.get(['employee'])!.value,
    };
  }
}
