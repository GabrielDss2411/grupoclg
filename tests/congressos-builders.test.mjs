import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { CONGRESSOS, congressoHtml, congressosPageHtml } from '../lib/congressos-data.js';

// Adapta uma entrada do mapa CONGRESSOS (seed) para o shape de coluna do banco
// (design.md: colunas = camelCase -> snake_case; mesmo mapeamento usado no
// bridge de congressosPage em lib/congressos-data.js).
function toColumnShape(slug) {
  const c = CONGRESSOS[slug];
  return {
    slug,
    nome: c.nome,
    edicao: c.edicao,
    tagline: c.tagline,
    datas: c.datas,
    iso: c.iso,
    card_dias: c.cardDias,
    card_mes: c.cardMes,
    card_local: c.cardLocal,
    card_desc: c.cardDesc,
    status: c.status,
    local_chip: c.localChip,
    formato: c.formato,
    sobre: c.sobre,
    stats: c.stats,
    local_nome: c.localNome,
    local_desc: c.localDesc,
    prog: c.prog,
    disponivel: true,
  };
}

describe('congressoHtml (builder parametrizado)', () => {
  it.each(Object.keys(CONGRESSOS))('renderiza o congresso "%s" sem erro e com o nome esperado', (slug) => {
    const congresso = toColumnShape(slug);
    const html = congressoHtml(congresso);
    expect(html).toContain(congresso.nome);
  });

  it('produz saída equivalente à do comportamento atual para nova-lei (AD-007)', () => {
    // Snapshot "antes" capturado por execução real de congressoHtml('nova-lei') no
    // código pré-mudança (lookup por slug no mapa CONGRESSOS), antes de qualquer
    // edição deste task. Ver tests/fixtures/nova-lei-before.html.
    const before = readFileSync(
      new URL('./fixtures/nova-lei-before.html', import.meta.url),
      'utf8'
    );
    const after = congressoHtml(toColumnShape('nova-lei'));
    expect(after).toBe(before);
  });

  it('escapa nome com HTML/script para não injetar markup cru (edge case XSS)', () => {
    const congresso = toColumnShape('nova-lei');
    congresso.nome = '<script>alert(1)</script>';
    const html = congressoHtml(congresso);
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  it('CTA "Garantir minha vaga" (hero e final) abre o modal da ficha (data-ficha), não redireciona direto pro WhatsApp', () => {
    const congresso = toColumnShape('nova-lei');
    const html = congressoHtml(congresso);
    const matches = html.match(/<button[^>]*data-ficha[^>]*>Garantir minha vaga/g) || [];
    expect(matches.length).toBe(2);
    expect(html).not.toMatch(/wa\.me[^"]*"[^>]*>Garantir minha vaga/);
  });

  it('mantém o link direto de WhatsApp para "Inscrição em grupo"', () => {
    const congresso = toColumnShape('nova-lei');
    const html = congressoHtml(congresso);
    expect(html).toMatch(/href="https:\/\/wa\.me\/5521980936347\?text=[^"]*"[^>]*>Inscrição em grupo/);
  });
});

describe('congressosPageHtml (agenda)', () => {
  it('produz saída equivalente à do comportamento atual com todos os congressos (AD-007)', () => {
    // Snapshot "antes" capturado por execução real de congressosPage (mapa CONGRESSOS
    // completo) no código pré-mudança. Ver tests/fixtures/congressos-page-before.html.
    const before = readFileSync(
      new URL('./fixtures/congressos-page-before.html', import.meta.url),
      'utf8'
    );
    const lista = Object.keys(CONGRESSOS).map((slug) => toColumnShape(slug));
    const after = congressosPageHtml(lista);
    expect(after).toBe(before);
  });

  it('exibe estado vazio amigável quando não há congressos disponíveis (edge case)', () => {
    const html = congressosPageHtml([]);
    expect(html).toContain('Novos eventos em breve');
  });

  it('calendário mostra "Todos" + uma aba por mês, só com o nome do mês (sem local/formato)', () => {
    const lista = Object.keys(CONGRESSOS).map((slug) => toColumnShape(slug));
    const html = congressosPageHtml(lista);
    const tabs = [...html.matchAll(/<button type="button" data-mes-filtro="([^"]+)"[^>]*>([^<]+)<\/button>/g)];

    expect(tabs.map((m) => m[1])).toEqual(['todos', 'agosto', 'setembro', 'outubro', 'novembro']);
    expect(tabs.map((m) => m[2])).toEqual(['Todos', 'Agosto', 'Setembro', 'Outubro', 'Novembro']);
    for (const [, , label] of tabs) {
      expect(label).not.toMatch(/Brasília|Rio de Janeiro|Belo Horizonte|Online|Presencial/i);
    }
  });

  it('"Todos" começa ativo e todos os cards vêm visíveis; meses ficam disponíveis pra filtrar a partir daí', () => {
    const lista = Object.keys(CONGRESSOS).map((slug) => toColumnShape(slug));
    const html = congressosPageHtml(lista);

    expect(html).toMatch(/data-mes-filtro="todos" class="cong-mes-tab cong-mes-ativo"/);
    expect(html).not.toMatch(/data-mes-filtro="agosto" class="cong-mes-tab cong-mes-ativo"/);

    for (const mes of ['agosto', 'setembro', 'outubro', 'novembro']) {
      const card = html.match(new RegExp(`data-mes="${mes}" style="[^"]*display:(grid|none)`));
      expect(card[1]).toBe('grid');
    }
  });
});
