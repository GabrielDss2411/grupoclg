// Dados e templates da área de artigos: listagem (/artigos) e detalhe
// (/artigos/[slug]). ARTIGOS abaixo é só seed/fixture (ver scripts/seed e
// testes) -- artigoHtml()/artigosPageHtml() recebem objetos no formato das
// colunas do banco (ver lib/db.js). Conteúdo ilustrativo pendente de dados
// reais (ver CLAUDE.md).
import { escapeHtml } from './escape.js';

export const ARTIGOS = {
  'reequilibrio-economico-financeiro': {
    titulo: 'Reequilíbrio econômico financeiro na Lei 14.133/21: quando e como pedir',
    categoria: 'Contratos',
    resumo: 'Os requisitos, a documentação e os prazos que blindam o pedido de reequilíbrio contra o indeferimento.',
    capa: '/assets/advogados.jpg',
    autor: 'Bruno Verzani',
    conteudo: 'O reequilíbrio econômico financeiro protege o contrato contra eventos que rompem a equação inicial entre encargos e remuneração.\n\nA Lei 14.133/21 manteve a lógica da álea extraordinária, mas trouxe prazos e documentação mais objetivos para o pedido.\n\nO erro mais comum é reunir a prova do fato apenas depois que o desequilíbrio já apareceu na planilha. O ideal é registrar o evento no momento em que ele ocorre.',
  },
  'jurisprudencia-tcu-dispensa': {
    titulo: 'O que o TCU decidiu sobre dispensa de licitação em 2026',
    categoria: 'Jurisprudência',
    resumo: 'Os acórdãos mais relevantes do ano sobre contratação direta e o que muda na rotina do gestor.',
    capa: '/assets/img-auditorio.svg',
    autor: 'Bruno Verzani',
    conteudo: 'O Tribunal de Contas da União voltou a debater os limites da dispensa por valor após a atualização dos tetos da Lei 14.133/21.\n\nEntre os pontos de atenção está a exigência de justificativa técnica para o fracionamento de despesa, tema recorrente nas auditorias.\n\nPara o gestor, a recomendação prática é documentar a pesquisa de preços e a motivação da escolha antes da autorização da despesa.',
  },
  'checklist-fiscalizacao-contratos': {
    titulo: 'Checklist de fiscalização de contratos administrativos',
    categoria: 'Fiscalização',
    resumo: 'Um roteiro objetivo para o fiscal acompanhar a execução contratual sem depender só da memória.',
    capa: '/assets/poster-fiscalizacao.svg',
    autor: 'Bruno Verzani',
    conteudo: 'A fiscalização de contratos é uma das funções que mais gera responsabilização quando falha, e uma das que menos recebe suporte formal no dia a dia do órgão.\n\nUm checklist simples reduz o risco: conferência do objeto, registro de ocorrências, prazos de medição e comunicação formal com o contratado.\n\nO registro escrito, mesmo que resumido, é o que sustenta qualquer decisão do fiscal diante de auditoria ou questionamento do contratado.',
  },
};

const WA = 'https://wa.me/5521980936347';

function fmtData(iso) {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
}

function paragrafos(texto) {
  return String(texto || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p style="font-size:17px;color:#42496A;line-height:1.7;margin:0 0 20px">${escapeHtml(p)}</p>`)
    .join('\n      ');
}

/* ---------------- Listagem (/artigos) ---------------- */

function artigoCard(a) {
  return `      <div data-href="/artigos/${a.slug}" style="cursor:pointer;background:#fff;border:1px solid #e5e5ea;border-radius:20px;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .25s ease, border-color .25s ease" data-hv="card">
        <div style="border-radius:20px 20px 0 0;overflow:hidden;aspect-ratio:16/9"><img src="${a.capa}" alt="${escapeHtml(a.titulo)}" style="display:block;width:100%;height:100%;object-fit:cover"></div>
        <div style="padding:22px 24px 26px;display:flex;flex-direction:column;gap:10px;flex:1">
          <div style="font-size:11px;letter-spacing:1.2px;font-weight:700;color:#C9A227">${escapeHtml(a.categoria.toUpperCase())}</div>
          <h3 style="font-size:19px;font-weight:600;color:#0C1A57;margin:0;line-height:1.3">${escapeHtml(a.titulo)}</h3>
          <p style="font-size:14.5px;color:#5A6180;line-height:1.55;margin:0;flex:1">${escapeHtml(a.resumo)}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px;padding-top:14px;border-top:1px solid #e5e5ea">
            <span style="font-size:13px;color:#8A90A6">${escapeHtml(a.autor)} · ${fmtData(a.created_at)}</span>
            <span style="font-size:12.5px;font-weight:600;color:#C9A227">Ler mais →</span>
          </div>
        </div>
      </div>`;
}

const artigosVazio = `<div style="border:1px solid #e5e5ea;border-radius:16px;padding:48px 30px;text-align:center;background:#f5f5f7;margin-top:26px">
      <p style="font-size:17px;color:#5A6180;margin:0">Novos artigos em breve.</p>
    </div>`;

export function artigosPageHtml(lista) {
  const grid = lista.length
    ? `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:30px">
${lista.map((a) => artigoCard(a)).join('\n')}
    </div>`
    : artigosVazio;

  return `<div>

  <!-- header -->
  <div style="max-width:1200px;margin:0 auto;padding:130px 30px 10px">
    <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">ARTIGOS E NOTÍCIAS</div>
    <h1 style="font-weight:600;font-size:48px;line-height:1.06;color:#0C1A57;margin:14px 0 0;max-width:840px">Conteúdo prático sobre <span style="color:#C9A227">Licitações e Gestão Pública</span>.</h1>
    <p style="font-size:18px;color:#5A6180;margin:18px 0 0;max-width:640px;line-height:1.55">Análises, jurisprudência comentada e guias práticos escritos por quem atua diariamente na Administração Pública.</p>
  </div>

  <!-- GRID -->
  <div style="max-width:1200px;margin:0 auto;padding:36px 30px 90px">
    ${grid}
  </div>

</div>`;
}

/* ---------------- Detalhe (/artigos/[slug]) ---------------- */

export function artigoHtml(a) {
  if (!a) return null;
  const wa = `${WA}?text=${encodeURIComponent(`Olá, li o artigo "${escapeHtml(a.titulo)}" e quero saber mais sobre os cursos do Grupo CLG.`)}`;
  return `<div>

  <div style="max-width:860px;margin:0 auto;padding:130px 30px 0">
    <button data-nav="artigos" style="background:none;border:0;color:#C9A227;font-weight:600;font-size:14px;cursor:pointer;padding:0;display:inline-flex;align-items:center;gap:7px" data-hv="goldlink">← Voltar aos artigos</button>
    <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E;margin-top:22px">${escapeHtml(a.categoria.toUpperCase())}</div>
    <h1 style="font-weight:600;font-size:38px;line-height:1.16;color:#0C1A57;margin:12px 0 0">${escapeHtml(a.titulo)}</h1>
    <div style="font-size:14px;color:#8A90A6;margin-top:14px">${escapeHtml(a.autor)} · ${fmtData(a.created_at)}</div>
  </div>

  <div style="max-width:860px;margin:0 auto;padding:34px 30px 0">
    <div style="border-radius:20px;overflow:hidden;aspect-ratio:16/9;box-shadow:0 20px 44px -34px rgba(10,20,66,0.45)"><img src="${a.capa}" alt="${escapeHtml(a.titulo)}" style="display:block;width:100%;height:100%;object-fit:cover"></div>
  </div>

  <div style="max-width:860px;margin:0 auto;padding:38px 30px 0">
      ${paragrafos(a.conteudo)}
  </div>

  <div style="max-width:860px;margin:0 auto;padding:24px 30px 90px">
    <div style="background:linear-gradient(158deg,#0C1A57,#070E33);border-radius:16px;padding:44px 40px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
      <div>
        <h2 style="font-size:26px;color:#fff;margin:0">Quer se aprofundar no tema?</h2>
        <p style="font-size:15.5px;color:#B7C0DC;margin:8px 0 0;line-height:1.55">Conheça os cursos do Grupo CLG, com certificado individual e professores que atuam na Administração Pública.</p>
      </div>
      <a href="${wa}" target="_blank" rel="noopener" style="background:#E9C65A;color:#0A1442;border-radius:999px;padding:14px 26px;font-weight:700;font-size:15px;flex-shrink:0;display:inline-flex;align-items:center;gap:8px" data-hv="gold">Ver turmas abertas <span>→</span></a>
    </div>
  </div>

</div>`;
}
