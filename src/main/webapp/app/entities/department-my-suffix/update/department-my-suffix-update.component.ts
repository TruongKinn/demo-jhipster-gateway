import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDepartmentMySuffix, DepartmentMySuffix } from '../department-my-suffix.model';
import { DepartmentMySuffixService } from '../service/department-my-suffix.service';
import { ILocationMySuffix } from 'app/entities/location-my-suffix/location-my-suffix.model';
import { LocationMySuffixService } from 'app/entities/location-my-suffix/service/location-my-suffix.service';

@Component({
  selector: 'jhi-department-my-suffix-update',
  templateUrl: './department-my-suffix-update.component.html',
})
export class DepartmentMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  locationsCollection: ILocationMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    departmentName: [null, [Validators.required]],
    location: [],
  });

  constructor(
    protected departmentService: DepartmentMySuffixService,
    protected locationService: LocationMySuffixService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.updateForm(department);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const department = this.createFromForm();
    if (department.id !== undefined) {
      this.subscribeToSaveResponse(this.departmentService.update(department));
    } else {
      this.subscribeToSaveResponse(this.departmentService.create(department));
    }
  }

  trackLocationMySuffixById(index: number, item: ILocationMySuffix): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartmentMySuffix>>): void {
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

  protected updateForm(department: IDepartmentMySuffix): void {
    this.editForm.patchValue({
      id: department.id,
      departmentName: department.departmentName,
      location: department.location,
    });

    this.locationsCollection = this.locationService.addLocationMySuffixToCollectionIfMissing(this.locationsCollection, department.location);
  }

  protected loadRelationshipsOptions(): void {
    this.locationService
      .query({ filter: 'department-is-null' })
      .pipe(map((res: HttpResponse<ILocationMySuffix[]>) => res.body ?? []))
      .pipe(
        map((locations: ILocationMySuffix[]) =>
          this.locationService.addLocationMySuffixToCollectionIfMissing(locations, this.editForm.get('location')!.value)
        )
      )
      .subscribe((locations: ILocationMySuffix[]) => (this.locationsCollection = locations));
  }

  protected createFromForm(): IDepartmentMySuffix {
    return {
      ...new DepartmentMySuffix(),
      id: this.editForm.get(['id'])!.value,
      departmentName: this.editForm.get(['departmentName'])!.value,
      location: this.editForm.get(['location'])!.value,
    };
  }
}
