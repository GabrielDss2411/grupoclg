// Dados dos congressos, página agenda (/congressos) e LP por evento (/congressos/[slug]).
// Para adicionar um congresso: nova entrada aqui; o card da agenda e a LP são gerados no build.

export const CONGRESSOS = {
  'nova-lei': {
    nome: 'Congresso Nacional da Nova Lei de Licitações',
    edicao: '4ª edição',
    tagline: 'Quatro dias de imersão na Lei 14.133/21 com quem aplica a lei todos os dias.',
    datas: '24 a 27 de agosto de 2026', iso: '2026-08-24',
    cardDias: '24 a 27', cardMes: 'AGOSTO · 2026',
    cardLocal: 'PRESENCIAL · BRASÍLIA/DF · TRANSMISSÃO ONLINE',
    cardDesc: 'Quatro dias de imersão na Lei 14.133/21: painéis com a jurisprudência mais recente do TCU, casos práticos e debates com quem aplica a lei todos os dias.',
    status: 'Inscrições abertas',
    localChip: 'Brasília/DF', formato: 'Presencial · transmissão online',
    sobre: 'Painéis técnicos, workshops práticos e debates com a jurisprudência mais recente do TCU, reunindo os profissionais que decidem a contratação pública no Brasil.',
    stats: { dias: '4 dias', paineis: '+20', workshops: '8', publico: '+600' },
    localNome: 'Centro de Convenções · Brasília/DF',
    localDesc: 'Evento presencial com transmissão online ao vivo para inscritos. O endereço completo e as orientações de acesso são enviados após a inscrição.',
    prog: [
      { dia: 'Segunda, 24/08', titulo: 'Credenciamento e panorama da lei', itens: ['Credenciamento e abertura oficial', 'Painel: 5 anos da Lei 14.133/21, balanço e perspectivas', 'Palestra magna com convidado especial'] },
      { dia: 'Terça, 25/08', titulo: 'Planejamento e licitação', itens: ['ETP, termo de referência e pesquisa de preços', 'Modalidades e critérios de julgamento na prática', 'Workshops simultâneos por área'] },
      { dia: 'Quarta, 26/08', titulo: 'Contratação direta e execução', itens: ['Dispensa e inexigibilidade conforme o TCU', 'Execução, alterações e reequilíbrio contratual', 'Workshops simultâneos por área'] },
      { dia: 'Quinta, 27/08', titulo: 'Controle e encerramento', itens: ['Sanções e responsabilização de agentes', 'Painel de encerramento: perguntas à banca', 'Entrega de certificados'] },
    ],
  },
  'contratos': {
    nome: 'Semana de Contratos Públicos',
    edicao: '2ª edição',
    tagline: 'Cinco dias, uma hora por dia, para dominar a gestão e a fiscalização de contratos.',
    datas: '21 a 25 de setembro de 2026', iso: '2026-09-21',
    cardDias: '21 a 25', cardMes: 'SETEMBRO · 2026',
    cardLocal: 'ONLINE · AO VIVO',
    cardDesc: 'Uma semana dedicada à gestão e fiscalização de contratos: rotinas, modelos, checklists e as decisões que todo fiscal e gestor precisa conhecer.',
    status: 'Inscrições abertas',
    localChip: 'Online', formato: 'Online · ao vivo',
    sobre: 'Uma semana dedicada à gestão e fiscalização de contratos administrativos: rotinas, modelos, checklists e as decisões que todo fiscal e gestor precisa conhecer, em formato 100% online.',
    stats: { dias: '5 dias', paineis: '+15', workshops: '5', publico: '+800' },
    localNome: '100% online, ao vivo',
    localDesc: 'Transmissão ao vivo com espaço para perguntas em todas as sessões. As gravações ficam disponíveis para os inscritos por 30 dias.',
    prog: [
      { dia: 'Segunda, 21/09', titulo: 'Fundamentos', itens: ['Abertura: o ciclo de vida do contrato administrativo', 'Papéis do gestor e do fiscal'] },
      { dia: 'Terça, 22/09', titulo: 'Rotinas de fiscalização', itens: ['Registro e acompanhamento da execução', 'Modelos e checklists comentados'] },
      { dia: 'Quarta, 23/09', titulo: 'Medições e pagamento', itens: ['Recebimento provisório e definitivo', 'Liquidação da despesa sem falhas'] },
      { dia: 'Quinta, 24/09', titulo: 'Alterações contratuais', itens: ['Reajuste, repactuação e reequilíbrio', 'Aditivos: limites e jurisprudência'] },
      { dia: 'Sexta, 25/09', titulo: 'Sanções e encerramento', itens: ['Irregularidades, notificação e penalidades', 'Painel de perguntas e encerramento'] },
    ],
  },
  'pregoeiros': {
    nome: 'Congresso de Pregoeiros e Agentes de Contratação',
    edicao: '3ª edição',
    tagline: 'O encontro nacional de quem conduz a licitação na prática.',
    datas: '19 a 22 de outubro de 2026', iso: '2026-10-19',
    cardDias: '19 a 22', cardMes: 'OUTUBRO · 2026',
    cardLocal: 'PRESENCIAL · RIO DE JANEIRO/RJ',
    cardDesc: 'O encontro nacional de quem conduz a licitação na prática: pregão eletrônico passo a passo, diálogo competitivo e os erros que mais geram responsabilização.',
    status: 'Inscrições abertas',
    localChip: 'Rio de Janeiro/RJ', formato: 'Presencial',
    sobre: 'Pregão eletrônico passo a passo, diálogo competitivo, condução da sessão e os erros que mais geram responsabilização: um congresso feito por e para quem opera a licitação.',
    stats: { dias: '4 dias', paineis: '+16', workshops: '6', publico: '+400' },
    localNome: 'Centro de Convenções · Rio de Janeiro/RJ',
    localDesc: 'Evento presencial. O endereço completo e as orientações de acesso são enviados após a inscrição.',
    prog: [
      { dia: 'Segunda, 19/10', titulo: 'Credenciamento e abertura', itens: ['Credenciamento e abertura oficial', 'Painel: o agente de contratação na Lei 14.133/21'] },
      { dia: 'Terça, 20/10', titulo: 'Preparação da licitação', itens: ['Edital e termo de referência sem falhas', 'Pesquisa de preços e orçamento sigiloso', 'Workshops simultâneos'] },
      { dia: 'Quarta, 21/10', titulo: 'Condução da sessão', itens: ['Lances, negociação e diligências na prática', 'Julgamento, habilitação e recursos', 'Workshops simultâneos'] },
      { dia: 'Quinta, 22/10', titulo: 'Responsabilização e encerramento', itens: ['Os erros que mais levam pregoeiros ao TCU', 'Painel de encerramento e certificados'] },
    ],
  },
  'governanca': {
    nome: 'Congresso de Governança e Controle na Contratação Pública',
    edicao: '1ª edição',
    tagline: 'Governança, gestão de riscos e controle interno aplicados às contratações.',
    datas: '23 a 26 de novembro de 2026', iso: '2026-11-23',
    cardDias: '23 a 26', cardMes: 'NOVEMBRO · 2026',
    cardLocal: 'PRESENCIAL · BELO HORIZONTE/MG',
    cardDesc: 'Governança, gestão de riscos e controle interno aplicados às contratações: o diálogo entre gestores, órgãos de controle e assessorias jurídicas.',
    status: 'Em breve',
    localChip: 'Belo Horizonte/MG', formato: 'Presencial',
    sobre: 'O diálogo entre gestores, órgãos de controle e assessorias jurídicas: governança, integridade, gestão de riscos e as linhas de defesa aplicadas à contratação pública.',
    stats: { dias: '4 dias', paineis: '+18', workshops: '6', publico: '+400' },
    localNome: 'Centro de Convenções · Belo Horizonte/MG',
    localDesc: 'Evento presencial. O endereço completo e as orientações de acesso são enviados após a inscrição.',
    prog: [
      { dia: 'Segunda, 23/11', titulo: 'Credenciamento e abertura', itens: ['Credenciamento e abertura oficial', 'Painel: governança das contratações na Lei 14.133/21'] },
      { dia: 'Terça, 24/11', titulo: 'Gestão de riscos', itens: ['Mapeamento de riscos da contratação', 'Integridade e prevenção de fraudes', 'Workshops simultâneos'] },
      { dia: 'Quarta, 25/11', titulo: 'Controle interno e externo', itens: ['As três linhas de defesa no órgão', 'O diálogo com os tribunais de contas', 'Workshops simultâneos'] },
      { dia: 'Quinta, 26/11', titulo: 'Encerramento', itens: ['Casos práticos de governança que deram certo', 'Painel de encerramento e certificados'] },
    ],
  },
};

const WA = 'https://wa.me/5521980936347';

const check = (txt) =>
  `<span style="display:inline-flex;align-items:flex-start;gap:9px;font-size:15px;color:#0C1A57"><span style="color:#C9A227;font-weight:800">✓</span>${txt}</span>`;

/* ---------------- Página agenda (/congressos) ---------------- */

function agendaCard(slug, c) {
  return `<div style="border:1px solid #e5e5ea;border-radius:16px;padding:28px 30px;display:grid;grid-template-columns:190px 1fr auto;gap:28px;align-items:center;background:#fff;transition:box-shadow .25s ease" data-hv="card">
        <div>
          <div style="font-size:34px;font-weight:600;color:#0C1A57;letter-spacing:-0.02em;line-height:1">${c.cardDias}</div>
          <div style="font-size:13px;letter-spacing:1.8px;font-weight:700;color:#C9A227;margin-top:6px">${c.cardMes}</div>
          <div style="display:inline-block;margin-top:12px;font-size:12px;font-weight:700;color:#0C1A57;background:#f5f5f7;border:1px solid #e5e5ea;border-radius:999px;padding:5px 12px">${c.edicao}</div>
        </div>
        <div>
          <div style="font-size:12px;letter-spacing:1.8px;font-weight:700;color:#8A90A6">${c.cardLocal}</div>
          <h3 style="font-size:23px;color:#0C1A57;margin:8px 0 0">${c.nome}</h3>
          <p style="font-size:15.5px;color:#5A6180;line-height:1.55;margin:8px 0 0;max-width:560px">${c.cardDesc}</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;align-items:stretch">
          <button data-href="/congressos/${slug}" style="background:#0C1A57;color:#fff;border:0;cursor:pointer;border-radius:999px;padding:13px 26px;font-weight:700;font-size:14.5px;text-align:center;display:inline-flex;align-items:center;justify-content:center;gap:8px" data-hv="navy">Saiba mais <span>→</span></button>
          <span style="font-size:12.5px;color:#8A90A6;text-align:center">${c.status}</span>
        </div>
      </div>`;
}

export const congressosPage = `<div>

  <!-- header -->
  <div style="max-width:1200px;margin:0 auto;padding:130px 30px 10px">
    <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">CONGRESSOS E EVENTOS</div>
    <h1 style="font-weight:600;font-size:48px;line-height:1.06;color:#0C1A57;margin:14px 0 0;max-width:840px">Os grandes encontros de quem faz a <span style="color:#C9A227">contratação pública</span> acontecer.</h1>
    <p style="font-size:18px;color:#5A6180;margin:18px 0 0;max-width:640px;line-height:1.55">Dias de imersão com professores de referência, painéis sobre a jurisprudência mais recente e networking com profissionais de todo o Brasil.</p>
    <div style="display:flex;gap:10px 22px;flex-wrap:wrap;margin-top:26px">
      ${['Certificado de participação', 'Palestrantes de referência nacional', 'Networking com o setor público', 'Edições presenciais e online']
        .map((t) => `<span style="display:inline-flex;align-items:center;gap:8px;font-size:14px;color:#42496A;font-weight:500"><span style="color:#C9A227;font-weight:800">✓</span>${t}</span>`)
        .join('\n      ')}
    </div>
  </div>

  <!-- AGENDA -->
  <div style="max-width:1200px;margin:0 auto;padding:48px 30px 20px">
    <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">AGENDA 2026</div>
    <div style="display:flex;flex-direction:column;gap:18px;margin-top:20px">
      ${Object.entries(CONGRESSOS).map(([slug, c]) => agendaCard(slug, c)).join('\n\n      ')}
    </div>
  </div>

  <!-- POR QUE PARTICIPAR -->
  <div style="max-width:1200px;margin:0 auto;padding:44px 30px 20px">
    <div style="background:#f5f5f7;border:1px solid #e5e5ea;border-radius:16px;padding:32px 34px">
      <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">POR QUE PARTICIPAR</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:20px">
        <div>
          <div style="font-size:16px;font-weight:600;color:#0C1A57">Conteúdo aplicável</div>
          <p style="font-size:14.5px;color:#5A6180;line-height:1.55;margin:6px 0 0">Painéis construídos a partir de casos reais e da jurisprudência do TCU.</p>
        </div>
        <div>
          <div style="font-size:16px;font-weight:600;color:#0C1A57">Professores atuantes</div>
          <p style="font-size:14.5px;color:#5A6180;line-height:1.55;margin:6px 0 0">Quem palestra é quem atua diariamente na Administração Pública.</p>
        </div>
        <div>
          <div style="font-size:16px;font-weight:600;color:#0C1A57">Networking nacional</div>
          <p style="font-size:14.5px;color:#5A6180;line-height:1.55;margin:6px 0 0">Troque experiências com servidores e profissionais de todo o país.</p>
        </div>
        <div>
          <div style="font-size:16px;font-weight:600;color:#0C1A57">Certificado</div>
          <p style="font-size:14.5px;color:#5A6180;line-height:1.55;margin:6px 0 0">Certificado de participação individual para sua progressão funcional.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- CTA FINAL -->
  <div style="max-width:1200px;margin:0 auto;padding:44px 30px 90px">
    <div style="background:linear-gradient(158deg,#0C1A57,#070E33);border-radius:16px;padding:52px 50px;text-align:center">
      <h2 style="font-size:31px;color:#fff;margin:0">Quer levar sua equipe a um congresso?</h2>
      <p style="font-size:17px;color:#B7C0DC;line-height:1.6;margin:14px auto 0;max-width:560px">Temos condições especiais para grupos e órgãos públicos. E se preferir um evento exclusivo para a sua instituição, conheça os treinamentos In Company.</p>
      <div style="display:flex;gap:13px;justify-content:center;margin-top:26px;flex-wrap:wrap">
        <a href="${WA}?text=${encodeURIComponent('Olá, quero inscrever um grupo em um congresso do Grupo CLG.')}" target="_blank" rel="noopener" style="background:#E9C65A;color:#0A1442;border-radius:999px;padding:17px 34px;font-weight:700;font-size:16px;display:inline-flex;align-items:center;gap:8px" data-hv="gold">Falar sobre inscrição em grupo <span>→</span></a>
        <button data-nav="incompany" style="background:rgba(255,255,255,0.06);color:#fff;border:1.5px solid rgba(255,255,255,0.28);border-radius:999px;padding:16px 30px;font-weight:600;font-size:16px;cursor:pointer" data-hv="outline">Ver treinamentos In Company</button>
      </div>
    </div>
  </div>

</div>`;

/* ---------------- LP do evento (/congressos/[slug]) ---------------- */

export function congressoHtml(slug) {
  const c = CONGRESSOS[slug];
  if (!c) return null;
  const wa = `${WA}?text=${encodeURIComponent(`Olá, quero garantir minha vaga no evento ${c.nome} (${c.datas}).`)}`;
  const waGrupo = `${WA}?text=${encodeURIComponent(`Olá, quero inscrever um grupo no evento ${c.nome}.`)}`;
  const chip = (v) =>
    `<span style="font-size:14px;font-weight:600;color:#fff;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.18);border-radius:999px;padding:9px 18px">${v}</span>`;
  const prog = c.prog
    .map((d, i) => `<details${i === 0 ? ' open' : ''} style="border:1px solid #e5e5ea;border-radius:5px;background:#fff">
        <summary style="cursor:pointer;padding:16px 34px 16px 18px;font-size:16px;font-weight:600;color:#0C1A57;display:flex;align-items:baseline;gap:12px"><span style="flex-shrink:0;font-size:12.5px;letter-spacing:1.4px;font-weight:700;color:#C9A227;text-transform:uppercase">${d.dia}</span>${d.titulo}</summary>
        <ul style="margin:0;padding:0 18px 16px 38px;display:flex;flex-direction:column;gap:7px">
          ${d.itens.map((it) => `<li style="font-size:14.5px;color:#5A6180;line-height:1.5">${it}</li>`).join('\n          ')}
        </ul>
      </details>`)
    .join('\n      ');
  return `<div>

  <!-- HERO -->
  <div style="position:relative;background:radial-gradient(1200px 620px at 74% 34%, rgba(41,66,150,0.55), transparent 58%), linear-gradient(158deg,#0C1A57,#070E33)">
    <div style="max-width:1160px;margin:0 auto;padding:150px 30px 100px;text-align:center">
      <button data-nav="congressos" style="background:none;border:0;color:#E9C65A;font-weight:600;font-size:14px;cursor:pointer;padding:0;display:inline-flex;align-items:center;gap:7px" data-hv="goldlink">← Todos os congressos</button>
      <div style="margin-top:26px"><span style="display:inline-block;font-size:12px;letter-spacing:2.2px;font-weight:700;color:#E9C65A;background:rgba(233,198,90,0.12);border:1px solid rgba(233,198,90,0.32);border-radius:999px;padding:8px 18px">${c.edicao.toUpperCase()}</span></div>
      <h1 style="font-weight:600;font-size:52px;line-height:1.06;color:#fff;margin:22px auto 0;max-width:820px">${c.nome}</h1>
      <p style="font-size:19px;line-height:1.6;color:#B7C0DC;margin:20px auto 0;max-width:620px">${c.tagline}</p>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:28px">
        ${chip(c.datas)}
        ${chip(c.localChip)}
        ${chip(c.formato)}
      </div>
      <div style="display:flex;gap:13px;justify-content:center;margin-top:36px;flex-wrap:wrap">
        <a href="${wa}" target="_blank" rel="noopener" style="background:#E9C65A;color:#0A1442;border-radius:999px;padding:17px 34px;font-weight:700;font-size:16px;display:inline-flex;align-items:center;gap:8px" data-hv="gold">Garantir minha vaga <span>→</span></a>
        <a href="#lp-prog" style="background:rgba(255,255,255,0.06);color:#fff;border:1.5px solid rgba(255,255,255,0.28);border-radius:999px;padding:16px 30px;font-weight:600;font-size:16px" data-hv="outline">Ver programação</a>
      </div>
      <div data-countdown="${c.iso}" style="margin-top:26px;font-size:14px;font-weight:600;color:#E9C65A"></div>
    </div>
  </div>

  <!-- NÚMEROS DO EVENTO -->
  <div style="max-width:1160px;margin:0 auto;padding:56px 30px 0">
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:center">
      <div><div style="font-size:42px;font-weight:600;color:#0C1A57;letter-spacing:-0.02em">${c.stats.dias}</div><div style="font-size:14px;color:#5A6180;margin-top:4px">de imersão</div></div>
      <div><div style="font-size:42px;font-weight:600;color:#0C1A57;letter-spacing:-0.02em">${c.stats.paineis}</div><div style="font-size:14px;color:#5A6180;margin-top:4px">painéis e palestras</div></div>
      <div><div style="font-size:42px;font-weight:600;color:#0C1A57;letter-spacing:-0.02em">${c.stats.workshops}</div><div style="font-size:14px;color:#5A6180;margin-top:4px">workshops práticos</div></div>
      <div><div style="font-size:42px;font-weight:600;color:#0C1A57;letter-spacing:-0.02em">${c.stats.publico}</div><div style="font-size:14px;color:#5A6180;margin-top:4px">participantes esperados</div></div>
    </div>
  </div>

  <!-- SOBRE O EVENTO -->
  <div style="max-width:1160px;margin:0 auto;padding:56px 30px 0">
    <div style="background:#f5f5f7;border:1px solid #e5e5ea;border-radius:16px;padding:36px 38px;display:grid;grid-template-columns:1.1fr 0.9fr;gap:40px;align-items:center">
      <div>
        <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">SOBRE O EVENTO</div>
        <p style="font-size:17px;color:#42496A;line-height:1.65;margin:14px 0 0">${c.sobre}</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px">
        ${check('Conteúdo ancorado na jurisprudência do TCU')}
        ${check('Professores que atuam na Administração Pública')}
        ${check('Networking com profissionais de todo o Brasil')}
        ${check('Certificado de participação incluso')}
      </div>
    </div>
  </div>

  <!-- PARA QUEM É -->
  <div style="max-width:1160px;margin:0 auto;padding:56px 30px 0">
    <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">PARA QUEM É</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:18px">
      <div style="border:1px solid #e5e5ea;border-radius:16px;padding:22px 24px"><div style="font-size:15.5px;font-weight:600;color:#0C1A57">Agentes de contratação</div><p style="font-size:14px;color:#5A6180;line-height:1.5;margin:6px 0 0">Pregoeiros e equipes de licitação.</p></div>
      <div style="border:1px solid #e5e5ea;border-radius:16px;padding:22px 24px"><div style="font-size:15.5px;font-weight:600;color:#0C1A57">Assessorias jurídicas</div><p style="font-size:14px;color:#5A6180;line-height:1.5;margin:6px 0 0">Procuradores, advogados e pareceristas.</p></div>
      <div style="border:1px solid #e5e5ea;border-radius:16px;padding:22px 24px"><div style="font-size:15.5px;font-weight:600;color:#0C1A57">Gestores e fiscais</div><p style="font-size:14px;color:#5A6180;line-height:1.5;margin:6px 0 0">Quem acompanha a execução dos contratos.</p></div>
      <div style="border:1px solid #e5e5ea;border-radius:16px;padding:22px 24px"><div style="font-size:15.5px;font-weight:600;color:#0C1A57">Controle e auditoria</div><p style="font-size:14px;color:#5A6180;line-height:1.5;margin:6px 0 0">Tribunais de contas e controladorias.</p></div>
    </div>
  </div>

  <!-- PROGRAMAÇÃO -->
  <div id="lp-prog" style="max-width:1160px;margin:0 auto;padding:56px 30px 0">
    <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">PROGRAMAÇÃO</div>
    <h2 style="font-size:32px;color:#0C1A57;margin:10px 0 0">Uma agenda pensada para a prática</h2>
    <div style="display:flex;flex-direction:column;gap:10px;margin-top:20px">
      ${prog}
    </div>
    <p style="font-size:13.5px;color:#8A90A6;margin:14px 0 0">Programação sujeita a ajustes. A grade completa de palestrantes será divulgada em breve.</p>
  </div>

  <!-- COORDENAÇÃO -->
  <div style="max-width:1160px;margin:0 auto;padding:56px 30px 0">
    <div style="background:#f5f5f7;border:1px solid #e5e5ea;border-radius:16px;padding:26px 28px;display:flex;gap:22px;align-items:center">
      <img src="/assets/bruno-verzani.png" alt="Bruno Verzani, coordenação técnica" style="width:84px;height:84px;border-radius:50%;object-fit:cover;object-position:50% 22%;flex-shrink:0">
      <div>
        <div style="font-size:12px;letter-spacing:2px;font-weight:700;color:#A89A6E">COORDENAÇÃO TÉCNICA</div>
        <div style="font-size:18px;font-weight:600;color:#0C1A57;margin-top:6px">Bruno Verzani</div>
        <p style="font-size:14.5px;color:#5A6180;line-height:1.55;margin:6px 0 0">Procurador do Estado do Rio de Janeiro. Responsável pela curadoria dos painéis e pela seleção dos palestrantes convidados.</p>
      </div>
    </div>
  </div>

  <!-- LOCAL -->
  <div style="max-width:1160px;margin:0 auto;padding:56px 30px 0">
    <div style="border:1px solid #e5e5ea;border-radius:16px;padding:32px 34px;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center">
      <div>
        <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">LOCAL E FORMATO</div>
        <div style="font-size:22px;font-weight:600;color:#0C1A57;margin-top:10px">${c.localNome}</div>
        <p style="font-size:15px;color:#5A6180;line-height:1.6;margin:10px 0 0">${c.localDesc}</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px">
        ${check('Credenciamento no primeiro dia')}
        ${check('Material e certificado inclusos')}
        ${check('Condições especiais para grupos e órgãos')}
      </div>
    </div>
  </div>

  <!-- CTA FINAL -->
  <div style="max-width:1160px;margin:0 auto;padding:56px 30px 90px">
    <div style="background:linear-gradient(158deg,#0C1A57,#070E33);border-radius:16px;padding:52px 50px;text-align:center">
      <h2 style="font-size:31px;color:#fff;margin:0">Garanta sua vaga na ${c.edicao}</h2>
      <p style="font-size:17px;color:#B7C0DC;line-height:1.6;margin:14px auto 0;max-width:560px">As vagas são limitadas e as últimas edições esgotaram. Fale com a nossa equipe e receba as condições de inscrição, inclusive para grupos.</p>
      <div style="display:flex;gap:13px;justify-content:center;margin-top:26px;flex-wrap:wrap">
        <a href="${wa}" target="_blank" rel="noopener" style="background:#E9C65A;color:#0A1442;border-radius:999px;padding:17px 34px;font-weight:700;font-size:16px;display:inline-flex;align-items:center;gap:8px" data-hv="gold">Garantir minha vaga <span>→</span></a>
        <a href="${waGrupo}" target="_blank" rel="noopener" style="background:rgba(255,255,255,0.06);color:#fff;border:1.5px solid rgba(255,255,255,0.28);border-radius:999px;padding:16px 30px;font-weight:600;font-size:16px" data-hv="outline">Inscrição em grupo</a>
      </div>
    </div>
  </div>

</div>`;
}
