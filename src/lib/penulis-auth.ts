// Hash password penulis memakai Web Crypto API (SHA-256) tanpa dependency baru.
// Dipakai simetris di pendaftaran & login penulis.
// Catatan: tanpa salt agar tetap bisa dibandingkan via query `.eq('password_hash', hash)`.
export async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}
