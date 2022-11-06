import { RegionPrices } from './region-prices.model';

export interface Event {
  id?: number;
  title?: string;
  body?: string;
  creationUserName?: string;
  dateFrom?: Date;
  dateTo?: Date;
  headerImgBase64?: string;
  layout?: string;
  place?: string;
  regionPrices: RegionPrices;
}
