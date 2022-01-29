import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITaskMySuffix } from '../task-my-suffix.model';
import { TaskMySuffixService } from '../service/task-my-suffix.service';
import { TaskMySuffixDeleteDialogComponent } from '../delete/task-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-task-my-suffix',
  templateUrl: './task-my-suffix.component.html',
})
export class TaskMySuffixComponent implements OnInit {
  tasks?: ITaskMySuffix[];
  isLoading = false;

  constructor(protected taskService: TaskMySuffixService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.taskService.query().subscribe({
      next: (res: HttpResponse<ITaskMySuffix[]>) => {
        this.isLoading = false;
        this.tasks = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITaskMySuffix): number {
    return item.id!;
  }

  delete(task: ITaskMySuffix): void {
    const modalRef = this.modalService.open(TaskMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.task = task;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
