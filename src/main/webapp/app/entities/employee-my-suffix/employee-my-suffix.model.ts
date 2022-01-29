import dayjs from 'dayjs/esm';
import { IJobMySuffix } from 'app/entities/job-my-suffix/job-my-suffix.model';
import { IDepartmentMySuffix } from 'app/entities/department-my-suffix/department-my-suffix.model';

export interface IEmployeeMySuffix {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  hireDate?: dayjs.Dayjs | null;
  salary?: number | null;
  commissionPct?: number | null;
  jobs?: IJobMySuffix[] | null;
  manager?: IEmployeeMySuffix | null;
  department?: IDepartmentMySuffix | null;
}

export class EmployeeMySuffix implements IEmployeeMySuffix {
  constructor(
    public id?: number,
    public firstName?: string | null,
    public lastName?: string | null,
    public email?: string | null,
    public phoneNumber?: string | null,
    public hireDate?: dayjs.Dayjs | null,
    public salary?: number | null,
    public commissionPct?: number | null,
    public jobs?: IJobMySuffix[] | null,
    public manager?: IEmployeeMySuffix | null,
    public department?: IDepartmentMySuffix | null
  ) {}
}

export function getEmployeeMySuffixIdentifier(employee: IEmployeeMySuffix): number | undefined {
  return employee.id;
}
