// Client Supabase autenticado para Server Actions / Server Components do
// painel (/admin), via @supabase/ssr + cookies de next/headers.
//
// Deliberadamente SEPARADO de lib/supabase/server.js: aquele é o client anon
// simples usado por lib/db.js para o site público (Fase 3) e não deve ser
// tocado. Este client carrega a sessão do usuário logado (cookies), então as
// escritas do painel rodam sob RLS "authenticated" -- nunca com service role
// key (não existe no .env.local e não deve ser adicionada).
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Chamado a partir de um Server Component (sem permissão de
            // escrever cookie) -- inofensivo aqui porque middleware.js já
            // cuida do refresh de sessão nesse caso.
          }
        },
      },
    }
  );
}
