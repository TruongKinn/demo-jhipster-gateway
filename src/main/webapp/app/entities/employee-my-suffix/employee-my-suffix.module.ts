import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EmployeeMySuffixComponent } from './list/employee-my-suffix.component';
import { EmployeeMySuffixDetailComponent } from './detail/employee-my-suffix-detail.component';
import { EmployeeMySuffixUpdateComponent } from './update/employee-my-suffix-update.component';
import { EmployeeMySuffixDeleteDialogComponent } from './delete/employee-my-suffix-delete-dialog.component';
import { EmployeeMySuffixRoutingModule } from './route/employee-my-suffix-routing.module';

@NgModule({
  imports: [SharedModule, EmployeeMySuffixRoutingModule],
  declarations: [
    EmployeeMySuffixComponent,
    EmployeeMySuffixDetailComponent,
    EmployeeMySuffixUpdateComponent,
    EmployeeMySuffixDeleteDialogComponent,
  ],
  entryComponents: [EmployeeMySuffixDeleteDialogComponent],
})
export class EmployeeMySuffixModule {}
