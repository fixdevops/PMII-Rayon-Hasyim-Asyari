-- Tabel untuk menyimpan profil Sahabat Firzan (ketua/profil utama)
CREATE TABLE IF NOT EXISTS profil_firzan (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  foto_url text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- RLS: allow public select, admin insert/update
ALTER TABLE profil_firzan ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_all_profil_firzan" ON profil_firzan FOR ALL USING (true) WITH CHECK (true);

-- Insert default row (pakai foto lokal sebagai fallback)
INSERT INTO profil_firzan (foto_url)
VALUES ('/yon azam.webp')
ON CONFLICT DO NOTHING;
