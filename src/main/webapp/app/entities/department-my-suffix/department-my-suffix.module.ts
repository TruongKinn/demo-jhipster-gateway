import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DepartmentMySuffixComponent } from './list/department-my-suffix.component';
import { DepartmentMySuffixDetailComponent } from './detail/department-my-suffix-detail.component';
import { DepartmentMySuffixUpdateComponent } from './update/department-my-suffix-update.component';
import { DepartmentMySuffixDeleteDialogComponent } from './delete/department-my-suffix-delete-dialog.component';
import { DepartmentMySuffixRoutingModule } from './route/department-my-suffix-routing.module';

@NgModule({
  imports: [SharedModule, DepartmentMySuffixRoutingModule],
  declarations: [
    DepartmentMySuffixComponent,
    DepartmentMySuffixDetailComponent,
    DepartmentMySuffixUpdateComponent,
    DepartmentMySuffixDeleteDialogComponent,
  ],
  entryComponents: [DepartmentMySuffixDeleteDialogComponent],
})
export class DepartmentMySuffixModule {}
