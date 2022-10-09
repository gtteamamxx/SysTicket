export interface Event {
  title?: string;
  body?: string;
  creationUserName?: string;
  dateFrom?: Date;
  dateTo?: Date;
  headerImgBase64?: string;
  layout?: string;
  regionPrices: RegionPrices;
}

export type RegionPrices = { [region: string]: number };
