import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICountryMySuffix } from '../country-my-suffix.model';
import { CountryMySuffixService } from '../service/country-my-suffix.service';

@Component({
  templateUrl: './country-my-suffix-delete-dialog.component.html',
})
export class CountryMySuffixDeleteDialogComponent {
  country?: ICountryMySuffix;

  constructor(protected countryService: CountryMySuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.countryService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
