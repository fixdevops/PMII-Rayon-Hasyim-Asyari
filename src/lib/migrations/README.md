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

### Catatan

- Migration bersifat idempotent (`IF NOT EXISTS`), aman dijalankan ulang
- Setelah menjalankan `001_apresiasi_komentar.sql`, tabel `apresiasi` dan `komentar` akan tersedia di database
- RLS sudah dikonfigurasi agar public dapat melakukan insert dan select (diperlukan untuk fitur komentar dan apresiasi di halaman news)
