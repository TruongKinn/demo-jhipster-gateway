import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { JobHistoryMySuffixComponent } from './list/job-history-my-suffix.component';
import { JobHistoryMySuffixDetailComponent } from './detail/job-history-my-suffix-detail.component';
import { JobHistoryMySuffixUpdateComponent } from './update/job-history-my-suffix-update.component';
import { JobHistoryMySuffixDeleteDialogComponent } from './delete/job-history-my-suffix-delete-dialog.component';
import { JobHistoryMySuffixRoutingModule } from './route/job-history-my-suffix-routing.module';

@NgModule({
  imports: [SharedModule, JobHistoryMySuffixRoutingModule],
  declarations: [
    JobHistoryMySuffixComponent,
    JobHistoryMySuffixDetailComponent,
    JobHistoryMySuffixUpdateComponent,
    JobHistoryMySuffixDeleteDialogComponent,
  ],
  entryComponents: [JobHistoryMySuffixDeleteDialogComponent],
})
export class JobHistoryMySuffixModule {}
