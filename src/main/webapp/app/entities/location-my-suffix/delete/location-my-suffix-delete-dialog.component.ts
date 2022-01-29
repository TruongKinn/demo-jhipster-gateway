import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocationMySuffix } from '../location-my-suffix.model';
import { LocationMySuffixService } from '../service/location-my-suffix.service';

@Component({
  templateUrl: './location-my-suffix-delete-dialog.component.html',
})
export class LocationMySuffixDeleteDialogComponent {
  location?: ILocationMySuffix;

  constructor(protected locationService: LocationMySuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.locationService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
