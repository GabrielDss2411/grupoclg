// Middleware de sessão do painel (ADM-01/02): refresca o cookie de sessão do
// Supabase Auth em toda navegação sob /admin. Não afeta rotas públicas
// (matcher restrito), então o site institucional (Fases 1-3) não passa por
// aqui.
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // getUser() valida o JWT com o servidor Auth (não confia só no cookie) e
  // dispara o refresh acima quando necessário, antes que a rota seja servida.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
