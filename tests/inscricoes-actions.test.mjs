import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock do client Supabase anon (lib/supabase/server.js) -- a ficha pública
// nunca usa o client autenticado do painel.
const state = { supabase: null };
vi.mock('../lib/supabase/server.js', () => ({
  createClient: () => state.supabase,
}));

const { criarInscricao } = await import('../lib/inscricoes-actions.js');

function makeSupabaseMock({ insertResult = { error: null } } = {}) {
  const calls = { insert: [] };
  const supabase = {
    from(table) {
      return {
        insert(payload) {
          calls.insert.push({ table, payload });
          return Promise.resolve(insertResult);
        },
      };
    },
  };
  return { supabase, calls };
}

// CPF válido conhecido (dígitos verificadores corretos) usado nos testes de sucesso.
const CPF_VALIDO = '529.982.247-25';

function inscricaoFormData(overrides = {}) {
  const fd = new FormData();
  const fields = {
    tipo: 'curso',
    item_id: 'id-curso-1',
    item_titulo: 'Nova Lei de Licitações e Contratos',
    nome: 'Maria da Silva',
    email: 'maria@example.com',
    telefone: '(21) 90000-0000',
    cpf: CPF_VALIDO,
    observacoes: '',
    ...overrides,
  };
  for (const [k, v] of Object.entries(fields)) {
    if (v !== undefined && v !== null) fd.set(k, v);
  }
  return fd;
}

beforeEach(() => {
  state.supabase = null;
  vi.clearAllMocks();
});

describe('criarInscricao -- validação', () => {
  it('sem nome retorna erro com o campo faltante e não persiste', async () => {
    const { supabase, calls } = makeSupabaseMock();
    state.supabase = supabase;

    const result = await criarInscricao(inscricaoFormData({ nome: '' }));

    expect(result.ok).toBe(false);
    expect(result.fields).toContain('nome');
    expect(calls.insert.length).toBe(0);
  });

  it('e-mail inválido retorna erro e não persiste', async () => {
    const { supabase, calls } = makeSupabaseMock();
    state.supabase = supabase;

    const result = await criarInscricao(inscricaoFormData({ email: 'não-é-email' }));

    expect(result.ok).toBe(false);
    expect(result.fields).toContain('email');
    expect(calls.insert.length).toBe(0);
  });

  it('telefone com menos de 10 dígitos retorna erro e não persiste', async () => {
    const { supabase, calls } = makeSupabaseMock();
    state.supabase = supabase;

    const result = await criarInscricao(inscricaoFormData({ telefone: '123' }));

    expect(result.ok).toBe(false);
    expect(result.fields).toContain('telefone');
    expect(calls.insert.length).toBe(0);
  });

  it('CPF com dígito verificador inválido retorna erro e não persiste', async () => {
    const { supabase, calls } = makeSupabaseMock();
    state.supabase = supabase;

    const result = await criarInscricao(inscricaoFormData({ cpf: '111.111.111-11' }));

    expect(result.ok).toBe(false);
    expect(result.fields).toContain('cpf');
    expect(calls.insert.length).toBe(0);
  });

  it('sem item_id/item_titulo (contexto da página perdido) retorna erro genérico e não persiste', async () => {
    const { supabase, calls } = makeSupabaseMock();
    state.supabase = supabase;

    const result = await criarInscricao(inscricaoFormData({ item_id: '' }));

    expect(result.ok).toBe(false);
    expect(calls.insert.length).toBe(0);
  });
});

describe('criarInscricao -- persistência', () => {
  it('dados válidos de curso persistem em curso_id (não em congresso_id)', async () => {
    const { supabase, calls } = makeSupabaseMock();
    state.supabase = supabase;

    const result = await criarInscricao(inscricaoFormData());

    expect(result.ok).toBe(true);
    expect(calls.insert[0].table).toBe('inscricoes');
    expect(calls.insert[0].payload.curso_id).toBe('id-curso-1');
    expect(calls.insert[0].payload).not.toHaveProperty('congresso_id');
    expect(calls.insert[0].payload.cpf).toBe('52998224725'); // CPF salvo só com dígitos
  });

  it('dados válidos de congresso persistem em congresso_id (não em curso_id)', async () => {
    const { supabase, calls } = makeSupabaseMock();
    state.supabase = supabase;

    const result = await criarInscricao(
      inscricaoFormData({ tipo: 'congresso', item_id: 'id-congresso-1', item_titulo: 'Congresso Nacional' })
    );

    expect(result.ok).toBe(true);
    expect(calls.insert[0].payload.congresso_id).toBe('id-congresso-1');
    expect(calls.insert[0].payload).not.toHaveProperty('curso_id');
  });

  it('falha do mock no insert retorna { ok:false } sem lançar', async () => {
    const { supabase } = makeSupabaseMock({ insertResult: { error: new Error('conexão recusada') } });
    state.supabase = supabase;

    await expect(criarInscricao(inscricaoFormData())).resolves.toEqual(
      expect.objectContaining({ ok: false })
    );
  });
});
