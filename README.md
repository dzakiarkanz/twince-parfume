# 🌿 Twince - Modern E-Commerce Platform

> **Live Demo:** [twince-parfume.vercel.app](https://twince-parfume.vercel.app/) <br />
> **Project Status:** 🚀 **Active MVP / Beta v0.9** (Actively maintained & developed)

---

## 📌 Project Overview
Twince adalah platform e-commerce produk wewangian (*fragrance*) editorial modern yang dibangun menggunakan arsitektur Next.js 14 App Router. Platform ini dirancang dengan fokus pada estetika visual luxury editorial, performa tinggi, navigasi responsif, SEO-ready metadata, serta integrasi konsultasi aroma cerdas berbasis kecerdasan buatan (*AI Scent Sommelier*).

### 🛠️ Tech Stack & Tools

- **Framework:** Next.js 14 (App Router)
- **UI & Styling:** React 18, Tailwind CSS, custom glassmorphism utilities, Lucide Icons
- **AI Engine:** Google Gemini API (`@google/genai`)
- **Telemetry & SEO:** Google Analytics 4 (custom event tracking), JSON-LD schema, dynamic sitemap & robots
- **Deployment:** Vercel (continuous deployment pipeline)

---

## ✨ Key Features

- **Luxury Editorial Landing Page:** Antarmuka responsif bernuansa editorial modern dengan mikro-interaksi yang halus.
- **Dynamic Catalog & Filter:** Kurasi dan filter profil aroma secara instan di sisi klien.
- **Interactive Scent Finder Quiz:** Kuis interaktif untuk mencocokkan varian wewangian berdasarkan karakter pengguna.
- **Cart Drawer & WhatsApp Lead Flow:** Keranjang belanja interaktif dengan generator format pemesanan instan via WhatsApp.
- **Production-Ready SEO:** Optimasi perayapan mesin pencari dengan `sitemap.ts`, `robots.ts`, dan JSON-LD structured data.
- **GA4 E-Commerce Telemetry:** Event logging otomatis untuk interaksi penting pengguna:
  - `search`: Saat fitur pencarian katalog digunakan.
  - `view_item_list`: Saat filter koleksi atau aroma diubah.
  - `add_to_cart`: Saat produk berhasil dimasukkan ke keranjang belanja.
  - `begin_checkout`: Saat pemesanan dialihkan ke WhatsApp.
  - `generate_lead`: Saat ringkasan order WhatsApp selesai disusun.

---

## 🚦 Roadmap & Engineering Progress

| Fitur / Komponen | Status | Detail Implementasi |
| :--- | :--- | :--- |
| **Responsive Editorial Catalog** | ✅ Completed | Tailwind CSS + dynamic client filter |
| **Interactive Fragrance Quiz** | ✅ Completed | Client-side preference matcher |
| **Cart Drawer & Order Flow** | ✅ Completed | Local state persistence + WhatsApp checkout |
| **SEO & E-Commerce Telemetry** | ✅ Completed | Meta tags, sitemap, robots, GA4 event logging |
| **AI Scent Sommelier** | 🔄 In Progress | Gemini 2.5 Flash API Route Handler (`@google/genai`) |
| **Database & Auth Integration** | 🔄 In Progress | Supabase (PostgreSQL) + Prisma ORM |
| **Payment Gateway Sandbox** | 📋 Planned | Midtrans Snap integration |

---

## 📁 Project Architecture

```text
├── app/
│   ├── layout.tsx         # Root layout, SEO metadata, JSON-LD schema
│   ├── page.tsx           # Main page and interactive client components
│   ├── loading.tsx        # Suspense fallback UI
│   ├── not-found.tsx      # Custom 404 handler page
│   ├── sitemap.ts         # Dynamic XML sitemap generator
│   ├── robots.ts          # Search engine crawler policies
│   ├── globals.css        # Global tokens, glass effects, animations
│   └── api/
│       └── recommend/     # Next.js Route Handler for Gemini AI Sommelier
├── style.css              # Legacy bespoke styling utilities
└── public/                # Static assets, fonts, and brand media
```

## ⚙️ Getting Started (Local Development)

### 1. Clone & Install

```bash
git clone https://github.com/dzakiarkan/twince.git
cd twince
npm install
```

### 2. Environment Variables Setup

Buat file `.env.local` pada direktori root proyek:

```env
NEXT_PUBLIC_SITE_URL=https://twince-parfume.vercel.app
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

## 🔧 Troubleshooting Cache Windows / Dev Error

Jika mendapati kendala cache internal Next.js, jalankan perintah berikut di PowerShell:

```powershell
Remove-Item -Recurse -Force .next
npm.cmd run dev
```

## 🚀 Production Build & Validation

```bash
npm run build
npm run start
```

---
