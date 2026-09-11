import type { Product } from '../types/product';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Velvet Santal Extrait',
    sku: 'TW-VS-50ML',
    slug: 'velvet-santal',
    concentration: 'Extrait de Parfum',
    scentType: 'Woody',
    notes: 'Cardamom, Florentine Iris, Australian Sandalwood',
    price: 1450000,
    rating: 4.9,
    stockQuantity: 50,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=85&w=800&h=1000',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=85&w=800&h=1000',
    desc: 'Aroma kehangatan kayu cendana Australia berpadu rempah kapulaga aromatik dan sentuhan mewah bedak iris.',
    aromaPyramid: {
      top: 'Cardamom, Calabrian Bergamot',
      heart: 'Florentine Iris, French Violet',
      base: 'Australian Sandalwood, Cedarwood, Warm Amber'
    }
  },
  {
    id: '2',
    name: 'Oud Nocturne',
    sku: 'TW-ON-50ML',
    slug: 'oud-nocturne',
    concentration: 'Extrait de Parfum',
    scentType: 'Woody',
    notes: 'Incense, Smoky Agarwood, Ambergris',
    price: 1850000,
    rating: 5.0,
    stockQuantity: 35,
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=85&w=800&h=1000',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=85&w=800&h=1000',
    desc: 'Intensitas misterius gaharu berasap yang dibalut kulit Italia dan keanggunan abadi ambergris.',
    aromaPyramid: {
      top: 'Incense, Pink Pepper',
      heart: 'Smoky Agarwood, Tuscan Leather',
      base: 'Natural Ambergris, Dark Labdanum'
    }
  },
  {
    id: '3',
    name: 'Rose Imperiale',
    sku: 'TW-RI-50ML',
    slug: 'rose-imperiale',
    concentration: 'Extrait de Parfum',
    scentType: 'Floral',
    notes: 'Pink Pepper, Damask Rose, Cashmeran',
    price: 1250000,
    rating: 4.8,
    stockQuantity: 60,
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=85&w=800&h=1000',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=85&w=800&h=1000',
    desc: 'Mahakarya floral yang megah dari mawar Damask segar dengan sengatan pedas merica merah muda dan kelembutan cashmeran.',
    aromaPyramid: {
      top: 'Pink Pepper, Wild Lychee',
      heart: 'Damask Rose, Taif Rose Petals',
      base: 'Cashmeran, Warm Amber, White Musk'
    }
  },
  {
    id: '4',
    name: 'Citrus Bergamota',
    sku: 'TW-CB-50ML',
    slug: 'citrus-bergamota',
    concentration: 'Extrait de Parfum',
    scentType: 'Fresh',
    notes: 'Calabrian Bergamot, Neroli, Vetiver',
    price: 980000,
    rating: 4.7,
    stockQuantity: 80,
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=85&w=800&h=1000',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=85&w=800&h=1000',
    desc: 'Sensasi ledakan kesegaran citrus Mediterania yang membangkitkan energi murni, dihiasi kelopak neroli dan vetiver basah.',
    aromaPyramid: {
      top: 'Calabrian Bergamot, Petitgrain, Lemon Zest',
      heart: 'Tunisian Neroli, Orange Blossom',
      base: 'Haitian Vetiver, White Cedar'
    }
  },
  {
    id: '5',
    name: 'Vanilla Bourbon Absolu',
    sku: 'TW-VB-50ML',
    slug: 'vanilla-bourbon',
    concentration: 'Extrait de Parfum',
    scentType: 'Woody',
    notes: 'Aged Rum, Madagascar Vanilla, Tonka Bean',
    price: 1350000,
    rating: 4.9,
    stockQuantity: 45,
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=85&w=800&h=1000',
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=85&w=800&h=1000',
    desc: 'Kelembutan gourmand adiktif dari ekstrak vanila hitam Madagaskar, diperkaya aged rum dan kacang tonka panggang.',
    aromaPyramid: {
      top: 'Aged Caribbean Rum, Brown Sugar',
      heart: 'Madagascar Vanilla Bourbon, Benzoin',
      base: 'Roasted Tonka Bean, Caramelized Amber'
    }
  },
  {
    id: '6',
    name: 'Marine Sauvage',
    sku: 'TW-MS-50ML',
    slug: 'marine-sauvage',
    concentration: 'Extrait de Parfum',
    scentType: 'Fresh',
    notes: 'Sea Salt, Mineral Sage, Driftwood',
    price: 1150000,
    rating: 4.8,
    stockQuantity: 70,
    stock: 70,
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=85&w=800&h=1000',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=85&w=800&h=1000',
    desc: 'Embusan angin laut liar beraroma garam samudra dan sage mineral yang menyelimuti kayu apung pesisir pantai karang.',
    aromaPyramid: {
      top: 'Sea Salt Accord, Ocean Ozone',
      heart: 'Mineral Sage, Crisp Juniper',
      base: 'Weathered Driftwood, Sun-bleached Cedar'
    }
  },
  {
    id: '7',
    name: 'Matcha Euphoria',
    sku: 'TW-ME-50ML',
    slug: 'matcha-euphoria',
    concentration: 'Extrait de Parfum',
    scentType: 'Fresh',
    notes: 'Ceremonial Matcha, Fig Leaf, White Musk',
    price: 1100000,
    rating: 4.9,
    stockQuantity: 55,
    stock: 55,
    imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=85&w=800&h=1000',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=85&w=800&h=1000',
    desc: 'Ketenangan meditatif dari serbuk matcha seremonial Jepang, daun ara hijau yang segar, dan selimut white musk yang bersih.',
    aromaPyramid: {
      top: 'Ceremonial Uji Matcha, Bergamot Zest',
      heart: 'Green Fig Leaf, White Tea',
      base: 'Clean White Musk, Cedar Leaves'
    }
  },
  {
    id: '8',
    name: 'Tobacco Cuir',
    sku: 'TW-TC-50ML',
    slug: 'tobacco-cuir',
    concentration: 'Extrait de Parfum',
    scentType: 'Woody',
    notes: 'Virginia Tobacco, Wild Honey, Bitter Cacao',
    price: 1600000,
    rating: 4.9,
    stockQuantity: 40,
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=85&w=800&h=1000',
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=85&w=800&h=1000',
    desc: 'Pesona wibawa karismatik dari tembakau Virginia kering yang dicelupkan madu hangat, cokelat hitam pahit, dan kulit antik.',
    aromaPyramid: {
      top: 'Virginia Tobacco Leaf, Spiced Wild Honey',
      heart: 'Bitter Cacao, Tonka Accord',
      base: 'Aged Leather, Smoky Woods'
    }
  }
];
