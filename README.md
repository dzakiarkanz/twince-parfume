# TWINCE Perfume Website (Next.js 14)

Website parfum premium dengan fitur:
- Landing page editorial premium
- Filter produk
- Cart drawer
- Scent Finder quiz
- CTA order WhatsApp

Project ini cocok untuk website modern di 2026 karena sudah menyentuh UI polish, interaction UX, SEO dasar, dan readiness deployment.

## Struktur Project
- `app/layout.tsx`: root layout, metadata SEO, schema JSON-LD, dan konfigurasi global halaman.
- `app/page.tsx`: halaman utama + seluruh interaksi client-side (cart, quiz, toast, menu, checkout).
- `app/globals.css`: animation, glass effect, dan utility custom global.
- `style.css`: legacy style tambahan untuk estetika awal.
- `app/robots.ts`: robots rules untuk crawler.
- `app/sitemap.ts`: sitemap otomatis untuk indexing.
- `app/loading.tsx`: loading fallback route.
- `app/not-found.tsx`: halaman 404 custom.

## Menjalankan Project
Gunakan `npm.cmd` di PowerShell Windows jika policy script ketat.

```bash
npm install
npm.cmd run dev
```

Buka:

```text
http://localhost:3000
```

## Build Production
```bash
npm.cmd run build
npm.cmd run start
```

## Jika Muncul Error Dev Cache (contoh: Cannot find module ./*.js)
```bash
Remove-Item -Recurse -Force .next
npm.cmd run dev
```

## Environment Variable (Opsional tapi Disarankan)
Set URL domain production supaya metadata canonical/sitemap akurat.

```text
NEXT_PUBLIC_SITE_URL=https://domain-kamu.com
```

## Roadmap Belajar (Pemula -> Siap Kerja)
1. **Frontend Foundation**
	Pahami komponen React, props, state, event, conditional rendering.
2. **UX Execution**
	Fokus ke hierarchy visual, spacing rhythm, readability, micro-interaction.
3. **Performance & SEO**
	Terapkan metadata, sitemap, robots, optimasi asset.
4. **Backend Integration**
	Lanjutkan ke API order, payment gateway, auth admin dashboard.
5. **Deployment & Monitoring**
	Deploy ke Vercel/Azure, pasang analytics, error tracking, uptime monitor.

## Target Nilai 10/10 untuk Website Ini
Checklist kualitas:
- [x] UI premium dan konsisten
- [x] Interaction halus (hover, active, transition)
- [x] Responsive desktop/mobile
- [x] Build production lulus
- [x] SEO dasar siap (metadata + robots + sitemap)
- [ ] Integrasi backend order database
- [ ] Integrasi payment dan dashboard admin
- [ ] Testing otomatis (unit/e2e)

Jika tiga poin terakhir selesai, website ini sudah sangat dekat ke level production komersial penuh.
