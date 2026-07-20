import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { CURSOS, cursoHtml } from '../lib/cursos-data.js';

// Adapta uma entrada do mapa CURSOS (seed) para o shape de coluna do banco
// (design.md: colunas = chaves JS, exceto `desc` -> `descricao`).
function toColumnShape(slug) {
  const { desc, ...rest } = CURSOS[slug];
  return { slug, descricao: desc, disponivel: true, ...rest };
}

describe('cursoHtml (builder parametrizado)', () => {
  it.each(Object.keys(CURSOS))('renderiza o curso "%s" sem erro e com o título esperado', (slug) => {
    const curso = toColumnShape(slug);
    const html = cursoHtml(curso);
    expect(html).toContain(curso.title);
  });

  it('produz saída equivalente à do comportamento atual para lei-14133 (AD-007)', () => {
    // Snapshot "antes" capturado por execução real de cursoHtml('lei-14133') no
    // código pré-mudança (lookup por slug no mapa CURSOS), antes de qualquer edição
    // deste task. Ver tests/fixtures/lei-14133-before.html.
    const before = readFileSync(
      new URL('./fixtures/lei-14133-before.html', import.meta.url),
      'utf8'
    );
    const after = cursoHtml(toColumnShape('lei-14133'));
    expect(after).toBe(before);
  });

  it('escapa título com HTML/script para não injetar markup cru (edge case XSS)', () => {
    const curso = toColumnShape('lei-14133');
    curso.title = '<script>alert(1)</script>';
    const html = cursoHtml(curso);
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  it('CTA "Garantir vaga" abre o modal da ficha (data-ficha), não redireciona direto pro WhatsApp', () => {
    const curso = toColumnShape('lei-14133');
    const html = cursoHtml(curso);
    expect(html).toMatch(/<button[^>]*data-ficha[^>]*>Garantir vaga/);
    expect(html).not.toContain('wa.me');
  });
});
