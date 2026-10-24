# Database Migrations

## Cara Menjalankan Migration

### Menggunakan Supabase Dashboard SQL Editor

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Masuk ke menu **SQL Editor** di sidebar kiri
4. Klik tombol **New query**
5. Copy-paste isi file `.sql` yang ingin dijalankan ke editor
6. Klik **Run** (atau tekan `Ctrl+Enter`)
7. Pastikan tidak ada error di bagian bawah

### Urutan Migration

Jalankan file-file berikut secara berurutan:

1. `001_apresiasi_komentar.sql` — Membuat tabel `apresiasi` dan `komentar`, beserta index dan Row Level Security (RLS)
2. `002_penulis.sql` — Membuat tabel `penulis` (calon penulis berita) + RLS `allow_all_penulis`, dan menambah kolom `penulis_id` (uuid FK ke `penulis(id)`) serta `penulis_nama` (text) di tabel `kegiatan`

### Catatan

- Migration bersifat idempotent (`IF NOT EXISTS`), aman dijalankan ulang
- Setelah menjalankan `001_apresiasi_komentar.sql`, tabel `apresiasi` dan `komentar` akan tersedia di database
- RLS sudah dikonfigurasi agar public dapat melakukan insert dan select (diperlukan untuk fitur komentar dan apresiasi di halaman news)
- Setelah menjalankan `002_penulis.sql`, tabel `penulis` tersedia dan tabel `kegiatan` memiliki kolom `penulis_id` + `penulis_nama` untuk fitur sistem penulis (FEAT-001)
- Channel aplikasi migration satu-satunya di environment ini adalah **Supabase Dashboard SQL Editor**. PostgREST (REST API `/rest/v1/...`) tidak bisa menjalankan DDL (`CREATE TABLE`/`ALTER TABLE`), dan tidak ada DB password / access token Management API (MCP Supabase menolak "Unauthorized"). Jadi migration wajib dijalankan manual lewat Dashboard, bukan via script REST.
