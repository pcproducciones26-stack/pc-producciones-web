export type PublicEvent = {
  id: string;
  title: string;
  date: string;
  venue: string;
  imageUrl: string | null;
  ticketUrl: string;
  description: string | null;
};

export type PublicInstagramPost = {
  id: string;
  imageUrl: string;
  postUrl: string | null;
  caption: string | null;
  eventDate: string | null;
  venue: string | null;
  city: string | null;
};

export type EventsPage = {
  events: PublicEvent[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
