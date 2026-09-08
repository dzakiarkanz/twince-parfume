'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import type { Product } from '../types/product';

type Recommendation = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

type SommelierResult = {
  response: string;
  recommendedProduct: Recommendation;
};

type AiSommelierModalProps = {
  onNotify?: (message: string) => void;
};

const QUICK_PROMPTS = [
  'Parfum untuk kencan malam',
  'Aroma segar untuk kerja siang',
  'Aroma tenang seperti hujan'
];

export default function AiSommelierModal({ onNotify }: AiSommelierModalProps) {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<SommelierResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const askSommelier = async (prompt: string) => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || isLoading) return;

    setMessage(trimmedPrompt);
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/sommelier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedPrompt })
      });
      const payload = await response.json() as SommelierResult & { error?: string };
      if (!response.ok) throw new Error(payload.error || 'Sommelier sedang tidak tersedia.');
      setResult(payload);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Sommelier sedang tidak tersedia.');
    } finally {
      setIsLoading(false);
    }
  };

  const addRecommendation = () => {
    if (!result) return;
    const product: Product | undefined = PRODUCTS.find((item) => item.id === result.recommendedProduct.id);
    if (!product) return;
    addToCart(product);
    onNotify?.(`${product.name} ditambahkan ke bag.`);
    setIsOpen(false);
  };

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className="fixed bottom-20 right-6 z-40 whitespace-nowrap border border-amber-400/30 bg-neutral-900/90 px-4 py-2.5 text-xs uppercase tracking-[0.18em] text-amber-400 shadow-lg backdrop-blur-md transition hover:border-amber-400 hover:bg-neutral-800" aria-label="Buka AI Sommelier">
        <i className="fa-solid fa-wand-magic-sparkles mr-2" />AI Sommelier
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-end justify-end bg-black/65 p-4 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="ai-sommelier-title">
          <div className="w-full max-w-md border border-white/10 bg-neutral-950 text-neutral-300 shadow-2xl">
            <header className="flex items-start justify-between border-b border-white/10 px-5 py-5">
              <div><p className="text-[10px] uppercase tracking-[0.28em] text-amber-400">TWINCE Concierge</p><h2 id="ai-sommelier-title" className="mt-1 font-serif text-2xl text-white">AI Fragrance Sommelier</h2></div>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Tutup AI Sommelier" className="text-xl text-neutral-500 transition hover:text-amber-400"><i className="fa-solid fa-xmark" /></button>
            </header>

            <div className="max-h-[70svh] space-y-5 overflow-y-auto px-5 py-5">
              <p className="text-sm leading-relaxed text-neutral-400">Ceritakan suasana, aktivitas, atau karakter yang ingin Anda pancarkan. Saya akan meracik arah aroma yang paling tepat.</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((prompt) => <button key={prompt} type="button" onClick={() => askSommelier(prompt)} className="border border-white/10 px-3 py-2 text-left text-[10px] text-neutral-300 transition hover:border-amber-400 hover:text-amber-400">{prompt}</button>)}
              </div>

              {result && !isLoading && (
                <div className="border border-amber-400/30 bg-white/[0.03] p-4">
                  <p className="text-sm leading-relaxed text-neutral-200">{result.response}</p>
                  <div className="mt-4 flex gap-4 border-t border-white/10 pt-4">
                    <img src={result.recommendedProduct.image} alt={result.recommendedProduct.name} className="h-20 w-16 object-cover brightness-90" />
                    <div className="min-w-0 flex-1"><p className="text-[10px] uppercase tracking-[0.2em] text-amber-400">{result.recommendedProduct.category}</p><h3 className="font-serif text-xl text-white">{result.recommendedProduct.name}</h3><p className="mt-1 text-sm text-neutral-300">Rp {result.recommendedProduct.price.toLocaleString('id-ID')}</p><button type="button" onClick={addRecommendation} className="mt-3 border border-amber-400 bg-amber-400 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-950 transition hover:bg-transparent hover:text-amber-400">+ Tambahkan ke Bag</button></div>
                  </div>
                </div>
              )}
              {isLoading && <p className="border border-white/10 px-4 py-4 text-sm text-amber-400">Meracik rekomendasi aroma...</p>}
              {error && <p className="border border-red-400/30 px-4 py-4 text-sm text-red-300">{error}</p>}

              <form onSubmit={(event) => { event.preventDefault(); void askSommelier(message); }} className="flex gap-2 border-t border-white/10 pt-5">
                <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Contoh: aroma untuk makan malam..." className="min-w-0 flex-1 border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-amber-400" aria-label="Pesan untuk AI Sommelier" />
                <button type="submit" disabled={isLoading || !message.trim()} className="border border-amber-400 px-4 text-[10px] uppercase tracking-[0.16em] text-amber-400 transition hover:bg-amber-400 hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-40">Kirim</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
