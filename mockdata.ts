import { Album, Product } from '../types';

export const albums: Album[] = [
  {
    id: 'rb-rotn-2005',
    persona: 'Raw B',
    title: 'Return of the Nightflier',
    year: 2005,
    coverArt: 'https://f4.bcbits.com/img/a3165254329_16.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/album=1189801172/size=large/bgcol=333333/linkcol=0f91ff/tracklist=false/artwork=small/transparent=true/',
    embedHeight: '120px',
    albumPurchaseUrl: 'https://therawb.bandcamp.com/album/return-of-the-nightflier',
    tracks: [
      { id: 'rb-rotn-2005-t01', title: 'intro/bad news first', duration: '3:56' },
      { id: 'rb-rotn-2005-t02', title: 'hot fire/lyrical paraphernalia pt.1', duration: '4:42' },
      { id: 'rb-rotn-2005-t03', title: 'moment of truth/another1', duration: '5:08' },
      { id: 'rb-rotn-2005-t04', title: 'live your life', duration: '4:15' },
      { id: 'rb-rotn-2005-t05', title: 'introspect', duration: '1:58' }
    ],
  },
  {
    id: 'rb-cl-2007',
    persona: 'Raw B',
    title: 'Cunning Linguist',
    year: 2007,
    coverArt: 'https://f4.bcbits.com/img/a3476821325_16.jpg',
    embedUrl: 'https://bandcamp.com/EmbeddedPlayer/album=3364835604/size=large/bgcol=333333/linkcol=0f91ff/tracklist=false/artwork=small/transparent=true/',
    embedHeight: '120px',
    albumPurchaseUrl: 'https://therawb.bandcamp.com/album/cunning-linguist',
    tracks: [
        { id: 'rb-cl-2007-t01', title: 'intro', duration: '0:58' },
        { id: 'rb-cl-2007-t02', title: "don't be shy", duration: '3:50' },
        { id: 'rb-cl-2007-t03', title: 'tribute featuring Slyricist', duration: '3:11' }
    ]
  }
];

export const products: Product[] = [
  {
    id: 'prod-01',
    type: 'Music',
    title: 'Return of the Nightflier - Digital Album',
    price: 10.00,
    image: 'https://f4.bcbits.com/img/a3165254329_16.jpg',
    description: 'The full digital album "Return of the Nightflier" by Raw B.',
    purchaseUrl: 'https://therawb.bandcamp.com/album/return-of-the-nightflier',
  },
  {
    id: 'prod-02',
    type: 'Art',
    title: 'Mr. Sletner Logo Tee',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop',
    description: 'A comfortable black t-shirt with the iconic Mr. Sletner logo.',
    purchaseUrl: '#',
  }
];