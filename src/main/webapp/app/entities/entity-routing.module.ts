import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'region-my-suffix',
        data: { pageTitle: 'empDemoApp.region.home.title' },
        loadChildren: () => import('./region-my-suffix/region-my-suffix.module').then(m => m.RegionMySuffixModule),
      },
      {
        path: 'country-my-suffix',
        data: { pageTitle: 'empDemoApp.country.home.title' },
        loadChildren: () => import('./country-my-suffix/country-my-suffix.module').then(m => m.CountryMySuffixModule),
      },
      {
        path: 'location-my-suffix',
        data: { pageTitle: 'empDemoApp.location.home.title' },
        loadChildren: () => import('./location-my-suffix/location-my-suffix.module').then(m => m.LocationMySuffixModule),
      },
      {
        path: 'department-my-suffix',
        data: { pageTitle: 'empDemoApp.department.home.title' },
        loadChildren: () => import('./department-my-suffix/department-my-suffix.module').then(m => m.DepartmentMySuffixModule),
      },
      {
        path: 'task-my-suffix',
        data: { pageTitle: 'empDemoApp.task.home.title' },
        loadChildren: () => import('./task-my-suffix/task-my-suffix.module').then(m => m.TaskMySuffixModule),
      },
      {
        path: 'employee-my-suffix',
        data: { pageTitle: 'empDemoApp.employee.home.title' },
        loadChildren: () => import('./employee-my-suffix/employee-my-suffix.module').then(m => m.EmployeeMySuffixModule),
      },
      {
        path: 'job-my-suffix',
        data: { pageTitle: 'empDemoApp.job.home.title' },
        loadChildren: () => import('./job-my-suffix/job-my-suffix.module').then(m => m.JobMySuffixModule),
      },
      {
        path: 'job-history-my-suffix',
        data: { pageTitle: 'empDemoApp.jobHistory.home.title' },
        loadChildren: () => import('./job-history-my-suffix/job-history-my-suffix.module').then(m => m.JobHistoryMySuffixModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
