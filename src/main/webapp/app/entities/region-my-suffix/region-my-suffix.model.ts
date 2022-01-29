export interface IRegionMySuffix {
  id?: number;
  regionName?: string | null;
}

export class RegionMySuffix implements IRegionMySuffix {
  constructor(public id?: number, public regionName?: string | null) {}
}

export function getRegionMySuffixIdentifier(region: IRegionMySuffix): number | undefined {
  return region.id;
}
