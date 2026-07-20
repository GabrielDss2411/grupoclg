// Dados e template da página de detalhe de curso (SSG em /cursos/[slug]).
// CURSOS abaixo é usado só como seed/fixture (ver scripts/seed e testes) --
// cursoHtml() recebe o objeto no formato das colunas do banco (ver lib/db.js).
import { escapeHtml } from './escape.js';

export const CURSOS = {
  'lei-14133': {
    cat: 'Licitações', tag: 'Curso', nivel: 'Intermediário', modulos: '8 módulos', horas: '20 horas',
    title: 'Nova Lei de Licitações e Contratos',
    desc: 'A Lei 14.133/21 destrinchada na prática, com estudos de caso reais e a jurisprudência mais recente do TCU.',
    bullets: ['Lei 14.133/21 na prática', 'Estudos de caso reais', 'Certificado individual'],
    poster: '/assets/poster-14133.svg', inscricoes: '25/07', inicio: '04/08', vagas: 'Últimas 8 vagas',
    programa: [
      { t: 'Panorama da Lei 14.133/21', d: 'O que mudou em relação à Lei 8.666/93, princípios e estrutura da nova lei.' },
      { t: 'Planejamento da contratação', d: 'ETP, termo de referência, análise de riscos e pesquisa de preços.' },
      { t: 'Modalidades e critérios de julgamento', d: 'Pregão, concorrência, diálogo competitivo e a escolha do critério adequado.' },
      { t: 'Habilitação e julgamento', d: 'Documentação, saneamento de falhas e condução da sessão.' },
      { t: 'Contratação direta', d: 'Dispensa e inexigibilidade com segurança, conforme a jurisprudência do TCU.' },
      { t: 'Execução e alterações contratuais', d: 'Reajuste, repactuação, reequilíbrio e aditivos.' },
      { t: 'Sanções e responsabilização', d: 'Infrações, defesa prévia e dosimetria das penalidades.' },
      { t: 'Estudos de caso e jurisprudência', d: 'Acórdãos recentes do TCU aplicados a situações reais.' },
    ],
  },
  'pregao': {
    cat: 'Licitações', tag: 'Curso', nivel: 'Iniciante', modulos: '4 módulos', horas: '8 horas',
    title: 'Pregão Eletrônico na Prática',
    desc: 'Passo a passo no sistema, com jurisprudência atualizada, para conduzir o pregão do edital à homologação.',
    bullets: ['Passo a passo no sistema', 'Jurisprudência atualizada', 'Certificado individual'],
    poster: '/assets/poster-pregao.svg', inscricoes: '30/07', inicio: '11/08', vagas: '12 vagas restantes',
    programa: [
      { t: 'Preparação do pregão', d: 'Edital, termo de referência e pesquisa de preços sem falhas.' },
      { t: 'Condução da sessão pública', d: 'Lances, negociação e operação do sistema passo a passo.' },
      { t: 'Julgamento e habilitação', d: 'Análise de propostas, diligências e fase recursal.' },
      { t: 'Casos práticos e jurisprudência', d: 'Situações reais de sessão e as decisões mais recentes.' },
    ],
  },
  'fornecedores': {
    cat: 'Licitações', tag: 'Workshop', nivel: 'Iniciante', modulos: '4 módulos', horas: '8 horas',
    title: 'Licitações para Fornecedores',
    desc: 'Formação e atualização para analistas e consultores que vendem para o setor público.',
    bullets: ['Formação e atualização', 'Analistas e consultores', 'Certificado individual'],
    poster: '/assets/poster-fornecedores.svg', inscricoes: '05/08', inicio: '15/08', vagas: 'Últimas 9 vagas',
    programa: [
      { t: 'Como o setor público compra', d: 'Visão geral do processo de contratação sob a ótica do fornecedor.' },
      { t: 'Habilitação e documentação', d: 'Como evitar os erros que desclassificam propostas.' },
      { t: 'Propostas competitivas', d: 'Precificação, planilhas e estratégia de lances.' },
      { t: 'Execução do contrato', d: 'Entregas, medições e relacionamento com o órgão contratante.' },
    ],
  },
  'fiscalizacao': {
    cat: 'Fiscalização', tag: 'Curso', nivel: 'Intermediário', modulos: '5 módulos', horas: '12 horas',
    title: 'Gestão e Fiscalização de Contratos',
    desc: 'Rotinas, modelos e checklists para a fiscalização contratual segura, do recebimento à sanção.',
    bullets: ['Rotinas de fiscalização', 'Modelos e checklists', 'Certificado individual'],
    poster: '/assets/poster-fiscalizacao.svg', inscricoes: '08/08', inicio: '18/08', vagas: 'Últimas 10 vagas',
    programa: [
      { t: 'Papéis do gestor e do fiscal', d: 'Competências, designação e responsabilidade de cada função.' },
      { t: 'Rotinas de fiscalização', d: 'Registro, acompanhamento e comunicação com o contratado.' },
      { t: 'Medições, recebimento e pagamento', d: 'Liquidação da despesa e recebimento provisório e definitivo.' },
      { t: 'Irregularidades e sanções', d: 'Notificação, defesa, penalidades e rescisão contratual.' },
      { t: 'Modelos e checklists', d: 'Documentos prontos para aplicar na rotina do órgão.' },
    ],
  },
  'pareceres': {
    cat: 'Contratos', tag: '9ª Turma', nivel: 'Avançado', modulos: '6 módulos', horas: '16 horas',
    title: 'Assessoria Jurídica e Elaboração de Pareceres',
    desc: 'Formação prática com base em acórdãos dos tribunais superiores, para quem assina pareceres.',
    bullets: ['Certificado individual', 'Acórdãos do TCU, STJ e STF', 'Abordagem prática'],
    poster: '/assets/poster-pareceres.svg', inscricoes: '15/08', inicio: '25/08', vagas: '15 vagas restantes',
    programa: [
      { t: 'A assessoria jurídica na Lei 14.133/21', d: 'O novo papel do parecerista na contratação pública.' },
      { t: 'Estrutura e técnica do parecer', d: 'Como organizar fundamentação, análise e conclusão.' },
      { t: 'Análise de editais e minutas', d: 'Pontos de atenção em editais, contratos e atas.' },
      { t: 'Pareceres em contratação direta', d: 'Dispensa e inexigibilidade sob a ótica da assessoria.' },
      { t: 'Responsabilidade do parecerista', d: 'O que dizem STF, STJ e TCU sobre a responsabilização.' },
      { t: 'Oficina prática', d: 'Elaboração de pareceres a partir de casos reais.' },
    ],
  },
  'mrosc': {
    cat: 'Terceiro Setor', tag: 'Workshop', nivel: 'Intermediário', modulos: '3 módulos', horas: '6 horas',
    title: 'MROSC, Organizações da Sociedade Civil',
    desc: 'O marco regulatório aplicado ao terceiro setor, com foco na Lei 13.019/14.',
    bullets: ['Certificado individual', 'Foco na Lei 13.019/14', 'Abordagem prática'],
    poster: '/assets/poster-mrosc.svg', inscricoes: '12/08', inicio: '22/08', vagas: '14 vagas restantes',
    programa: [
      { t: 'Fundamentos do MROSC', d: 'O regime da Lei 13.019/14 e seu alcance.' },
      { t: 'Chamamento público e parcerias', d: 'Termos de colaboração, de fomento e acordos de cooperação.' },
      { t: 'Prestação de contas e controle', d: 'Monitoramento, avaliação e responsabilidades.' },
    ],
  },
};

const check = (txt, size = '15.5px') =>
  `<span style="display:inline-flex;align-items:flex-start;gap:9px;font-size:${size};color:#0C1A57"><span style="color:#C9A227;font-weight:800">✓</span>${txt}</span>`;

export function cursoHtml(c) {
  if (!c) return null;
  const chips = [c.nivel, c.modulos, c.horas, 'Online · ao vivo']
    .map((v) => `<span style="font-size:13px;font-weight:600;color:#0C1A57;background:#f5f5f7;border:1px solid #e5e5ea;border-radius:999px;padding:7px 14px">${escapeHtml(v)}</span>`)
    .join('\n        ');
  const programa = c.programa
    .map((m, i) => `<details style="border:1px solid #e5e5ea;border-radius:5px;background:#fff">
          <summary style="cursor:pointer;padding:15px 34px 15px 16px;font-size:15.5px;font-weight:600;color:#0C1A57;display:flex;align-items:center;gap:12px"><span style="flex-shrink:0;width:26px;height:26px;border-radius:50%;background:#f5f5f7;border:1px solid #e5e5ea;display:inline-flex;align-items:center;justify-content:center;font-size:12.5px;font-weight:700;color:#C9A227">${i + 1}</span>${escapeHtml(m.t)}</summary>
          <p style="margin:0;padding:0 18px 15px 54px;font-size:14.5px;color:#5A6180;line-height:1.55">${escapeHtml(m.d)}</p>
        </details>`)
    .join('\n        ');
  return `<div>

  <div style="max-width:1160px;margin:0 auto;padding:130px 30px 40px;display:grid;grid-template-columns:1.15fr 0.85fr;gap:56px;align-items:start">

    <div>
      <button data-nav="cursos" style="background:none;border:0;color:#C9A227;font-weight:600;font-size:14px;cursor:pointer;padding:0;display:inline-flex;align-items:center;gap:7px" data-hv="goldlink">← Voltar ao catálogo</button>
      <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E;margin-top:22px">${escapeHtml(c.cat.toUpperCase())} · ${escapeHtml(c.tag.toUpperCase())}</div>
      <h1 style="font-weight:600;font-size:42px;line-height:1.08;color:#0C1A57;margin:12px 0 0">${escapeHtml(c.title)}</h1>
      <p style="font-size:18px;color:#5A6180;margin:16px 0 0;line-height:1.6">${escapeHtml(c.descricao)}</p>

      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:24px">
        ${chips}
      </div>

      <div style="margin-top:34px">
        <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">O QUE VOCÊ VAI LEVAR</div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:14px">
          ${c.bullets.map((b) => check(escapeHtml(b))).join('\n          ')}
        </div>
      </div>

      <div style="margin-top:38px">
        <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">PROGRAMA DO CURSO</div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:14px">
        ${programa}
        </div>
      </div>

      <div style="margin-top:38px;background:#f5f5f7;border:1px solid #e5e5ea;border-radius:16px;padding:26px 28px;display:flex;gap:22px;align-items:center">
        <img src="/assets/bruno-verzani.png" alt="Bruno Verzani, coordenação acadêmica" style="width:84px;height:84px;border-radius:50%;object-fit:cover;object-position:50% 22%;flex-shrink:0">
        <div>
          <div style="font-size:12px;letter-spacing:2px;font-weight:700;color:#A89A6E">COORDENAÇÃO ACADÊMICA</div>
          <div style="font-size:18px;font-weight:600;color:#0C1A57;margin-top:6px">Bruno Verzani</div>
          <p style="font-size:14.5px;color:#5A6180;line-height:1.55;margin:6px 0 0">Procurador do Estado do Rio de Janeiro. Coordena o corpo docente e garante que cada aula reflita a prática e a jurisprudência atual.</p>
        </div>
      </div>
    </div>

    <div style="position:sticky;top:110px">
      <div style="border-radius:16px;overflow:hidden;aspect-ratio:380/500;box-shadow:0 20px 44px -34px rgba(10,20,66,0.45)"><img src="${c.poster}" alt="${escapeHtml(c.title)}" style="display:block;width:100%;height:100%;object-fit:cover"></div>
      <div style="border:1px solid #e5e5ea;border-radius:16px;padding:24px 26px;margin-top:18px;background:#fff">
        <div style="display:inline-flex;align-items:center;gap:7px;background:rgba(91,214,160,0.16);border:1px solid rgba(91,214,160,0.4);border-radius:999px;padding:5px 12px;font-size:11.5px;font-weight:600;color:#5BD6A0"><span style="width:7px;height:7px;border-radius:50%;background:#5BD6A0;display:inline-block"></span>Matrículas abertas</div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px">
          <div style="display:flex;justify-content:space-between;font-size:14.5px;color:#42496A">Inscrições até <b style="color:#0C1A57;font-weight:600">${escapeHtml(c.inscricoes)}</b></div>
          <div style="display:flex;justify-content:space-between;font-size:14.5px;color:#42496A">Início da turma <b style="color:#0C1A57;font-weight:600">${escapeHtml(c.inicio)}</b></div>
          <div style="font-size:13.5px;color:#C9A227;font-weight:600">${escapeHtml(c.vagas)}</div>
        </div>
        <div style="height:1px;background:#e5e5ea;margin:16px 0"></div>
        <div style="display:flex;align-items:baseline;gap:7px"><span style="font-size:13.5px;color:#8A90A6">A partir de</span><span style="font-size:24px;font-weight:700;color:#0C1A57;letter-spacing:-0.02em">12x R$ 29</span></div>
        <button type="button" data-ficha style="margin-top:16px;background:#E9C65A;color:#0A1442;border:0;border-radius:999px;padding:15px;font-weight:700;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px" data-hv="gold">Garantir vaga <span>→</span></button>
        <div style="display:flex;flex-direction:column;gap:8px;margin-top:18px">
          ${check('Certificado individual incluso', '13.5px')}
          ${check('Material complementar', '13.5px')}
          ${check('Acesso às gravações por 12 meses', '13.5px')}
        </div>
      </div>
    </div>

  </div>

  <div style="max-width:1160px;margin:0 auto;padding:24px 30px 90px">
    <div style="background:linear-gradient(158deg,#0C1A57,#070E33);border-radius:16px;padding:44px 40px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
      <div>
        <h2 style="font-size:26px;color:#fff;margin:0">Prefere capacitar a equipe inteira?</h2>
        <p style="font-size:15.5px;color:#B7C0DC;margin:8px 0 0;line-height:1.55">Este curso também pode ser levado ao seu órgão no formato In Company, sob medida.</p>
      </div>
      <button data-nav="incompany" style="background:rgba(255,255,255,0.06);color:#fff;border:1.5px solid rgba(255,255,255,0.28);border-radius:999px;padding:14px 26px;font-weight:600;font-size:15px;cursor:pointer;flex-shrink:0" data-hv="outline">Ver treinamentos In Company</button>
    </div>
  </div>

</div>`;
}
