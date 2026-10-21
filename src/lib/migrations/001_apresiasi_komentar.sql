-- Tabel apresiasi (clap per artikel)
CREATE TABLE IF NOT EXISTS apresiasi (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kegiatan_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Tabel komentar
CREATE TABLE IF NOT EXISTS komentar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kegiatan_id text NOT NULL,
  nama text NOT NULL,
  isi text NOT NULL,
  parent_id uuid REFERENCES komentar(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_apresiasi_kegiatan ON apresiasi(kegiatan_id);
CREATE INDEX IF NOT EXISTS idx_komentar_kegiatan ON komentar(kegiatan_id);
CREATE INDEX IF NOT EXISTS idx_komentar_parent ON komentar(parent_id);

-- RLS: allow public insert & select
ALTER TABLE apresiasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE komentar ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_apresiasi" ON apresiasi FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_komentar" ON komentar FOR ALL USING (true) WITH CHECK (true);
