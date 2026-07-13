// Client Supabase (chave anon) para leitura do conteúdo público (lib/db.js).
// RLS do banco filtra o que o client anon enxerga (ver migration em T2).
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
