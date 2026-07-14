'use server';
// Server Actions do painel (ADM-02/03/04/05/08). Toda escrita passa por aqui:
// (1) exige sessão via getUser() do client autenticado -- defesa em código,
//     RLS (authenticated) é a segunda camada (spec P1-A/4, design.md);
// (2) valida obrigatórios/limites antes de tocar o banco;
// (3) slug: gerado só na criação (slugify + sufixo -2, -3... em colisão),
//     imutável na edição (não recalculado, não reenviado no payload);
// (4) upsert por id -- chamar duas vezes com os mesmos dados não duplica
//     (AC P1-B/8): o "id" já presente faz o Postgres cair no caminho de
//     UPDATE (ON CONFLICT), nunca em um INSERT novo;
// (5) erro de rede/banco retorna { ok:false, error }, nunca lança (preserva o
//     form no cliente -- AC P1-B/7);
// (6) sucesso: revalidateTag + revalidatePath (ADM-08, publica em segundos).
import { revalidateTag, revalidatePath } from 'next/cache';
// Import relativo (não '@/...'): tests/actions.test.mjs roda em Vitest puro,
// sem o resolver de alias do Next (jsconfig.json só é lido pelo webpack).
import { createClient } from '../../lib/supabase/server-actions.js';

const MAX_TITULO = 200;
const MAX_DESCRICAO = 2000;
const ERRO_SESSAO = 'Sessão expirada, entre novamente.';
const ERRO_BANCO = 'Não foi possível salvar. Tente novamente.';
const ERRO_OBRIGATORIOS = 'Preencha os campos obrigatórios.';

async function requireUser(supabase) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ?? null;
}

// AD-006-adjacent: gera slug estável a partir de texto livre -- minúsculas,
// sem acento, espaços/underscores viram hífen, sem caractere não alfanumérico.
function slugify(input) {
  return String(input || '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// AC P1-B/6 / P1-C/6: colisão de slug ganha sufixo numérico até achar livre.
async function uniqueSlug(supabase, table, base) {
  let candidate = base;
  let n = 2;
  for (;;) {
    const { data, error } = await supabase.from(table).select('id').eq('slug', candidate).maybeSingle();
    if (error) throw error;
    if (!data) return candidate;
    candidate = `${base}-${n}`;
    n += 1;
  }
}

function parseJsonField(formData, name, fallback) {
  const raw = formData.get(name);
  if (raw === null || raw === undefined || raw === '') return fallback;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function str(formData, name, fallback = '') {
  const v = formData.get(name);
  return v === null || v === undefined ? fallback : String(v);
}

function validarCurso({ title, cat, descricao, poster }) {
  const fields = [];
  if (!title || !title.trim()) fields.push('title');
  if (!cat || !cat.trim()) fields.push('cat');
  if (!descricao || !descricao.trim()) fields.push('descricao');
  if (!poster || !poster.trim()) fields.push('poster');
  if (fields.length) return { ok: false, error: ERRO_OBRIGATORIOS, fields };
  if (title.length > MAX_TITULO) {
    return { ok: false, error: `Título deve ter no máximo ${MAX_TITULO} caracteres.`, fields: ['title'] };
  }
  if (descricao.length > MAX_DESCRICAO) {
    return { ok: false, error: `Descrição deve ter no máximo ${MAX_DESCRICAO} caracteres.`, fields: ['descricao'] };
  }
  return null;
}

function isValidIso(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime());
}

function validarCongresso({ nome, edicao, datas, iso, localChip, formato, cardDesc }) {
  const fields = [];
  if (!nome || !nome.trim()) fields.push('nome');
  if (!edicao || !edicao.trim()) fields.push('edicao');
  if (!datas || !datas.trim()) fields.push('datas');
  if (!iso || !iso.trim()) fields.push('iso');
  if (!localChip || !localChip.trim()) fields.push('local_chip');
  if (!formato || !formato.trim()) fields.push('formato');
  if (!cardDesc || !cardDesc.trim()) fields.push('card_desc');
  if (fields.length) return { ok: false, error: ERRO_OBRIGATORIOS, fields };
  if (nome.length > MAX_TITULO) {
    return { ok: false, error: `Nome deve ter no máximo ${MAX_TITULO} caracteres.`, fields: ['nome'] };
  }
  if (cardDesc.length > MAX_DESCRICAO) {
    return { ok: false, error: `Descrição do card deve ter no máximo ${MAX_DESCRICAO} caracteres.`, fields: ['card_desc'] };
  }
  if (!isValidIso(iso)) {
    return { ok: false, error: 'Data ISO de início inválida.', fields: ['iso'] };
  }
  return null;
}

export async function salvarCurso(formData) {
  const supabase = await createClient();
  const user = await requireUser(supabase);
  if (!user) return { ok: false, error: ERRO_SESSAO };

  const id = str(formData, 'id') || null;
  const title = str(formData, 'title');
  const cat = str(formData, 'cat');
  const tag = str(formData, 'tag', 'Curso');
  const nivel = str(formData, 'nivel');
  const modulos = str(formData, 'modulos');
  const horas = str(formData, 'horas');
  const descricao = str(formData, 'descricao');
  const poster = str(formData, 'poster');
  const inscricoes = str(formData, 'inscricoes');
  const inicio = str(formData, 'inicio');
  const vagas = str(formData, 'vagas');
  const bullets = parseJsonField(formData, 'bullets', []);
  const programa = parseJsonField(formData, 'programa', []);

  const invalido = validarCurso({ title, cat, descricao, poster });
  if (invalido) return invalido;

  const payload = {
    title, cat, tag, nivel, modulos, horas, descricao, bullets, poster, inscricoes, inicio, vagas, programa,
  };

  try {
    if (id) {
      // Edição: id presente -> upsert cai no caminho de UPDATE; slug não é
      // recalculado nem reenviado (mantém o valor já persistido -- AC P1-B/4).
      payload.id = id;
    } else {
      payload.slug = await uniqueSlug(supabase, 'cursos', slugify(title));
    }
    const { data, error } = await supabase.from('cursos').upsert(payload).select().single();
    if (error) return { ok: false, error: ERRO_BANCO };

    revalidateTag('cursos');
    revalidatePath(`/cursos/${data.slug}`);
    revalidatePath('/'); // home usa turmas abertas
    return { ok: true, slug: data.slug };
  } catch {
    return { ok: false, error: ERRO_BANCO };
  }
}

export async function salvarCongresso(formData) {
  const supabase = await createClient();
  const user = await requireUser(supabase);
  if (!user) return { ok: false, error: ERRO_SESSAO };

  const id = str(formData, 'id') || null;
  const nome = str(formData, 'nome');
  const edicao = str(formData, 'edicao');
  const tagline = str(formData, 'tagline');
  const datas = str(formData, 'datas');
  const iso = str(formData, 'iso');
  const cardDias = str(formData, 'card_dias');
  const cardMes = str(formData, 'card_mes');
  const cardLocal = str(formData, 'card_local');
  const cardDesc = str(formData, 'card_desc');
  const status = str(formData, 'status', 'Inscrições abertas');
  const localChip = str(formData, 'local_chip');
  const formato = str(formData, 'formato');
  const sobre = str(formData, 'sobre');
  const localNome = str(formData, 'local_nome');
  const localDesc = str(formData, 'local_desc');
  const stats = {
    dias: str(formData, 'stats_dias'),
    paineis: str(formData, 'stats_paineis'),
    workshops: str(formData, 'stats_workshops'),
    publico: str(formData, 'stats_publico'),
  };
  const prog = parseJsonField(formData, 'prog', []);

  const invalido = validarCongresso({ nome, edicao, datas, iso, localChip, formato, cardDesc });
  if (invalido) return invalido;

  const payload = {
    nome, edicao, tagline, datas, iso,
    card_dias: cardDias, card_mes: cardMes, card_local: cardLocal, card_desc: cardDesc,
    status, local_chip: localChip, formato, sobre,
    stats, local_nome: localNome, local_desc: localDesc, prog,
  };

  try {
    if (id) {
      payload.id = id;
    } else {
      payload.slug = await uniqueSlug(supabase, 'congressos', slugify(nome));
    }
    const { data, error } = await supabase.from('congressos').upsert(payload).select().single();
    if (error) return { ok: false, error: ERRO_BANCO };

    revalidateTag('congressos');
    revalidatePath(`/congressos/${data.slug}`);
    revalidatePath('/congressos');
    return { ok: true, slug: data.slug };
  } catch {
    return { ok: false, error: ERRO_BANCO };
  }
}

export async function alternarDisponivel(tipo, id, valor) {
  if (tipo !== 'cursos' && tipo !== 'congressos') {
    return { ok: false, error: 'Tipo inválido.' };
  }
  const supabase = await createClient();
  const user = await requireUser(supabase);
  if (!user) return { ok: false, error: ERRO_SESSAO };

  try {
    const { data, error } = await supabase
      .from(tipo)
      .update({ disponivel: valor })
      .eq('id', id)
      .select()
      .single();
    if (error) return { ok: false, error: ERRO_BANCO };

    revalidateTag(tipo);
    revalidatePath(`/${tipo}`);
    if (data?.slug) revalidatePath(`/${tipo}/${data.slug}`);
    if (tipo === 'cursos') revalidatePath('/');

    return { ok: true };
  } catch {
    return { ok: false, error: ERRO_BANCO };
  }
}
