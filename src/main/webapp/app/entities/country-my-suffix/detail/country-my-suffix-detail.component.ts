import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICountryMySuffix } from '../country-my-suffix.model';

@Component({
  selector: 'jhi-country-my-suffix-detail',
  templateUrl: './country-my-suffix-detail.component.html',
})
export class CountryMySuffixDetailComponent implements OnInit {
  country: ICountryMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ country }) => {
      this.country = country;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
