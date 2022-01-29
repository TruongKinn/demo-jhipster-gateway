import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IJobMySuffix } from '../job-my-suffix.model';
import { JobMySuffixService } from '../service/job-my-suffix.service';

@Component({
  templateUrl: './job-my-suffix-delete-dialog.component.html',
})
export class JobMySuffixDeleteDialogComponent {
  job?: IJobMySuffix;

  constructor(protected jobService: JobMySuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.jobService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
