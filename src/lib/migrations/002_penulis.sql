-- Tabel penulis (calon penulis berita yang mendaftar publik)
CREATE TABLE IF NOT EXISTS penulis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nama text NOT NULL,
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  email text,
  bio text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- RLS: allow public read/write dari client anon (sama pola dgn 001)
ALTER TABLE penulis ENABLE ROW LEVEL SECURITY;

CREATE POLICY allow_all_penulis ON penulis FOR ALL USING (true) WITH CHECK (true);

-- Tambah kolom penulis di tabel kegiatan (berita) untuk relasi penulis -> berita
ALTER TABLE kegiatan ADD COLUMN IF NOT EXISTS penulis_id uuid REFERENCES penulis(id) ON DELETE SET NULL;
ALTER TABLE kegiatan ADD COLUMN IF NOT EXISTS penulis_nama text;
