export type PublicEvent = {
  id: string;
  title: string;
  date: string;
  venue: string;
  imageUrl: string | null;
  ticketUrl: string;
  description: string | null;
};

export type PublicPastShow = {
  id: string;
  title: string;
  date: string;
  venue: string;
  photoUrls: string[];
  videoUrls: string[];
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
