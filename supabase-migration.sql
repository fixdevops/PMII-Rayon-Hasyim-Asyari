-- Jalankan SQL ini di Supabase Dashboard > SQL Editor
-- https://supabase.com/dashboard/project/ajlsffxxlvnzukevlcna/sql

-- 1. Tambah kolom thumbnail_url ke tabel kursus
ALTER TABLE kursus ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- 2. Buat storage bucket untuk kegiatan
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('kegiatan', 'kegiatan', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg'])
ON CONFLICT (id) DO NOTHING;

-- 3. Buat storage bucket untuk kursus/thumbnail
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('kursus', 'kursus', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg'])
ON CONFLICT (id) DO NOTHING;

-- 4. Policies storage kegiatan
CREATE POLICY "kegiatan_upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'kegiatan');
CREATE POLICY "kegiatan_read"   ON storage.objects FOR SELECT USING (bucket_id = 'kegiatan');
CREATE POLICY "kegiatan_delete" ON storage.objects FOR DELETE USING (bucket_id = 'kegiatan');
CREATE POLICY "kegiatan_update" ON storage.objects FOR UPDATE USING (bucket_id = 'kegiatan');

-- 5. Policies storage kursus
CREATE POLICY "kursus_upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'kursus');
CREATE POLICY "kursus_read"   ON storage.objects FOR SELECT USING (bucket_id = 'kursus');
CREATE POLICY "kursus_delete" ON storage.objects FOR DELETE USING (bucket_id = 'kursus');
CREATE POLICY "kursus_update" ON storage.objects FOR UPDATE USING (bucket_id = 'kursus');
