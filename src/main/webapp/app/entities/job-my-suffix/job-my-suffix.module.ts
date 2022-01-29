import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { JobMySuffixComponent } from './list/job-my-suffix.component';
import { JobMySuffixDetailComponent } from './detail/job-my-suffix-detail.component';
import { JobMySuffixUpdateComponent } from './update/job-my-suffix-update.component';
import { JobMySuffixDeleteDialogComponent } from './delete/job-my-suffix-delete-dialog.component';
import { JobMySuffixRoutingModule } from './route/job-my-suffix-routing.module';

@NgModule({
  imports: [SharedModule, JobMySuffixRoutingModule],
  declarations: [JobMySuffixComponent, JobMySuffixDetailComponent, JobMySuffixUpdateComponent, JobMySuffixDeleteDialogComponent],
  entryComponents: [JobMySuffixDeleteDialogComponent],
})
export class JobMySuffixModule {}
