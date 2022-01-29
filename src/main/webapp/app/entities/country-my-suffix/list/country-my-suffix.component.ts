import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICountryMySuffix } from '../country-my-suffix.model';
import { CountryMySuffixService } from '../service/country-my-suffix.service';
import { CountryMySuffixDeleteDialogComponent } from '../delete/country-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-country-my-suffix',
  templateUrl: './country-my-suffix.component.html',
})
export class CountryMySuffixComponent implements OnInit {
  countries?: ICountryMySuffix[];
  isLoading = false;

  constructor(protected countryService: CountryMySuffixService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.countryService.query().subscribe({
      next: (res: HttpResponse<ICountryMySuffix[]>) => {
        this.isLoading = false;
        this.countries = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICountryMySuffix): number {
    return item.id!;
  }

  delete(country: ICountryMySuffix): void {
    const modalRef = this.modalService.open(CountryMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.country = country;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
