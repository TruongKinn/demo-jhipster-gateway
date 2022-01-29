import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocationMySuffix } from '../location-my-suffix.model';

@Component({
  selector: 'jhi-location-my-suffix-detail',
  templateUrl: './location-my-suffix-detail.component.html',
})
export class LocationMySuffixDetailComponent implements OnInit {
  location: ILocationMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ location }) => {
      this.location = location;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
