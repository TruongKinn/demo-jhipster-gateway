import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRegionMySuffix } from '../region-my-suffix.model';

@Component({
  selector: 'jhi-region-my-suffix-detail',
  templateUrl: './region-my-suffix-detail.component.html',
})
export class RegionMySuffixDetailComponent implements OnInit {
  region: IRegionMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ region }) => {
      this.region = region;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
