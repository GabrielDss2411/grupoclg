// Camada de leitura do conteúdo dinâmico (cursos/congressos), com cache por
// tag (ADM-08/09): cada escrita do painel chama revalidateTag('cursos' |
// 'congressos') e a próxima leitura aqui regenera; se o banco cair durante a
// regeneração, unstable_cache lança e o Next serve a última versão (stale).
//
// RLS do banco (migration de T2) já restringe o client anon a `disponivel =
// true`; as funções abaixo não filtram de novo no código.
import { unstable_cache } from 'next/cache';
import { createClient } from './supabase/server.js';

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
