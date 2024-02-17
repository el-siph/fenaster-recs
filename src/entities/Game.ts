export interface Game {
  id: number;
  title: string;
  genre: string;
  msrp: string;
  recBy: string;
  recTo: string;
  isSeconded: boolean | null;
  userScore: string;
  hasEnglishVO: string | boolean | null;
  notes: string;
  storeLink: string | null;
  wasCompleted: boolean;
  vodLink: string;
  isAuthorized: boolean;
}
