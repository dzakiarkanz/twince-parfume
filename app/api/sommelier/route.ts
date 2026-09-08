import { NextResponse } from 'next/server';
import { PRODUCTS } from '../../data/products';

const INTENT_RULES = [
  { productId: 'p1', keywords: ['segar', 'fresh', 'dingin', 'siang', 'pantai', 'marine', 'enerjik', 'energetic', 'kerja'] },
  { productId: 'p2', keywords: ['kayu', 'woody', 'amber', 'hangat', 'malam', 'kharismatik', 'formal', 'meeting', 'berasap', 'sandalwood'] },
  { productId: 'p3', keywords: ['misterius', 'memikat', 'kencan', 'floral', 'manis', 'glamor', 'glamour', 'oud', 'romantis'] },
  { productId: 'p4', keywords: ['tenang', 'hujan', 'relaksasi', 'santai', 'alami', 'earthy', 'outdoor', 'relax', 'moss'] }
] as const;

const RESPONSES: Record<string, string> = {
  p1: 'AÉTHER terasa seperti udara pagi di tepi laut: bergamot yang bening dan marine accord yang dingin meninggalkan jejak bersih, ringan, dan penuh energi.',
  p2: 'IGNIS menyatukan sandalwood dan cardamom dalam kehangatan amber yang tenang. Ia cocok untuk suasana formal ketika Anda ingin hadir dengan wibawa yang terasa alami.',
  p3: 'NOX bergerak seperti cahaya malam di atas kelopak gelap: black jasmine, orchid, dan vanilla oud membentuk aura floral oriental yang misterius serta memikat.',
  p4: 'TERRA membawa ketenangan setelah hujan. Patchouli, earthy moss, dan amberwood menyatu menjadi aroma yang membumi, lembut, dan memberi ruang untuk bernapas.'
};

export async function POST(request: Request) {
  try {
    const body = await request.json() as { message?: unknown };
    const message = typeof body.message === 'string' ? body.message.trim().toLowerCase() : '';

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const scores = INTENT_RULES.map((rule) => ({
      productId: rule.productId,
      score: rule.keywords.reduce((score, keyword) => score + (message.includes(keyword) ? 1 : 0), 0)
    }));
    const recommendation = scores.sort((left, right) => right.score - left.score)[0];
    const product = PRODUCTS.find((item) => item.id === recommendation.productId) || PRODUCTS[0];

    return NextResponse.json({
      response: RESPONSES[product.id],
      recommendedProduct: {
        id: product.id,
        name: product.name,
        category: product.scentType,
        price: product.price,
        image: product.image
      }
    });
  } catch {
    return NextResponse.json({ error: 'Unable to prepare a recommendation.' }, { status: 400 });
  }
}
