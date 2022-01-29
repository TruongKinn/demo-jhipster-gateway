import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CountryMySuffixComponent } from './list/country-my-suffix.component';
import { CountryMySuffixDetailComponent } from './detail/country-my-suffix-detail.component';
import { CountryMySuffixUpdateComponent } from './update/country-my-suffix-update.component';
import { CountryMySuffixDeleteDialogComponent } from './delete/country-my-suffix-delete-dialog.component';
import { CountryMySuffixRoutingModule } from './route/country-my-suffix-routing.module';

@NgModule({
  imports: [SharedModule, CountryMySuffixRoutingModule],
  declarations: [
    CountryMySuffixComponent,
    CountryMySuffixDetailComponent,
    CountryMySuffixUpdateComponent,
    CountryMySuffixDeleteDialogComponent,
  ],
  entryComponents: [CountryMySuffixDeleteDialogComponent],
})
export class CountryMySuffixModule {}
