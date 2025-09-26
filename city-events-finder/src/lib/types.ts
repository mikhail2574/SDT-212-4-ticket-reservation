export type TmEvent = {
  id: string;
  name: string;
  url?: string;
  images?: { url: string; width: number; height: number }[];
  dates?: { start?: { localDate?: string; localTime?: string } };
  priceRanges?: { type: string; currency: string; min: number; max: number }[];
  seatmap?: { staticUrl?: string };
  pleaseNote?: string;
  promoter?: { name?: string };
  _embedded?: {
    venues?: { name?: string; city?: { name?: string }; country?: { countryCode?: string } }[];
  };
};

export type Seat = {
  id: string;   // "A-03-12"
  section: string;
  row: string;
  number: number;
  price: number;
  status: "available" | "selected" | "reserved";
  x: number;    // for SVG
  y: number;
};

export type Reservation = {
  id: string;
  eventId: string;
  seats: Seat[];
  total: number;
  createdAt: string;
};

export type SeatGeoMeta = {
  id: string; // совпадает с Seat.id
  position: [number, number, number];
  rotation?: [number, number, number];
  section: string;
  row: string;
};
