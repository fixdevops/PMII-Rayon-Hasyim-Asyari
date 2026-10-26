import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.pmiirayonhasyimasyari.my.id'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/48e380785bb0d545d7d4395d/',  // admin panel
          '/604b372a5fea5412409e90b8/',  // halaman internal
          '/api/',
          '/login-penulis/',
          '/penulis/',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
