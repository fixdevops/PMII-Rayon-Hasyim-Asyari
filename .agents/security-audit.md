# Security Audit — PMII Rayon Hasyim Asy'ari

**Tanggal Audit:** 2025-06-22  
**Auditor:** Kiro Security Agent  
**Codebase:** `d:\web rayon hasyim asyari\rayonhasyimasyari`  
**Versi Next.js:** 16.3.1  

---

## Ringkasan Celah

| # | Severity | File | Deskripsi | Status |
|---|----------|------|-----------|--------|
| 1 | **KRITIS** | `src/app/api/komentar/[id]/route.ts` | Secret `rayon-admin-2025` hardcoded sebagai fallback — siapapun yang tahu string ini bisa hapus semua komentar tanpa perlu login | **FIXED** |
| 2 | **TINGGI** | `src/app/penulis/berita-saya/page.tsx`, `src/app/penulis/tulis/page.tsx` | IDOR: penulis hanya memvalidasi `penulis_id` dari localStorage tanpa verifikasi sisi server — penulis A bisa melihat/edit data penulis B dengan mengganti nilai di localStorage | **FIXED** |
| 3 | **MEDIUM** | `src/app/daftar-penulis/page.tsx` | Form daftar penulis tidak memiliki atribut `autoComplete` yang sesuai — browser bisa menyimpan dan menyarankan password ke form yang salah | **FIXED** |
| 4 | **MEDIUM** | `src/app/api/og/route.tsx` | SSRF: parameter `foto` dari query string langsung dirender sebagai `src` di `<img>` tanpa validasi domain — attacker bisa menyebabkan server mengambil URL arbitrer | **FIXED** |
| 5 | **INFO** | `src/lib/supabase.ts` | Anon key Supabase terdapat di source code (bukan service role key). Anon key memang dirancang untuk client-side, tetapi sebaiknya dipindahkan ke environment variable | **INFO** |

---

## Detail Setiap Celah

### Celah #1 — IDOR Komentar DELETE (KRITIS) — FIXED

**File:** `src/app/api/komentar/[id]/route.ts`  
**Masalah:** Mekanisme auth menggunakan `process.env.ADMIN_DELETE_SECRET ?? 'rayon-admin-2025'`. Karena variabel environment tidak di-set, fallback hardcoded `rayon-admin-2025` menjadi secret yang aktif. Siapapun yang mengetahui string ini dapat menghapus komentar manapun.

**Perbaikan yang diterapkan:**
- Ganti mekanisme auth dari "shared secret" ke "session token per-user yang disimpan di database"
- Saat login admin berhasil, generate session token 32-karakter hex acak menggunakan `crypto.getRandomValues`
- Token disimpan ke `localStorage` dan di-update ke kolom `session_token` di tabel `admin_users`
- API route DELETE kini memverifikasi token ke database — hanya token yang terdaftar yang diizinkan
- Saat logout, token dihapus dari localStorage

**Aksi manual yang diperlukan dari user:**
Jalankan perintah berikut di **Supabase SQL Editor** (Dashboard → SQL Editor):
```sql
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS session_token text;
```
Tanpa kolom ini, login admin akan tetap berhasil tetapi operasi DELETE komentar akan gagal dengan 401 sampai kolom tersedia.

---

### Celah #2 — IDOR Penulis (TINGGI) — FIXED

**File:** `src/app/penulis/berita-saya/page.tsx`, `src/app/penulis/tulis/page.tsx`  
**Masalah:** Halaman penulis hanya membaca `penulis_id` dari `localStorage` dan langsung menggunakannya untuk query database tanpa verifikasi server-side. Penulis bisa memanipulasi nilai localStorage untuk mengakses data penulis lain.

**Perbaikan yang diterapkan:**
- Buat endpoint `/api/penulis/verify` yang memverifikasi kombinasi `penulis_id` + `username` ke database, dengan validasi format UUID dan sanitasi username
- Di `berita-saya/page.tsx`: tambahkan verifikasi sebelum `load(id)` — jika tidak valid, session dibersihkan dan redirect ke login
- Di `tulis/page.tsx`: tambahkan verifikasi di awal `handleSubmit` sebelum insert ke database

---

### Celah #3 — Autocomplete bocor di form daftar penulis (MEDIUM) — FIXED

**File:** `src/app/daftar-penulis/page.tsx`  
**Masalah:** Form tidak memiliki atribut `autoComplete` yang tepat.

**Perbaikan yang diterapkan:**
- `<form autoComplete="off">` pada elemen form utama
- `autoComplete="name"` pada input nama
- `autoComplete="username"` pada input username
- `autoComplete="email"` pada input email
- `autoComplete="new-password"` pada input password

---

### Celah #4 — SSRF di OG Image (MEDIUM) — FIXED

**File:** `src/app/api/og/route.tsx`  
**Masalah:** Parameter `foto` dari query string langsung digunakan sebagai `src` pada `<img>` dalam `ImageResponse` tanpa validasi domain.

**Perbaikan yang diterapkan:**
- Tambahkan fungsi `isSafeFotoUrl()` dengan whitelist domain: `ajlsffxxlvnzukevlcna.supabase.co` dan `lh3.googleusercontent.com`
- Hanya URL dengan protokol `https:` yang diizinkan
- Jika URL tidak lolos whitelist, `foto` di-set ke string kosong (tidak ada gambar latar)

---

### Celah #5 — Service Role Key (INFO)

**Hasil pemeriksaan:**  
- Tidak ditemukan service role key di file `.ts`, `.tsx`, `.js`, `.mjs` manapun di dalam `src/`
- `src/lib/supabase.ts` hanya berisi **anon key** (bukan service role key)
- Anon key memang dirancang untuk client-side dan dibatasi oleh RLS Supabase

**Rekomendasi (bukan blocking):**  
Pindahkan anon key ke `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://ajlsffxxlvnzukevlcna.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<nilai anon key>
```
Lalu di `src/lib/supabase.ts`:
```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
```

---

## Aksi Manual yang Diperlukan dari User

> ⚠️ **WAJIB:** Jalankan SQL berikut di Supabase SQL Editor sebelum menggunakan fitur hapus komentar di admin panel:
> ```sql
> ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS session_token text;
> ```
> Buka: https://supabase.com/dashboard → Project `ajlsffxxlvnzukevlcna` → SQL Editor → Paste dan jalankan.

> 💡 **PENTING:** Service role key yang diberikan dalam instruksi audit ini sebaiknya segera di-rotate di Supabase Dashboard (Settings → API → Regenerate service role key), karena key tersebut telah terekspos dalam instruksi audit yang merupakan bagian dari workflow.
