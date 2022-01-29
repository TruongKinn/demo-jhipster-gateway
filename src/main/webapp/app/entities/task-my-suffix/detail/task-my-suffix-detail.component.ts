import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITaskMySuffix } from '../task-my-suffix.model';

@Component({
  selector: 'jhi-task-my-suffix-detail',
  templateUrl: './task-my-suffix-detail.component.html',
})
export class TaskMySuffixDetailComponent implements OnInit {
  task: ITaskMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ task }) => {
      this.task = task;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
