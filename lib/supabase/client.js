// Client Supabase (chave anon) para uso em Client Components do painel
// (ex.: app/admin/login/page.jsx). Sessão fica em cookies (padrão @supabase/ssr),
// lida no servidor por lib/supabase/server-actions.js e refrescada por middleware.js.
// Não confundir com lib/supabase/server.js (client anon simples do site público,
// usado por lib/db.js -- este arquivo não mexe naquele).
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
