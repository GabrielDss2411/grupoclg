import { describe, it, expect } from 'vitest';
import { ARTIGOS, artigoHtml, artigosPageHtml } from '../lib/artigos-data.js';

// Adapta uma entrada do mapa ARTIGOS (seed) para o shape de coluna do banco
// (mesmo mapeamento usado nos testes de cursos/congressos).
function toColumnShape(slug) {
  const a = ARTIGOS[slug];
  return {
    slug,
    titulo: a.titulo,
    categoria: a.categoria,
    resumo: a.resumo,
    capa: a.capa,
    autor: a.autor,
    conteudo: a.conteudo,
    disponivel: true,
    created_at: '2026-06-01T00:00:00Z',
  };
}

describe('artigoHtml (builder parametrizado)', () => {
  it.each(Object.keys(ARTIGOS))('renderiza o artigo "%s" sem erro e com o título esperado', (slug) => {
    const artigo = toColumnShape(slug);
    const html = artigoHtml(artigo);
    expect(html).toContain(artigo.titulo);
  });

  it('quebra o conteúdo em parágrafos separados por linha em branco', () => {
    const artigo = toColumnShape('reequilibrio-economico-financeiro');
    const html = artigoHtml(artigo);
    const partes = artigo.conteudo.split(/\n\s*\n/);
    expect(partes.length).toBeGreaterThan(1);
    for (const p of partes) {
      expect(html).toContain(p);
    }
  });

  it('escapa título com HTML/script para não injetar markup cru (edge case XSS)', () => {
    const artigo = toColumnShape('reequilibrio-economico-financeiro');
    artigo.titulo = '<script>alert(1)</script>';
    const html = artigoHtml(artigo);
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  it('artigo nulo/ausente retorna null (contrato de notFound na página de detalhe)', () => {
    expect(artigoHtml(null)).toBeNull();
  });
});

describe('artigosPageHtml (listagem)', () => {
  it('renderiza um card por artigo da lista', () => {
    const lista = Object.keys(ARTIGOS).map((slug) => toColumnShape(slug));
    const html = artigosPageHtml(lista);
    for (const a of lista) {
      expect(html).toContain(a.titulo);
    }
  });

  it('exibe estado vazio amigável quando não há artigos disponíveis (edge case)', () => {
    const html = artigosPageHtml([]);
    expect(html).toContain('Novos artigos em breve');
  });
});
