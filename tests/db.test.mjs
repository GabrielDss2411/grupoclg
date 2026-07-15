import { describe, it, expect, vi, beforeEach } from 'vitest';

// unstable_cache exige um contexto real de servidor Next.js (incrementalCache);
// em teste unitário, viramos a função em um passthrough para exercitar só a
// lógica de consulta (mock do client Supabase, tratado abaixo).
vi.mock('next/cache', () => ({
  unstable_cache: (fn) => fn,
}));

const mockCreateClient = vi.fn();
vi.mock('../lib/supabase/server.js', () => ({
  createClient: (...args) => mockCreateClient(...args),
}));

const { getCursos, getCurso, getCongressos, getCongresso } = await import('../lib/db.js');

// Builder encadeável mínimo que imita a API do supabase-js: cada método de
// filtro retorna o próprio builder, e o builder é "thenable" (resolve/rejeita
// como a Promise que o supabase-js realmente devolve ao final da cadeia).
function fakeBuilder(result) {
  const builder = {
    select: () => builder,
    order: () => builder,
    eq: () => builder,
    maybeSingle: () => builder,
    then: (resolve, reject) => Promise.resolve(result).then(resolve, reject),
  };
  return builder;
}

function fakeSupabase(result) {
  return { from: () => fakeBuilder(result) };
}

beforeEach(() => {
  mockCreateClient.mockReset();
});

describe('lib/db.js (camada de dados cacheada sobre supabase)', () => {
  it('getCursos() retorna a lista que o client mockado devolve', async () => {
    const cursosMock = [
      { slug: 'lei-14133', title: 'Nova Lei de Licitações e Contratos' },
      { slug: 'pregao', title: 'Pregão Eletrônico na Prática' },
    ];
    mockCreateClient.mockReturnValue(fakeSupabase({ data: cursosMock, error: null }));
    const result = await getCursos();
    expect(result).toEqual(cursosMock);
  });

  it('getCongressos() retorna a lista que o client mockado devolve', async () => {
    const congressosMock = [{ slug: 'nova-lei', nome: 'Congresso Nacional da Nova Lei de Licitações' }];
    mockCreateClient.mockReturnValue(fakeSupabase({ data: congressosMock, error: null }));
    const result = await getCongressos();
    expect(result).toEqual(congressosMock);
  });

  it('getCurso(slug) inexistente retorna null (contrato)', async () => {
    mockCreateClient.mockReturnValue(fakeSupabase({ data: null, error: null }));
    const result = await getCurso('slug-que-nao-existe');
    expect(result).toBeNull();
  });

  it('getCongresso(slug) inexistente retorna null (contrato)', async () => {
    mockCreateClient.mockReturnValue(fakeSupabase({ data: null, error: null }));
    const result = await getCongresso('slug-que-nao-existe');
    expect(result).toBeNull();
  });

  it('getCursos() propaga o erro quando o banco falha -- permite ao Next servir stale via ISR (ADM-09)', async () => {
    mockCreateClient.mockReturnValue(fakeSupabase({ data: null, error: new Error('conexão recusada') }));
    await expect(getCursos()).rejects.toThrow('conexão recusada');
  });

  it('getCongresso(slug) propaga o erro quando o banco falha -- permite ao Next servir stale via ISR (ADM-09)', async () => {
    mockCreateClient.mockReturnValue(fakeSupabase({ data: null, error: new Error('conexão recusada') }));
    await expect(getCongresso('nova-lei')).rejects.toThrow('conexão recusada');
  });
});
