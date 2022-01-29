import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDepartmentMySuffix } from '../department-my-suffix.model';
import { DepartmentMySuffixService } from '../service/department-my-suffix.service';

@Component({
  templateUrl: './department-my-suffix-delete-dialog.component.html',
})
export class DepartmentMySuffixDeleteDialogComponent {
  department?: IDepartmentMySuffix;

  constructor(protected departmentService: DepartmentMySuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.departmentService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
