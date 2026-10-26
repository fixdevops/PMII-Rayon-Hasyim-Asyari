import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

const BASE_URL = 'https://www.pmiirayonhasyimasyari.my.id'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Halaman statis
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/kegiatan`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/anggota`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/galeri`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/visi-misi`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/kaderisasi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/roadmap`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/daftar-penulis`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Halaman dinamis: semua artikel news
  let newsPages: MetadataRoute.Sitemap = []
  try {
    const { data: articles } = await supabase
      .from('kegiatan')
      .select('slug, tanggal')
      .order('tanggal', { ascending: false })

    if (articles) {
      newsPages = articles.map((article) => ({
        url: `${BASE_URL}/news/${article.slug}`,
        lastModified: article.tanggal ? new Date(article.tanggal) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))
    }
  } catch {
    // Jika gagal fetch, sitemap tetap berjalan dengan halaman statis saja
  }

  return [...staticPages, ...newsPages]
}
