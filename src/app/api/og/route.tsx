import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const judul = searchParams.get('judul') ?? 'PMII Rayon Hasyim Asy\'ari'
  const deskripsi = searchParams.get('deskripsi') ?? 'Berita dan kegiatan terkini'
  const foto = searchParams.get('foto') ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          backgroundColor: '#0a1628',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background foto artikel */}
        {foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={foto}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : null}

        {/* Overlay gelap gradient bawah */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: foto
              ? 'linear-gradient(to bottom, rgba(10,22,40,0.2) 0%, rgba(10,22,40,0.55) 40%, rgba(10,22,40,0.92) 100%)'
              : 'linear-gradient(135deg, #0a1628 0%, #0d3060 100%)',
          }}
        />

        {/* Konten */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '48px 60px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Logo + nama */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#fbbf24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 700,
                color: '#0a1628',
              }}
            >
              R
            </div>
            <span style={{ color: '#e5e5e5', fontSize: '18px', fontWeight: 600 }}>
              PMII Rayon Hasyim Asy&apos;ari
            </span>
          </div>

          {/* Judul */}
          <div
            style={{
              color: '#ffffff',
              fontSize: judul.length > 60 ? '36px' : '44px',
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
              maxWidth: '1000px',
            }}
          >
            {judul.length > 80 ? judul.slice(0, 80) + '…' : judul}
          </div>

          {/* Deskripsi */}
          {deskripsi && (
            <div
              style={{
                color: '#d1d5db',
                fontSize: '22px',
                lineHeight: 1.5,
                maxWidth: '900px',
                fontStyle: 'italic',
              }}
            >
              {deskripsi.length > 120 ? deskripsi.slice(0, 120) + '…' : deskripsi}
            </div>
          )}

          {/* Domain */}
          <div style={{ color: '#9ca3af', fontSize: '16px', marginTop: '4px' }}>
            pmiirayonhasyimasyari.my.id
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
