import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RegionMySuffixComponent } from './list/region-my-suffix.component';
import { RegionMySuffixDetailComponent } from './detail/region-my-suffix-detail.component';
import { RegionMySuffixUpdateComponent } from './update/region-my-suffix-update.component';
import { RegionMySuffixDeleteDialogComponent } from './delete/region-my-suffix-delete-dialog.component';
import { RegionMySuffixRoutingModule } from './route/region-my-suffix-routing.module';

@NgModule({
  imports: [SharedModule, RegionMySuffixRoutingModule],
  declarations: [
    RegionMySuffixComponent,
    RegionMySuffixDetailComponent,
    RegionMySuffixUpdateComponent,
    RegionMySuffixDeleteDialogComponent,
  ],
  entryComponents: [RegionMySuffixDeleteDialogComponent],
})
export class RegionMySuffixModule {}
