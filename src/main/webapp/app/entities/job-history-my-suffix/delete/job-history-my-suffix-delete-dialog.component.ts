import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IJobHistoryMySuffix } from '../job-history-my-suffix.model';
import { JobHistoryMySuffixService } from '../service/job-history-my-suffix.service';

@Component({
  templateUrl: './job-history-my-suffix-delete-dialog.component.html',
})
export class JobHistoryMySuffixDeleteDialogComponent {
  jobHistory?: IJobHistoryMySuffix;

  constructor(protected jobHistoryService: JobHistoryMySuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.jobHistoryService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
