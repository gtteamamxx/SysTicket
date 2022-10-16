import { RegionPrices } from './region-prices.model';

export interface EventDetails {
  id?: number;
  title?: string;
  body?: string;
  creationUserName?: string;
  dateFrom?: Date;
  dateTo?: Date;
  headerImgBase64?: string;
  layout?: string;
  regionPrices: RegionPrices;
}
