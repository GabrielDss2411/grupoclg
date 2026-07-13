import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { CURSOS } from '../lib/cursos-data.js';
import { turmasHtml, catalogoHtml } from '../lib/content.js';

// Adapta uma entrada do mapa CURSOS (seed) para o shape de coluna do banco
// (design.md: colunas = chaves JS, exceto `desc` -> `descricao`), mesmo
// mapeamento usado pelo bridge de tests/cursos-builders.test.mjs.
function toColumnShape(slug) {
  const { desc, ...rest } = CURSOS[slug];
  return { slug, descricao: desc, disponivel: true, ...rest };
}

// Ordem curada do carrossel de turmas na home (ver lib/content.js).
const ORDEM_TURMAS = ['lei-14133', 'pregao', 'fiscalizacao', 'pareceres', 'fornecedores', 'mrosc'];
const cursosTurmas = ORDEM_TURMAS.map(toColumnShape);
const cursosCatalogo = Object.keys(CURSOS).map(toColumnShape);

describe('turmasHtml (carrossel de turmas abertas)', () => {
  it('produz saída equivalente à do carrossel atual com os 6 cursos do seed (AD-007)', () => {
    // Snapshot "antes" extraído do trecho estático de lib/content.js (export
    // home) anterior a esta tarefa. Ver tests/fixtures/turmas-before.html.
    const before = readFileSync(new URL('./fixtures/turmas-before.html', import.meta.url), 'utf8');
    const after = turmasHtml(cursosTurmas);
    expect(after).toBe(before);
  });

  it('escapa título com HTML/script para não injetar markup cru (edge case XSS)', () => {
    const cursos = cursosTurmas.map((c) => (c.slug === 'lei-14133' ? { ...c, title: '<script>alert(1)</script>' } : c));
    const html = turmasHtml(cursos);
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
  });
});

describe('catalogoHtml (fileiras do catálogo de cursos)', () => {
  it('produz saída equivalente à do catálogo atual com os 6 cursos do seed (AD-007)', () => {
    // Snapshot "antes" extraído do trecho estático de lib/content.js (export
    // cursos) anterior a esta tarefa. Ver tests/fixtures/catalogo-before.html.
    const before = readFileSync(new URL('./fixtures/catalogo-before.html', import.meta.url), 'utf8');
    const after = catalogoHtml(cursosCatalogo);
    expect(after).toBe(before);
  });

  it('omite fileiras de categorias sem nenhum curso disponível na lista recebida (edge case)', () => {
    // Só cursos da categoria "Terceiro Setor" (mrosc) na lista recebida --
    // as fileiras "Licitações e Pregão" e "Contratos e Pareceres" devem ficar
    // ausentes da saída, sem cabeçalho vazio.
    const cursos = cursosCatalogo.filter((c) => c.cat === 'Terceiro Setor');
    const html = catalogoHtml(cursos);
    expect(html).toContain('Terceiro Setor');
    expect(html).not.toContain('Licitações e Pregão');
    expect(html).not.toContain('Contratos e Pareceres');
  });

  it('categoria não mapeada em CATALOGO_FILEIRAS ganha fileira própria com ícone padrão, sem erro (edge case)', () => {
    const curso = { ...cursosCatalogo[0], cat: 'Direito Financeiro' };
    expect(() => catalogoHtml([curso])).not.toThrow();
    const html = catalogoHtml([curso]);
    expect(html).toContain('Direito Financeiro');
  });

  it('escapa título com HTML/script para não injetar markup cru (edge case XSS)', () => {
    const cursos = cursosCatalogo.map((c) => (c.slug === 'lei-14133' ? { ...c, title: '<script>alert(1)</script>' } : c));
    const html = catalogoHtml(cursos);
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
  });
});
