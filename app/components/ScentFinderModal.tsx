'use client';

import { useState } from 'react';
import type { Product } from '../types/product';

type ScentFinderModalProps = {
  isOpen: boolean;
  products: Product[];
  onClose: () => void;
  onAddToCart: (product: Product) => void;
};

const QUESTIONS = [
  {
    title: 'Waktu/Aktivitas Utama',
    question: 'Kapan Anda paling sering mengenakan parfum?',
    options: [['Siang Hari', 'day', 'fa-sun'], ['Kantor/Formal', 'formal', 'fa-briefcase'], ['Malam/Kencan', 'night', 'fa-moon'], ['Santai', 'casual', 'fa-leaf']]
  },
  {
    title: 'Karakter Aroma Pilihan',
    question: 'Karakter aroma mana yang paling menggambarkan Anda?',
    options: [['Segar & Dingin', 'fresh', 'fa-wind'], ['Mewah & Kayu Berasap', 'woody', 'fa-tree'], ['Misterius & Floral Manis', 'mysterious', 'fa-eye'], ['Tenang & Alami', 'earthy', 'fa-spa']]
  },
  {
    title: 'Kesan yang Dicari',
    question: 'Kesan apa yang ingin Anda tinggalkan?',
    options: [['Enerjik', 'energetic', 'fa-bolt'], ['Berwibawa', 'authoritative', 'fa-crown'], ['Memikat', 'captivating', 'fa-star'], ['Santai', 'relaxed', 'fa-feather']]
  }
] as const;

const MATCHES: Record<string, string> = {
  day: 'p1', formal: 'p2', night: 'p3', casual: 'p4',
  fresh: 'p1', woody: 'p2', mysterious: 'p3', earthy: 'p4',
  energetic: 'p1', authoritative: 'p2', captivating: 'p3', relaxed: 'p4'
};

const REASONS: Record<string, string> = {
  p1: 'AÉTHER menyatukan citrus dan marine accord untuk kesan yang bersih, sejuk, dan penuh energi.',
  p2: 'IGNIS menghadirkan kehangatan sandalwood dan rempah dengan karakter kayu yang berwibawa.',
  p3: 'NOX memadukan floral gelap, vanilla oud, dan amber untuk jejak yang memikat dan misterius.',
  p4: 'TERRA membawa patchouli, moss, dan amberwood yang santai, alami, dan menenangkan.'
};

export default function ScentFinderModal({ isOpen, products, onClose, onAddToCart }: ScentFinderModalProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  if (!isOpen) return null;

  const score = answers.reduce<Record<string, number>>((result, answer) => {
    const productId = MATCHES[answer];
    if (productId) result[productId] = (result[productId] || 0) + 1;
    return result;
  }, {});
  const recommendedId = Object.entries(score).sort(([, left], [, right]) => right - left)[0]?.[0] || 'p1';
  const recommended = products.find((product) => product.id === recommendedId) || products[0];
  const completed = answers.length === QUESTIONS.length;

  const choose = (answer: string) => {
    setAnswers((current) => [...current.slice(0, step), answer]);
    if (step < QUESTIONS.length - 1) setStep(step + 1);
  };

  const reset = () => {
    setAnswers([]);
    setStep(0);
  };

  const close = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="scent-finder-title">
      <div className="relative max-h-[90svh] w-full max-w-3xl overflow-y-auto border border-white/10 bg-neutral-950 text-neutral-300 shadow-2xl">
        <button type="button" onClick={close} aria-label="Tutup Scent Finder" className="absolute right-5 top-5 z-10 text-xl text-neutral-500 transition hover:text-amber-400"><i className="fa-solid fa-xmark" /></button>
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <div className="mb-8 flex items-start justify-between gap-4 pr-8">
            <div><p className="text-[10px] uppercase tracking-[0.3em] text-amber-400">TWINCE Scent Finder</p><h2 id="scent-finder-title" className="mt-2 font-serif text-3xl text-white sm:text-4xl">Temukan aroma Anda</h2></div>
            <span className="text-xs uppercase tracking-[0.18em] text-neutral-500">{completed ? 'Hasil' : `Step ${step + 1}/3`}</span>
          </div>

          {!completed ? (
            <div>
              <div className="mb-8 h-px bg-white/10"><div className="h-px bg-amber-400 transition-all duration-500" style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} /></div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-amber-400">{QUESTIONS[step].title}</p>
              <h3 className="max-w-2xl font-serif text-2xl leading-tight text-white sm:text-3xl">{QUESTIONS[step].question}</h3>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {QUESTIONS[step].options.map(([label, value, icon]) => (
                  <button key={value} type="button" onClick={() => choose(value)} className="group flex items-center gap-4 border border-white/10 bg-white/[0.02] p-5 text-left transition hover:-translate-y-0.5 hover:border-amber-400/70 hover:bg-amber-400/10"><i className={`fa-solid ${icon} w-5 text-center text-amber-400`} /><span className="text-sm text-neutral-200 group-hover:text-white">{label}</span></button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-amber-400">Rekomendasi untuk Anda</p>
              <div className="mt-6 grid items-center gap-8 border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-[minmax(0,220px)_1fr] sm:p-7">
                <img src={recommended.image} alt={recommended.name} className="aspect-square w-full object-cover brightness-90" />
                <div><span className="text-[10px] uppercase tracking-[0.24em] text-neutral-500">{recommended.scentType} · Extrait de Parfum</span><h3 className="mt-2 font-serif text-4xl text-white">{recommended.name}</h3><p className="mt-4 text-sm leading-relaxed text-neutral-300">{REASONS[recommended.id]}</p><p className="mt-4 font-serif text-xl text-amber-400">Rp {recommended.price.toLocaleString('id-ID')}</p><button type="button" onClick={() => { onAddToCart(recommended); close(); }} className="mt-6 border border-amber-400 bg-amber-400 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-950 transition hover:bg-transparent hover:text-amber-400">+ Tambahkan ke Bag</button></div>
              </div>
              <button type="button" onClick={reset} className="mt-6 text-xs uppercase tracking-[0.18em] text-neutral-500 transition hover:text-amber-400">Ulangi Kuis</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
