export interface Track {
  id: string;
  title: string;
  duration: string;
}

export interface Album {
  id: string;
  persona: string;
  title: string;
  year: number;
  coverArt: string;
  tracks: Track[];
  embedUrl?: string;
  embedHeight?: string;
  albumPurchaseUrl?: string;
}

export interface Product {
  id: string;
  type: 'Music' | 'Art';
  title: string;
  price: number;
  image: string;
  description: string;
  purchaseUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type SampleCategory = 'Drums' | 'Bass' | 'Synth' | 'Vocals';

export interface RemixSample {
  id: string;
  name: string;
  category: SampleCategory;
  url: string;
}