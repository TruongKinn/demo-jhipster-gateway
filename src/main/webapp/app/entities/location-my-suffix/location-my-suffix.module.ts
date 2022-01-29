import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { LocationMySuffixComponent } from './list/location-my-suffix.component';
import { LocationMySuffixDetailComponent } from './detail/location-my-suffix-detail.component';
import { LocationMySuffixUpdateComponent } from './update/location-my-suffix-update.component';
import { LocationMySuffixDeleteDialogComponent } from './delete/location-my-suffix-delete-dialog.component';
import { LocationMySuffixRoutingModule } from './route/location-my-suffix-routing.module';

@NgModule({
  imports: [SharedModule, LocationMySuffixRoutingModule],
  declarations: [
    LocationMySuffixComponent,
    LocationMySuffixDetailComponent,
    LocationMySuffixUpdateComponent,
    LocationMySuffixDeleteDialogComponent,
  ],
  entryComponents: [LocationMySuffixDeleteDialogComponent],
})
export class LocationMySuffixModule {}
