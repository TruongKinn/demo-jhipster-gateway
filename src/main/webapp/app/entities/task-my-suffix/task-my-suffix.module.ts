import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TaskMySuffixComponent } from './list/task-my-suffix.component';
import { TaskMySuffixDetailComponent } from './detail/task-my-suffix-detail.component';
import { TaskMySuffixUpdateComponent } from './update/task-my-suffix-update.component';
import { TaskMySuffixDeleteDialogComponent } from './delete/task-my-suffix-delete-dialog.component';
import { TaskMySuffixRoutingModule } from './route/task-my-suffix-routing.module';

@NgModule({
  imports: [SharedModule, TaskMySuffixRoutingModule],
  declarations: [TaskMySuffixComponent, TaskMySuffixDetailComponent, TaskMySuffixUpdateComponent, TaskMySuffixDeleteDialogComponent],
  entryComponents: [TaskMySuffixDeleteDialogComponent],
})
export class TaskMySuffixModule {}
