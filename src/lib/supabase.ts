import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ajlsffxxlvnzukevlcna.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqbHNmZnh4bHZuenVrZXZsY25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMjIwNjUsImV4cCI6MjEwMjg5ODA2NX0.HJkZqLps0vITdDAWRNV-W5oVfcN9w8FCf0VXkWT3mt4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
