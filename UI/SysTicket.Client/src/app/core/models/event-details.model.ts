export interface EventDetails {
  id?: number;
  title?: string;
  body?: string;
  creationUserName?: string;
  dateFrom?: Date;
  dateTo?: Date;
  headerImgBase64?: string;
  layout?: string;
  numberOfSeats?: number;
  place?: string;
  regionPrices: {
    region: string; //
    price: number;
  }[];
  seats: {
    region: string; //
    seatNumber: string;
  }[];
}
