import { IRegionMySuffix } from 'app/entities/region-my-suffix/region-my-suffix.model';

export interface ICountryMySuffix {
  id?: number;
  countryName?: string | null;
  region?: IRegionMySuffix | null;
}

export class CountryMySuffix implements ICountryMySuffix {
  constructor(public id?: number, public countryName?: string | null, public region?: IRegionMySuffix | null) {}
}

export function getCountryMySuffixIdentifier(country: ICountryMySuffix): number | undefined {
  return country.id;
}
