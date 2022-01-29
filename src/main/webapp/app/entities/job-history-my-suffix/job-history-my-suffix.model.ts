import dayjs from 'dayjs/esm';
import { IJobMySuffix } from 'app/entities/job-my-suffix/job-my-suffix.model';
import { IDepartmentMySuffix } from 'app/entities/department-my-suffix/department-my-suffix.model';
import { IEmployeeMySuffix } from 'app/entities/employee-my-suffix/employee-my-suffix.model';
import { Language } from 'app/entities/enumerations/language.model';

export interface IJobHistoryMySuffix {
  id?: number;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  language?: Language | null;
  job?: IJobMySuffix | null;
  department?: IDepartmentMySuffix | null;
  employee?: IEmployeeMySuffix | null;
}

export class JobHistoryMySuffix implements IJobHistoryMySuffix {
  constructor(
    public id?: number,
    public startDate?: dayjs.Dayjs | null,
    public endDate?: dayjs.Dayjs | null,
    public language?: Language | null,
    public job?: IJobMySuffix | null,
    public department?: IDepartmentMySuffix | null,
    public employee?: IEmployeeMySuffix | null
  ) {}
}

export function getJobHistoryMySuffixIdentifier(jobHistory: IJobHistoryMySuffix): number | undefined {
  return jobHistory.id;
}
