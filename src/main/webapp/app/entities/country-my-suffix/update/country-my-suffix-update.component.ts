import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICountryMySuffix, CountryMySuffix } from '../country-my-suffix.model';
import { CountryMySuffixService } from '../service/country-my-suffix.service';
import { IRegionMySuffix } from 'app/entities/region-my-suffix/region-my-suffix.model';
import { RegionMySuffixService } from 'app/entities/region-my-suffix/service/region-my-suffix.service';

@Component({
  selector: 'jhi-country-my-suffix-update',
  templateUrl: './country-my-suffix-update.component.html',
})
export class CountryMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  regionsCollection: IRegionMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    countryName: [],
    region: [],
  });

  constructor(
    protected countryService: CountryMySuffixService,
    protected regionService: RegionMySuffixService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ country }) => {
      this.updateForm(country);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const country = this.createFromForm();
    if (country.id !== undefined) {
      this.subscribeToSaveResponse(this.countryService.update(country));
    } else {
      this.subscribeToSaveResponse(this.countryService.create(country));
    }
  }

  trackRegionMySuffixById(index: number, item: IRegionMySuffix): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICountryMySuffix>>): void {
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

  protected updateForm(country: ICountryMySuffix): void {
    this.editForm.patchValue({
      id: country.id,
      countryName: country.countryName,
      region: country.region,
    });

    this.regionsCollection = this.regionService.addRegionMySuffixToCollectionIfMissing(this.regionsCollection, country.region);
  }

  protected loadRelationshipsOptions(): void {
    this.regionService
      .query({ filter: 'country-is-null' })
      .pipe(map((res: HttpResponse<IRegionMySuffix[]>) => res.body ?? []))
      .pipe(
        map((regions: IRegionMySuffix[]) =>
          this.regionService.addRegionMySuffixToCollectionIfMissing(regions, this.editForm.get('region')!.value)
        )
      )
      .subscribe((regions: IRegionMySuffix[]) => (this.regionsCollection = regions));
  }

  protected createFromForm(): ICountryMySuffix {
    return {
      ...new CountryMySuffix(),
      id: this.editForm.get(['id'])!.value,
      countryName: this.editForm.get(['countryName'])!.value,
      region: this.editForm.get(['region'])!.value,
    };
  }
}
