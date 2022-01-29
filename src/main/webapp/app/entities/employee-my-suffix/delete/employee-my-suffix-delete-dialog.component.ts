import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmployeeMySuffix } from '../employee-my-suffix.model';
import { EmployeeMySuffixService } from '../service/employee-my-suffix.service';

@Component({
  templateUrl: './employee-my-suffix-delete-dialog.component.html',
})
export class EmployeeMySuffixDeleteDialogComponent {
  employee?: IEmployeeMySuffix;

  constructor(protected employeeService: EmployeeMySuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.employeeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
