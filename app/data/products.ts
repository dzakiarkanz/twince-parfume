import type { Product } from '../types/product';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'AÉTHER',
    sku: 'TW-ATH-01',
    slug: 'aether',
    concentration: 'Extrait de Parfum',
    scentType: 'Fresh',
    notes: 'Bergamot, Marine Accord, White Musk',
    price: 1350000,
    rating: 4.8,
    stockQuantity: 12,
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=85&w=800&h=800&sat=15&exp=1&crop=top',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=85&w=800&h=800&sat=15&exp=1&crop=top',
    desc: 'Aroma udara pagi pesisir pantai yang bersih, dipadu kesegaran citrus murni untuk jiwa yang berenergi bebas.',
    aromaPyramid: {
      top: 'Bergamot, Lemon Zest',
      heart: 'Marine Accord, Neroli',
      base: 'White Musk, Driftwood'
    }
  },
  {
    id: 'p2',
    name: 'IGNIS',
    sku: 'TW-IGN-02',
    slug: 'ignis',
    concentration: 'Extrait de Parfum',
    scentType: 'Woody',
    notes: 'Sandalwood, Spiced Cardamom, Vetiver',
    price: 1550000,
    rating: 4.9,
    stockQuantity: 9,
    stock: 9,
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=85&w=800&h=800',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=85&w=800&h=800',
    desc: 'Reputasi kehangatan api malam hari yang dikelilingi hutan kayu cedar. Sangat elegan dan misterius.',
    aromaPyramid: {
      top: 'Spiced Cardamom, Pink Pepper',
      heart: 'Sandalwood, Cedarwood',
      base: 'Vetiver, Tonka Bean'
    }
  },
  {
    id: 'p3',
    name: 'NOX',
    sku: 'TW-NOX-03',
    slug: 'nox',
    concentration: 'Extrait de Parfum',
    scentType: 'Floral',
    notes: 'Black Jasmine, Midnight Orchid, Vanilla Oud',
    price: 1650000,
    rating: 5.0,
    stockQuantity: 6,
    stock: 6,
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=85&w=800&h=800&sat=-35&exp=-2&crop=top',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=85&w=800&h=800&sat=-35&exp=-2&crop=top',
    desc: 'Aroma malam yang penuh rahasia dan daya pikat. Intensitas floral gelap yang memikat indra penciuman.',
    aromaPyramid: {
      top: 'Black Pepper, Bergamot',
      heart: 'Black Jasmine, Midnight Orchid',
      base: 'Vanilla Oud, Dark Amber'
    }
  },
  {
    id: 'p4',
    name: 'TERRA',
    sku: 'TW-TER-04',
    slug: 'terra',
    concentration: 'Extrait de Parfum',
    scentType: 'Woody',
    notes: 'Patchouli, Earthy Moss, Amberwood',
    price: 1400000,
    rating: 4.7,
    stockQuantity: 8,
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=85&w=800&h=800&sat=-10&exp=-1&crop=bottom',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=85&w=800&h=800&sat=-10&exp=-1&crop=bottom',
    desc: 'Aroma tanah basah setelah hujan berpadu keanggunan lumut basah purba. Membumi dan menenangkan.',
    aromaPyramid: {
      top: 'Green Mandarin, Black Pepper',
      heart: 'Patchouli, Earthy Moss',
      base: 'Amberwood, Vetiver'
    }
  }
];
