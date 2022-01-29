import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobMySuffix } from '../job-my-suffix.model';

@Component({
  selector: 'jhi-job-my-suffix-detail',
  templateUrl: './job-my-suffix-detail.component.html',
})
export class JobMySuffixDetailComponent implements OnInit {
  job: IJobMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ job }) => {
      this.job = job;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
