export interface Reservation {
  id?: string;
  event?: {
    dateFrom?: string;
    dateTo?: string;
    title?: string;
    regionPrices?: {
      price?: number;
      region?: string;
    }[];
  };
  reservationDate?: string;
  seats: {
    region?: string;
    seatNumber?: string;
  }[];
}
