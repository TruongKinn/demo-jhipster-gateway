import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IRegionMySuffix, RegionMySuffix } from '../region-my-suffix.model';
import { RegionMySuffixService } from '../service/region-my-suffix.service';

@Component({
  selector: 'jhi-region-my-suffix-update',
  templateUrl: './region-my-suffix-update.component.html',
})
export class RegionMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    regionName: [],
  });

  constructor(protected regionService: RegionMySuffixService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ region }) => {
      this.updateForm(region);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const region = this.createFromForm();
    if (region.id !== undefined) {
      this.subscribeToSaveResponse(this.regionService.update(region));
    } else {
      this.subscribeToSaveResponse(this.regionService.create(region));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegionMySuffix>>): void {
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

  protected updateForm(region: IRegionMySuffix): void {
    this.editForm.patchValue({
      id: region.id,
      regionName: region.regionName,
    });
  }

  protected createFromForm(): IRegionMySuffix {
    return {
      ...new RegionMySuffix(),
      id: this.editForm.get(['id'])!.value,
      regionName: this.editForm.get(['regionName'])!.value,
    };
  }
}
