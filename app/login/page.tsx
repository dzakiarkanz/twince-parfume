'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.04),_transparent_28%),linear-gradient(180deg,_#ffffff_0%,_#f7f7f4_100%)] text-black">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.28em] font-bold text-black">
            TWINCE
          </Link>
          <Link href="/dashboard" className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-700 hover:text-black transition-colors">
            Dashboard Stok
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center mt-10">
          <div className="space-y-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs uppercase tracking-[0.28em] font-bold text-black block">Member Access</span>
              <h1 className="font-serif text-4xl md:text-6xl font-light leading-tight text-black">
                Masuk ke ruang member parfum TWINCE.
              </h1>
              <p className="text-sm md:text-base text-zinc-700 leading-relaxed">
                Login ini dipakai untuk akses awal member, preview katalog eksklusif, dan rujukan ke dashboard stok/order saat bisnis mulai bertumbuh.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                ['Akses cepat', 'Masuk tanpa flow ribet untuk calon pembeli serius.'],
                ['Preview member', 'Lihat varian, stok, dan status order awal.'],
                ['Siap scaling', 'Fondasi untuk CRM dan loyalty di fase berikutnya.']
              ].map(([title, copy]) => (
                <article key={title} className="rounded-2xl border border-black/15 bg-white/90 p-5 shadow-lg">
                  <h2 className="font-serif text-lg mb-2">{title}</h2>
                  <p className="text-xs text-zinc-700 leading-relaxed">{copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/15 bg-white/95 shadow-2xl p-6 md:p-8 backdrop-blur-sm">
            <div className="space-y-2 mb-8">
              <span className="text-xs uppercase tracking-[0.24em] font-bold text-black block">Login Member</span>
              <h2 className="font-serif text-3xl text-black font-light">Masuk ke akun Anda</h2>
            </div>

            <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
              <label className="block space-y-2">
                <span className="text-xs uppercase tracking-[0.16em] font-semibold text-zinc-700">Email</span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="nama@domain.com"
                  className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-xs uppercase tracking-[0.16em] font-semibold text-zinc-700">Password</span>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
                />
              </label>

              <div className="flex items-center justify-between gap-4 pt-1 text-sm">
                <label className="flex items-center gap-2 text-zinc-700">
                  <input
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    type="checkbox"
                    className="rounded border-black/20 text-black focus:ring-black"
                  />
                  Ingat saya
                </label>
                <a href="#" className="text-zinc-700 hover:text-black transition-colors">
                  Lupa password?
                </a>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  className="w-full rounded-full bg-black px-5 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-zinc-900"
                >
                  Masuk Member
                </button>
                <Link
                  href="/dashboard"
                  className="block w-full rounded-full border border-black/15 bg-white px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-white"
                >
                  Buka Dashboard Demo
                </Link>
              </div>
            </form>

            <p className="mt-6 text-[11px] leading-relaxed text-zinc-500">
              Demo login ini disiapkan untuk fase awal. Saat siap live, Anda bisa sambungkan OAuth, CRM, atau member portal.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
