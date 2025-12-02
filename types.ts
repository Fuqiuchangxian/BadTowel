export interface Fortune {
  title: string;
  sign: string;
  interpretation: string;
}

export interface Song {
  id: string;
  title: string;
  date: string; // ISO date string YYYY-MM-DD
  status: string;
  role: string[]; // e.g. ["Composed", "Lyrics", "Mixing"]
  tags: string[];
  url?: string;
  lyrics?: string;
  platform?: 'Bilibili' | 'Other';
}

export interface LinkItem {
  title: string;
  url: string;
  description: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  role: string;
  power: string;
  description: string;
}