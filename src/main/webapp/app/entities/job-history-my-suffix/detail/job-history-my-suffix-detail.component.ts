import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJobHistoryMySuffix } from '../job-history-my-suffix.model';

@Component({
  selector: 'jhi-job-history-my-suffix-detail',
  templateUrl: './job-history-my-suffix-detail.component.html',
})
export class JobHistoryMySuffixDetailComponent implements OnInit {
  jobHistory: IJobHistoryMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jobHistory }) => {
      this.jobHistory = jobHistory;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
