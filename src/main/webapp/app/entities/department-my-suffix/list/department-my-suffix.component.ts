import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDepartmentMySuffix } from '../department-my-suffix.model';
import { DepartmentMySuffixService } from '../service/department-my-suffix.service';
import { DepartmentMySuffixDeleteDialogComponent } from '../delete/department-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-department-my-suffix',
  templateUrl: './department-my-suffix.component.html',
})
export class DepartmentMySuffixComponent implements OnInit {
  departments?: IDepartmentMySuffix[];
  isLoading = false;

  constructor(protected departmentService: DepartmentMySuffixService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.departmentService.query().subscribe({
      next: (res: HttpResponse<IDepartmentMySuffix[]>) => {
        this.isLoading = false;
        this.departments = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IDepartmentMySuffix): number {
    return item.id!;
  }

  delete(department: IDepartmentMySuffix): void {
    const modalRef = this.modalService.open(DepartmentMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.department = department;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
