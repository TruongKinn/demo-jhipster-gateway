import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILocationMySuffix } from '../location-my-suffix.model';
import { LocationMySuffixService } from '../service/location-my-suffix.service';
import { LocationMySuffixDeleteDialogComponent } from '../delete/location-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-location-my-suffix',
  templateUrl: './location-my-suffix.component.html',
})
export class LocationMySuffixComponent implements OnInit {
  locations?: ILocationMySuffix[];
  isLoading = false;

  constructor(protected locationService: LocationMySuffixService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.locationService.query().subscribe({
      next: (res: HttpResponse<ILocationMySuffix[]>) => {
        this.isLoading = false;
        this.locations = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ILocationMySuffix): number {
    return item.id!;
  }

  delete(location: ILocationMySuffix): void {
    const modalRef = this.modalService.open(LocationMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.location = location;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
