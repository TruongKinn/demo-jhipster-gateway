import { ILocationMySuffix } from 'app/entities/location-my-suffix/location-my-suffix.model';
import { IEmployeeMySuffix } from 'app/entities/employee-my-suffix/employee-my-suffix.model';

export interface IDepartmentMySuffix {
  id?: number;
  departmentName?: string;
  location?: ILocationMySuffix | null;
  employees?: IEmployeeMySuffix[] | null;
}

export class DepartmentMySuffix implements IDepartmentMySuffix {
  constructor(
    public id?: number,
    public departmentName?: string,
    public location?: ILocationMySuffix | null,
    public employees?: IEmployeeMySuffix[] | null
  ) {}
}

export function getDepartmentMySuffixIdentifier(department: IDepartmentMySuffix): number | undefined {
  return department.id;
}
