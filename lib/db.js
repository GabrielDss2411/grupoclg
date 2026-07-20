// Camada de leitura do conteúdo dinâmico (cursos/congressos), com cache por
// tag (ADM-08/09): cada escrita do painel chama revalidateTag('cursos' |
// 'congressos') e a próxima leitura aqui regenera; se o banco cair durante a
// regeneração, unstable_cache lança e o Next serve a última versão (stale).
//
// RLS do banco (migration de T2) já restringe o client anon a `disponivel =
// true`; as funções abaixo não filtram de novo no código.
import { unstable_cache } from 'next/cache';
import { createClient } from './supabase/server.js';

// Resiliência de build: durante `next build` (SSG / generateStaticParams), uma
// falha de leitura do banco (ex.: variáveis do Supabase ausentes no ambiente de
// build) NÃO deve quebrar o deploy. Nesse caso retorna um fallback e as páginas
// renderizam sob demanda ou vazias, preenchendo via ISR quando o banco estiver
// acessível. Em runtime o erro propaga normalmente, para o Next servir a última
// versão gerada (stale) e nunca cachear conteúdo vazio.
const emBuild = () => process.env.NEXT_PHASE === 'phase-production-build';

export async function seguroNoBuild(promise, fallback) {
  try {
    return await promise;
  } catch (erro) {
    if (emBuild()) {
      console.warn('[build] leitura do banco falhou, usando fallback:', erro?.message);
      return fallback;
    }
    throw erro;
  }
}

async function fetchCursos() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('cursos')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

async function fetchCurso(slug) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('cursos')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

async function fetchCongressos() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('congressos')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

async function fetchCongresso(slug) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('congressos')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

async function fetchArtigos() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('artigos')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

async function fetchArtigo(slug) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('artigos')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export const getCursos = unstable_cache(fetchCursos, ['cursos-list'], {
  tags: ['cursos'],
  revalidate: 3600,
});

export const getCurso = unstable_cache(fetchCurso, ['cursos-detail'], {
  tags: ['cursos'],
  revalidate: 3600,
});

export const getCongressos = unstable_cache(fetchCongressos, ['congressos-list'], {
  tags: ['congressos'],
  revalidate: 3600,
});

export const getCongresso = unstable_cache(fetchCongresso, ['congressos-detail'], {
  tags: ['congressos'],
  revalidate: 3600,
});

export const getArtigos = unstable_cache(fetchArtigos, ['artigos-list'], {
  tags: ['artigos'],
  revalidate: 3600,
});

export const getArtigo = unstable_cache(fetchArtigo, ['artigos-detail'], {
  tags: ['artigos'],
  revalidate: 3600,
});
