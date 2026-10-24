# Implementation Plan — Sistem Penulis (News Writer)

Membangun sistem penulis berita: calon penulis daftar akun publik → admin
setujui/tolak di Pengaturan → penulis yang disetujui login → dashboard tulis
berita → hanya bisa kelola berita yang dia buat sendiri. Stack: Next.js 16
(Turbopack, App Router, `params` async), React 19, Supabase (anon key client di
`src/lib/supabase.ts`), TipTap `RichTextEditor` di `src/components/RichTextEditor.tsx`.

## Keputusan desain (dengan alasan)

- **Channel migration = Supabase Dashboard SQL Editor (manual), BUKAN script
  `migrate_penulis.mjs` via REST.** Alasan: PostgREST (REST API
  `/rest/v1/...`) tidak bisa menjalankan DDL (`CREATE TABLE`/`ALTER TABLE`) —
  dikonfirmasi via web search dan pesan error `PGRST205` di project ini.
  Service-role key hanya mengotentikasi ke PostgREST, bukan ke Management API /
  MCP (MCP `supabase::list_tables` menolak: "Unauthorized ... valid access
  token"). Tidak ada DB password / `SUPABASE_ACCESS_TOKEN` di environment.
  Jadi channel nyata satu-satunya adalah SQL Editor Dashboard — pola yang sama
  dipakai migration `001_apresiasi_komentar.sql` (lihat `migrations/README.md`).
  File `002_penulis.sql` dibuat; dijalankan manual di Dashboard. Build TIDAK
  bergantung pada tabel ada (query runtime, bukan compile-time), jadi
  `npm run build` lulus terlepas dari migration.

- **Password penulis di-hash SHA-256 (Web Crypto, tanpa dependency baru).**
  Alasan: kolom dinamai `password_hash`; menyimpan plaintext untuk akun publik
  berbahaya. Helper `hashPassword()` dipakai simetris di daftar & login. Tetap
  "sama pola admin" untuk flow-nya (query user by username + compare, simpan
  flag localStorage). Tanpa salt (untuk tetap bisa compare via query
  `.eq('password_hash', hash)`); catat keterbatasan ini.

- **"Status" di berita-saya diturunkan** karena tabel `kegiatan` tidak punya
  kolom status: badge "Tayang"; jika `konten` kosong tampilkan "Belum ada
  konten".

- **Scope penulis ke beritanya sendiri** ditegakkan dengan filter
  `.eq('penulis_id', currentPenulisId)` pada query/update/delete agar penulis
  tidak bisa sentuh berita orang lain.

- Style mengikuti constraint: `bg-white`, `#1a1a1a`, `#6b6b6b`, `#e5e5e5`.

---

## Checklist (urut sesuai dependency)

- [ ] 1. Buat migration SQL + dokumentasi.
      File buat: `src/lib/migrations/002_penulis.sql` (isi DDL: tabel `penulis`
      + RLS `allow_all_penulis` + `ALTER TABLE kegiatan ADD COLUMN penulis_id
      uuid REFERENCES penulis(id) ON DELETE SET NULL` + `penulis_nama text`).
      File ubah: `src/lib/migrations/README.md` (tambah `002_penulis.sql` ke
      urutan + catatan channel Dashboard). Salin persis DDL dari task.
      Verify: file ada & valid SQL; `npm run build` tetap 0; (runtime, setelah
      dijalankan di Dashboard) `node -e "fetch(.../rest/v1/penulis?select=id&limit=1 ...)"`
      mengembalikan 200 (bukan PGRST205). Migration diterapkan manual via
      Supabase Dashboard → SQL Editor karena REST tidak bisa DDL.

- [ ] 2. Buat helper auth penulis `src/lib/penulis-auth.ts`.
      Eksport `hashPassword(password: string): Promise<string>` memakai
      `crypto.subtle.digest('SHA-256', ...)` → hex. Tanpa dependency baru.
      Files: `src/lib/penulis-auth.ts`
      Verify: `npm run build` lulus (modul ter-typecheck).

- [ ] 3. Buat halaman daftar publik `src/app/daftar-penulis/page.tsx`.
      `'use client'`. Form: nama, username, email (opsional), password, bio
      (opsional). Submit: `hashPassword(password)` lalu
      `supabase.from('penulis').insert({ nama, username, email: email||null,
      password_hash: hash, bio: bio||null, status:'pending' })`. Tangani
      konflik username unik (error 409/23505 → "Username sudah digunakan").
      Pesan sukses: "Pendaftaran berhasil! Menunggu persetujuan admin." Style:
      kartu tengah di `bg-white`, skema warna publik. Link "Sudah punya akun?
      Masuk" → `/login-penulis`. Ubah `src/components/Footer.tsx`: tambah link
      "/daftar-penulis" (label "Daftar Penulis") di daftar Halaman.
      Files: `src/app/daftar-penulis/page.tsx`, `src/components/Footer.tsx`
      Verify: `npm run build` lulus; route `/daftar-penulis` ter-build.

- [ ] 4. Buat halaman login penulis `src/app/login-penulis/page.tsx`.
      `'use client'`. Form username + password (dengan toggle show/hide seperti
      `rayonerabarulogin`). Submit: `hashPassword(password)` lalu
      `supabase.from('penulis').select('id,nama,username,status')
      .eq('username',u).eq('password_hash',hash).maybeSingle()`. Jika ada &
      status='aktif': simpan `localStorage` `penulis_logged_in=true`,
      `penulis_id`, `penulis_nama`, `penulis_username`; redirect `/penulis`.
      status='pending' → "Akun belum disetujui admin." status='nonaktif' →
      "Akun dinonaktifkan." tidak ketemu → "Username atau password salah."
      Style: kartu tengah, bg putih/abu (`bg-gray-50`/`bg-white`) — bukan
      gradien biru admin. Link "Belum punya akun? Daftar jadi penulis" →
      `/daftar-penulis`.
      Files: `src/app/login-penulis/page.tsx`
      Verify: `npm run build` lulus; route `/login-penulis` ter-build.

- [ ] 5. Buat layout dashboard penulis `src/app/penulis/layout.tsx`.
      `'use client'`. Guard: jika tidak ada `localStorage.penulis_logged_in` →
      `router.replace('/login-penulis')`. Sidebar: Dashboard, Tulis Berita,
      Berita Saya, Keluar (mirror struktur `admin/layout.tsx` tapi lebih
      sederhana, skema warna publik `#1a1a1a/#6b6b6b/#e5e5e5`, bg `#f5f5f5`,
      sidebar putih). Header: nama penulis (dari localStorage) + tombol logout
      (clear `penulis_*`, redirect `/login-penulis`). Pakai `next/image` untuk
      logo seperti admin.
      Files: `src/app/penulis/layout.tsx`
      Verify: `npm run build` lulus.

- [ ] 6. Buat dashboard penulis `src/app/penulis/page.tsx`.
      `'use client'`. Stats: `supabase.from('kegiatan').select('id',
      {count:'exact',head:true}).eq('penulis_id', penulisId)`. Quick action
      "Tulis Berita Baru" → `/penulis/tulis`. List 5 berita terbaru milik
      penulis (`select('id,judul,slug,tanggal,foto_url').eq('penulis_id',
      penulisId).order('tanggal',{ascending:false}).limit(5)`). Mirror pola
      kartu `admin/page.tsx`.
      Files: `src/app/penulis/page.tsx`
      Verify: `npm run build` lulus.

- [ ] 7. Buat form tulis berita `src/app/penulis/tulis/page.tsx`.
      `'use client'`. Full-page form (bukan modal) = field modal
      `admin/kegiatan` TANPA kategori: upload foto (bucket Storage `kegiatan`,
      pola `uploadFoto`), judul, tanggal, lokasi, motivasi/deskripsi, konten
      via `dynamic(() => import('@/components/RichTextEditor'), {ssr:false})`.
      Copy-paste fungsi `generateSlug` dari `src/app/admin/kegiatan/page.tsx`.
      Submit (two-step seperti admin): insert kegiatan dengan `penulis_id` +
      `penulis_nama` dari localStorage, foto_url null → upload foto ke
      `${id}.${ext}` (upsert) → update slug+foto_url. Redirect
      `/penulis/berita-saya`.
      Files: `src/app/penulis/tulis/page.tsx`
      Verify: `npm run build` lulus; route `/penulis/tulis` ter-build.

- [ ] 8. Buat daftar berita penulis `src/app/penulis/berita-saya/page.tsx`.
      `'use client'`. Query `kegiatan` `select('*').eq('penulis_id', penulisId)
      .order('tanggal',{ascending:false})`. Tampilkan judul, tanggal, status
      (badge "Tayang" / "Belum ada konten" bila konten kosong). Tombol: edit
      (modal pre-filled, field sama dengan tulis; update dgn
      `.eq('id',id).eq('penulis_id',penulisId)`), hapus (confirm → remove foto
      dari storage `fotoUrl.split('/kegiatan/')[1]?.split('?')[0]` →
      `supabase.storage.from('kegiatan').remove([path])` → delete row dgn
      `.eq('id',id).eq('penulis_id',penulisId)`).
      Files: `src/app/penulis/berita-saya/page.tsx`
      Verify: `npm run build` lulus; route `/penulis/berita-saya` ter-build.

- [ ] 9. Tambah section "Manajemen Penulis" di
      `src/app/admin/pengaturan/page.tsx`.
      Tambah section baru (state: list penulis, tab aktif, loading) di bawah
      kartu "Ganti Password". Tabs: Pending | Aktif | Nonaktif (badge counter di
      tab Pending = jumlah status='pending'). Tabel: nama, username, email,
      tgl daftar, status. Aksi: Pending→Setujui (`update status:'aktif'`) +
      Tolak (`delete`); Aktif→Nonaktifkan (`update status:'nonaktif'`);
      Nonaktif→Aktifkan kembali (`update status:'aktif'`) + Hapus (`delete`).
      Reload list setelah aksi. Pakai `supabase` anon client (RLS allow_all).
      Files: `src/app/admin/pengaturan/page.tsx`
      Verify: `npm run build` lulus; halaman `/admin/pengaturan` ter-build.

- [ ] 10. Tampilkan nama penulis di author row `src/app/news/[slug]/page.tsx`.
      Tambah `penulis_nama: string | null` ke interface `Kegiatan` (getBySlug
      pakai `select('*')` jadi sudah include). Di author row atas: jika
      `kegiatan.penulis_nama` truthy → tampilkan `penulis_nama`, jika tidak
      tetap "Redaksi Rayon Hasyim Asy'ari" (logo tetap). Komponen server (no
      `'use client'`), `params` async (sudah benar). Jangan ubah bio card bawah.
      Files: `src/app/news/[slug]/page.tsx`
      Verify: `npm run build` lulus.

- [ ] 11. Verifikasi akhir: jalankan `npm run build` sampai exit 0, fix semua
      error (TypeScript/lint/Next). Jangan commit.
      Verify: `npm run build` exit code 0.

## Catatan risiko
- Migration wajib dijalankan manual di Supabase Dashboard SQL Editor agar
  fitur runtime (FEAT penulis/admin) berfungsi. Build lulus tanpa migration.
- Jika project dibuat setelah 28 Apr 2026, tabel baru mungkin tidak
  terekspos ke Data API secara default — verifikasi dengan query REST setelah
  membuat tabel; jika 404, enable di Dashboard → Integrations → Data API.
- `crypto.subtle` butuh secure context (https/localhost) — terpenuhi di dev
  & produksi.
