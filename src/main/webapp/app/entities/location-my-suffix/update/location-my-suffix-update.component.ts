import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ILocationMySuffix, LocationMySuffix } from '../location-my-suffix.model';
import { LocationMySuffixService } from '../service/location-my-suffix.service';
import { ICountryMySuffix } from 'app/entities/country-my-suffix/country-my-suffix.model';
import { CountryMySuffixService } from 'app/entities/country-my-suffix/service/country-my-suffix.service';

@Component({
  selector: 'jhi-location-my-suffix-update',
  templateUrl: './location-my-suffix-update.component.html',
})
export class LocationMySuffixUpdateComponent implements OnInit {
  isSaving = false;

  countriesCollection: ICountryMySuffix[] = [];

  editForm = this.fb.group({
    id: [],
    streetAddress: [],
    postalCode: [],
    city: [],
    stateProvince: [],
    country: [],
  });

  constructor(
    protected locationService: LocationMySuffixService,
    protected countryService: CountryMySuffixService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ location }) => {
      this.updateForm(location);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const location = this.createFromForm();
    if (location.id !== undefined) {
      this.subscribeToSaveResponse(this.locationService.update(location));
    } else {
      this.subscribeToSaveResponse(this.locationService.create(location));
    }
  }

  trackCountryMySuffixById(index: number, item: ICountryMySuffix): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocationMySuffix>>): void {
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

  protected updateForm(location: ILocationMySuffix): void {
    this.editForm.patchValue({
      id: location.id,
      streetAddress: location.streetAddress,
      postalCode: location.postalCode,
      city: location.city,
      stateProvince: location.stateProvince,
      country: location.country,
    });

    this.countriesCollection = this.countryService.addCountryMySuffixToCollectionIfMissing(this.countriesCollection, location.country);
  }

  protected loadRelationshipsOptions(): void {
    this.countryService
      .query({ filter: 'location-is-null' })
      .pipe(map((res: HttpResponse<ICountryMySuffix[]>) => res.body ?? []))
      .pipe(
        map((countries: ICountryMySuffix[]) =>
          this.countryService.addCountryMySuffixToCollectionIfMissing(countries, this.editForm.get('country')!.value)
        )
      )
      .subscribe((countries: ICountryMySuffix[]) => (this.countriesCollection = countries));
  }

  protected createFromForm(): ILocationMySuffix {
    return {
      ...new LocationMySuffix(),
      id: this.editForm.get(['id'])!.value,
      streetAddress: this.editForm.get(['streetAddress'])!.value,
      postalCode: this.editForm.get(['postalCode'])!.value,
      city: this.editForm.get(['city'])!.value,
      stateProvince: this.editForm.get(['stateProvince'])!.value,
      country: this.editForm.get(['country'])!.value,
    };
  }
}
