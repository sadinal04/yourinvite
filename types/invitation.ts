export interface Person {
  name: string;
  title?: string;
  father: string;
  mother: string;
  instagram?: string;
  photo?: string;
}

export interface EventDetail {
  date: string;
  dateISO: string; // ISO 8601 for countdown
  time: string;
  timezone: string;
  venue: string;
  address: string;
  mapsUrl?: string;
}

export interface QuranVerse {
  arabic: string;
  translation: string;
  source: string;
}

export interface InvitationData {
  slug: string;
  meta?: {
    title?: string;
    description?: string;
  };
  groom: Person;
  bride: Person;
  opening?: {
    title?: string;
    subtitle?: string;
  };
  event: {
    akad: EventDetail;
    resepsi: EventDetail;
  };
  quranVerse?: QuranVerse;
  closing?: {
    message?: string;
    signature?: string;
  };
  music?: string; // path to audio file in /public
}

export type InvitationsMap = Record<string, InvitationData>;
