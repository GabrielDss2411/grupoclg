// Conteúdo migrado do site original (markup preservado; bindings do runtime resolvidos).
import { congressosPage } from './congressos-data';

// Página agenda de congressos (gerada a partir do mapa CONGRESSOS).
export const congressos = congressosPage;

export const home = `<div>

  <!-- HERO -->
  <div style="min-height:100vh;display:flex;align-items:center;position:relative;background:radial-gradient(1200px 620px at 74% 34%, rgba(41,66,150,0.55), transparent 58%), linear-gradient(158deg,#0C1A57,#070E33)">
  <div style="width:100%;max-width:1200px;margin:0 auto;padding:130px 30px 70px;display:grid;grid-template-columns:1.02fr 0.98fr;gap:40px;align-items:center">
    <div data-hero-col>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:24px">
        <span style="width:22px;height:1.5px;background:#C9A227"></span>
        <span style="font-size:12px;letter-spacing:2.6px;font-weight:700;color:#E9C65A">CAPACITAÇÃO EM LICITAÇÕES E GESTÃO</span>
      </div>
      <h1 style="font-weight:500;font-size:60px;line-height:1.04;color:#fff;margin:0">
        Torne-se <span style="font-style:italic">referência técnica</span> em Licitações e Contratos.
      </h1>
      <p style="font-size:19px;line-height:1.6;color:#B7C0DC;margin:34px 0 0;max-width:480px;font-weight:400">
        Formação prática ancorada na jurisprudência do TCU, para você aplicar a Lei 14.133 com segurança e decidir sem medo de errar.
      </p>
      <div style="display:flex;gap:13px;margin-top:44px;flex-wrap:wrap">
        <button data-nav="cursos" style="background:#E9C65A;color:#0A1442;border:0;border-radius:999px;padding:16px 30px;font-weight:700;font-size:16px;cursor:pointer;display:inline-flex;align-items:center;gap:8px" data-hv="hv1">Ver turmas abertas <span style="font-size:15px">→</span></button>
        <button data-nav="home" style="background:none;color:rgba(255,255,255,0.82);border:1px solid rgba(255,255,255,0.22);border-radius:999px;padding:13px 22px;font-weight:500;font-size:15px;cursor:pointer" data-hv="hv2">Falar com um especialista</button>
      </div>
      <div style="margin-top:44px;display:inline-flex;align-items:center;gap:12px;background:rgba(233,198,90,0.1);border:1px solid rgba(233,198,90,0.28);border-radius:999px;padding:9px 18px">
        <div style="color:#E9C65A;font-size:15px;letter-spacing:1px">★★★★★</div>
        <span style="font-size:14px;color:#EDE3CF"><b style="color:#fff;font-weight:700">+12 mil profissionais</b> já se capacitaram · 4,9/5</span>
      </div>
    </div>

    <!-- HERO VISUAL -->
    
    
    <div data-hero-photo style="position:relative;height:560px;border-radius:22px;overflow:hidden;box-shadow:0 70px 130px -50px rgba(0,0,0,0.9);border:1px solid rgba(233,220,196,0.12)">
      <img id="clg-hero-img" src="/assets/bruno-verzani.png" alt="Bruno Verzani, Procurador do Estado do Rio de Janeiro" style="display:block;width:100%;height:100%;object-fit:cover;object-position:50% 16%">
      <div style="position:absolute;inset:0;background:linear-gradient(180deg, rgba(7,14,51,0) 42%,rgba(7,14,51,0.92) 100%)"></div>
      <div style="position:absolute;inset:0;background:linear-gradient(115deg, rgba(7,14,51,0.5) 0%,transparent 38%)"></div>
      <div style="position:absolute;left:0;right:0;bottom:0;padding:30px">
        <div style="color:#E9C65A;font-size:11px;font-weight:700;letter-spacing:2px">COORDENAÇÃO ACADÊMICA</div>
        <div style="font-family:'Newsreader',Georgia, serif;font-weight:500;font-size:29px;color:#fff;margin-top:6px;letter-spacing:-0.02em">Bruno Verzani</div>
        <div style="color:rgba(255,255,255,0.72);font-size:14px;margin-top:2px">Procurador do Estado do Rio de Janeiro</div>
      </div>
    </div>
    
  </div>
  </div>

  <!-- CREDIBILITY STRIP -->
  <div style="border-bottom:1px solid #e5e5ea;background:#f5f5f7">
    <div style="max-width:1160px;margin:0 auto;padding:34px 30px;display:grid;grid-template-columns:repeat(4,1fr)">
      <div style="text-align:center;padding:2px 22px">
        <div style="color:#C9A227;display:flex;justify-content:center"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.5" r="5"/><path d="M8.4 12.8 7 21l5-2.6 5 2.6-1.4-8.2"/><path d="M12 6.4l1 2 2.1.2-1.6 1.4.5 2-2-1.1-2 1.1.5-2-1.6-1.4 2.1-.2z"/></svg></div>
        <div style="font-weight:600;font-size:16.5px;color:#0C1A57;margin-top:12px">Referência técnica</div>
        <div style="font-size:13.5px;color:#5A6180;margin-top:3px">em contratação pública</div>
      </div>
      <div style="text-align:center;padding:2px 22px;border-left:1px solid #e5e5ea">
        <div style="color:#C9A227;display:flex;justify-content:center"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3.5h7l3.5 3.5V20.5H7z"/><path d="M14 3.5V7h3.5"/><path d="M9.5 12h6M9.5 15h6M9.5 9h3"/></svg></div>
        <div style="font-weight:600;font-size:16.5px;color:#0C1A57;margin-top:12px">Boletins do TCU</div>
        <div style="font-size:13.5px;color:#5A6180;margin-top:3px">jurisprudência atualizada</div>
      </div>
      <div style="text-align:center;padding:2px 22px;border-left:1px solid #e5e5ea">
        <div style="color:#C9A227;display:flex;justify-content:center"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3.6 19.5c0-3 2.4-5.2 5.4-5.2s5.4 2.2 5.4 5.2"/><circle cx="17.2" cy="9" r="2.3"/><path d="M15.6 14.6c2.7-.1 5 1.8 5 4.9"/></svg></div>
        <div style="font-weight:600;font-size:16.5px;color:#0C1A57;margin-top:12px">Professores</div>
        <div style="font-size:13.5px;color:#5A6180;margin-top:3px">de todo o Brasil</div>
      </div>
      <div style="text-align:center;padding:2px 22px;border-left:1px solid #e5e5ea">
        <div style="color:#C9A227;display:flex;justify-content:center"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9.5" r="5.5"/><path d="M9.6 9.4 11.3 11 14.4 7.9"/><path d="M8.4 14.2 7 21l5-2.4 5 2.4-1.4-6.8"/></svg></div>
        <div style="font-weight:600;font-size:16.5px;color:#0C1A57;margin-top:12px">Certificado individual</div>
        <div style="font-size:13.5px;color:#5A6180;margin-top:3px">a cada curso</div>
      </div>
    </div>
  </div>

  <!-- PROBLEMA -->
  <div style="max-width:860px;margin:0 auto;padding:104px 30px 88px;text-align:center">
    <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">O DESAFIO REAL</div>
    <h2 style="font-size:44px;line-height:1.1;color:#0C1A57;margin:20px 0 0">Cada nova decisão do TCU pode mudar <span style="color:#C9A227">uma contratação inteira</span>.</h2>
    <p style="font-size:19px;color:#5A6180;line-height:1.6;margin:24px auto 0;max-width:600px">Por isso você precisa acompanhar as atualizações da Lei 14.133 com quem analisa a jurisprudência todos os dias, e traduz cada acórdão em prática.</p>
    <div aria-hidden="true" style="width:1px;height:48px;background:linear-gradient(#C9A227,rgba(201,162,39,0));margin:46px auto 0"></div>
  </div>

  <!-- POR QUE ESCOLHER (tile escuro · lista editorial em hairlines) -->
  <div style="background:radial-gradient(900px 620px at 84% 0%, rgba(41,66,150,0.5), transparent 60%), linear-gradient(160deg,#0C1A57,#070E33);color:#fff">
    <div style="max-width:1160px;margin:0 auto;padding:104px 30px 100px;display:grid;grid-template-columns:0.82fr 1.18fr;gap:64px;align-items:start">
      <!-- ESQUERDA: headline + CTA -->
      <div>
        <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#C9A876">POR QUE O GRUPO CLG</div>
        <h2 style="font-size:42px;line-height:1.08;color:#fff;margin:20px 0 0">Quatro motivos para dominar a norma <span style="color:#E9C65A">com confiança</span></h2>
        <p style="font-size:16.5px;color:#AEB6D4;line-height:1.62;margin:22px 0 0;max-width:400px">Unimos autoridade técnica, jurisprudência aplicada e prática do dia a dia, a combinação que te dá segurança para decidir.</p>
        <button data-nav="cursos" style="margin-top:36px;display:inline-flex;align-items:center;gap:14px;background:#E9C65A;border:0;border-radius:999px;padding:7px 26px 7px 7px;cursor:pointer" data-hv="hv3">
          <span style="width:40px;height:40px;border-radius:50%;background:#0A1442;display:flex;align-items:center;justify-content:center;color:#E9C65A;font-size:16px;flex-shrink:0">→</span>
          <span style="color:#0A1442;font-weight:700;font-size:15px">Ver turmas abertas</span>
        </button>
      </div>

      <!-- DIREITA: grade 2×2 de cards -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div data-motivo data-reveal style="background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.09);border-radius:12px;padding:28px 26px">
          <div data-motivo-ico style="width:42px;height:42px;border-radius:50%;border:1.5px solid rgba(233,198,90,0.5);display:flex;align-items:center;justify-content:center;color:#E9C65A;margin-bottom:20px"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.2v16.3"/><path d="M7.8 19.5h8.4"/><path d="M4.5 7.3h15"/><path d="M4.5 7.3 2.3 12.1"/><path d="M4.5 7.3 6.7 12.1"/><path d="M2.3 12.1a2.2 1.9 0 0 0 4.4 0"/><path d="M19.5 7.3 17.3 12.1"/><path d="M19.5 7.3 21.7 12.1"/><path d="M17.3 12.1a2.2 1.9 0 0 0 4.4 0"/></svg></div>
          <h3 style="font-size:18px;color:#fff;margin:0;line-height:1.2">Aprenda com quem decide no setor público</h3>
          <p style="font-size:14px;color:#AEB6D4;margin:10px 0 0;line-height:1.55">Coordenação de Bruno Verzani, Procurador do Estado, e professores que atuam na linha de frente das contratações.</p>
        </div>
        <div data-motivo data-reveal style="background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.09);border-radius:12px;padding:28px 26px">
          <div data-motivo-ico style="width:42px;height:42px;border-radius:50%;border:1.5px solid rgba(233,198,90,0.5);display:flex;align-items:center;justify-content:center;color:#E9C65A;margin-bottom:20px"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3.5h7l3.5 3.5V20.5H7z"/><path d="M14 3.5V7h3.5"/><path d="M9.5 12h6"/><path d="M9.5 15h6"/><path d="M9.5 9h3"/></svg></div>
          <h3 style="font-size:18px;color:#fff;margin:0;line-height:1.2">Saia aplicando a Lei 14.133</h3>
          <p style="font-size:14px;color:#AEB6D4;margin:10px 0 0;line-height:1.55">Do edital ao contrato, licitações, pregão, fiscalização e pareceres, com estudos de caso reais do dia a dia.</p>
        </div>
        <div data-motivo data-reveal style="background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.09);border-radius:12px;padding:28px 26px">
          <div data-motivo-ico style="width:42px;height:42px;border-radius:50%;border:1.5px solid rgba(233,198,90,0.5);display:flex;align-items:center;justify-content:center;color:#E9C65A;margin-bottom:20px"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 9 12 4l8.5 5"/><path d="M4.5 9.2v8.3"/><path d="M19.5 9.2v8.3"/><path d="M8.5 9.2v8.3"/><path d="M12 9.2v8.3"/><path d="M15.5 9.2v8.3"/><path d="M3 20.2h18"/><path d="M4 17.6h16"/></svg></div>
          <h3 style="font-size:18px;color:#fff;margin:0;line-height:1.2">Jurisprudência, não teoria</h3>
          <p style="font-size:14px;color:#AEB6D4;margin:10px 0 0;line-height:1.55">Cada aula é ancorada em acórdãos do TCU, STJ e STF, para você fundamentar qualquer decisão que tomar.</p>
        </div>
        <div data-motivo data-reveal style="background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.09);border-radius:12px;padding:28px 26px">
          <div data-motivo-ico style="width:42px;height:42px;border-radius:50%;border:1.5px solid rgba(233,198,90,0.5);display:flex;align-items:center;justify-content:center;color:#E9C65A;margin-bottom:20px"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9.5" r="5.5"/><path d="M9.6 9.4 11.3 11 14.4 7.9"/><path d="M8.4 14.2 7 21l5-2.4 5 2.4-1.4-6.8"/></svg></div>
          <h3 style="font-size:18px;color:#fff;margin:0;line-height:1.2">Certificação que comprova seu domínio</h3>
          <p style="font-size:14px;color:#AEB6D4;margin:10px 0 0;line-height:1.55">Certificado individual a cada curso, para comprovar sua capacitação e evoluir na carreira pública.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- IN COMPANY (chamada na Home) -->
  <div style="max-width:1160px;margin:0 auto;padding:90px 30px 40px">
    <div style="display:grid;grid-template-columns:1fr 0.86fr;gap:56px;align-items:center">
      <div>
        <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">CAPACITAÇÃO IN COMPANY</div>
        <h2 style="font-size:40px;line-height:1.1;color:#0C1A57;margin:16px 0 0">Capacitações desenvolvidas para a <span style="color:#C9A227">realidade do seu órgão</span></h2>
        <p style="font-size:17px;color:#5A6180;line-height:1.6;margin:18px 0 0;max-width:520px">Nem sempre um curso aberto resolve os desafios específicos de uma instituição. Por isso, o Grupo CLG desenvolve programas <b style="color:#0C1A57;font-weight:600">In Company</b>, planejados conforme os processos, as necessidades e os objetivos de cada equipe.</p>
        <div style="display:flex;flex-direction:column;gap:13px;margin-top:26px">
          <div style="display:flex;align-items:center;gap:12px;font-size:15.5px;color:#0C1A57"><span style="width:22px;height:22px;border-radius:50%;background:rgba(201,162,39,0.14);color:#C9A227;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;flex-shrink:0">✓</span>Programa 100% personalizado</div>
          <div style="display:flex;align-items:center;gap:12px;font-size:15.5px;color:#0C1A57"><span style="width:22px;height:22px;border-radius:50%;background:rgba(201,162,39,0.14);color:#C9A227;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;flex-shrink:0">✓</span>Conteúdo baseado na realidade da instituição</div>
          <div style="display:flex;align-items:center;gap:12px;font-size:15.5px;color:#0C1A57"><span style="width:22px;height:22px;border-radius:50%;background:rgba(201,162,39,0.14);color:#C9A227;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;flex-shrink:0">✓</span>Casos práticos e jurisprudência atualizada</div>
          <div style="display:flex;align-items:center;gap:12px;font-size:15.5px;color:#0C1A57"><span style="width:22px;height:22px;border-radius:50%;background:rgba(201,162,39,0.14);color:#C9A227;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;flex-shrink:0">✓</span>Presencial, online ou híbrido</div>
          <div style="display:flex;align-items:center;gap:12px;font-size:15.5px;color:#0C1A57"><span style="width:22px;height:22px;border-radius:50%;background:rgba(201,162,39,0.14);color:#C9A227;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;flex-shrink:0">✓</span>Certificação individual dos participantes</div>
        </div>
        <button data-nav="incompany" style="margin-top:30px;background:#0C1A57;color:#fff;border:0;border-radius:999px;padding:16px 32px;font-weight:700;font-size:16px;cursor:pointer;display:inline-flex;align-items:center;gap:9px" data-hv="hv4">Ver treinamentos In Company <span>→</span></button>
      </div>
      <div data-reveal style="position:relative;border-radius:17px;overflow:hidden;box-shadow:rgba(0,0,0,0.22) 3px 5px 40px 0;border:1px solid #e5e5ea">
        <img src="/assets/advogados.jpg" alt="Equipe capacitada pelo Grupo CLG" style="display:block;width:100%;height:440px;object-fit:cover;object-position:50% 30%">
        <div style="position:absolute;inset:0;background:linear-gradient(180deg, rgba(7,14,51,0) 55%,rgba(7,14,51,0.85) 100%)"></div>
        <div style="position:absolute;left:0;right:0;bottom:0;padding:24px 26px">
          <div style="color:#E9C65A;font-size:11px;font-weight:700;letter-spacing:1.6px">TURMA FECHADA · NO SEU ÓRGÃO</div>
          <div style="font-size:18px;font-weight:600;color:#fff;margin-top:4px">Capacitação sob medida para a sua equipe</div>
        </div>
      </div>
    </div>
  </div>

  <!-- COMO FUNCIONA / TRILHA DE PERCURSO -->
  <div style="max-width:1000px;margin:0 auto;padding:90px 30px 24px">
    <div style="text-align:center;margin-bottom:58px">
      <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">COMO FUNCIONA</div>
      <h2 style="font-size:34px;color:#0C1A57;margin:12px 0 0">Sua trilha do primeiro acesso ao <span style="font-style:italic">certificado</span></h2>
    </div>

    <div data-trilha style="position:relative">
      <!-- caminho pontilhado (base) -->
      <div aria-hidden="true" data-trilha-path style="position:absolute;top:33px;left:16.66%;right:16.66%;height:0;border-top:2px dashed rgba(201,162,39,0.4);z-index:0"></div>
      <!-- caminho percorrido (dourado, animado) -->
      <div aria-hidden="true" data-trilha-path data-trilha-line style="position:absolute;top:32px;left:16.66%;right:16.66%;height:2px;border-radius:2px;background:linear-gradient(90deg,#C9A227,#E9C65A);transform:scaleX(0);transform-origin:left center;z-index:0"></div>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:30px;position:relative;z-index:1">
        <!-- 01 -->
        <div style="text-align:center;padding:0 10px">
          <div data-trilha-node style="width:68px;height:68px;margin:0 auto;border-radius:50%;background:#ffffff;border:2px solid #C9A227;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 8px #ffffff">
            <span style="font-family:'Newsreader',Georgia, serif;font-style:italic;font-weight:500;font-size:27px;color:#C9A227;line-height:1">01</span>
          </div>
          <h3 style="font-size:20px;color:#0C1A57;margin:24px 0 0">Escolha sua formação</h3>
          <p style="font-size:15px;color:#5A6180;margin:10px auto 0;line-height:1.55;max-width:280px">Selecione o curso ou a trilha certa para o seu momento profissional.</p>
        </div>
        <!-- 02 -->
        <div style="text-align:center;padding:0 10px">
          <div data-trilha-node style="width:68px;height:68px;margin:0 auto;border-radius:50%;background:#ffffff;border:2px solid #C9A227;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 8px #ffffff">
            <span style="font-family:'Newsreader',Georgia, serif;font-style:italic;font-weight:500;font-size:27px;color:#C9A227;line-height:1">02</span>
          </div>
          <h3 style="font-size:20px;color:#0C1A57;margin:24px 0 0">Aprenda na prática</h3>
          <p style="font-size:15px;color:#5A6180;margin:10px auto 0;line-height:1.55;max-width:280px">Aulas diretas ao ponto, com casos reais e jurisprudência aplicada em cada tema.</p>
        </div>
        <!-- 03 · destino -->
        <div style="text-align:center;padding:0 10px">
          <div data-trilha-node style="width:68px;height:68px;margin:0 auto;border-radius:50%;background:linear-gradient(150deg,#E9C65A,#C9A227);border:2px solid #C9A227;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 8px #ffffff, 0 16px 34px -12px rgba(201,162,39,0.65)">
            <span style="font-family:'Newsreader',Georgia, serif;font-style:italic;font-weight:500;font-size:27px;color:#0A1442;line-height:1">03</span>
          </div>
          <h3 style="font-size:20px;color:#0C1A57;margin:24px 0 0">Certifique-se</h3>
          <p style="font-size:15px;color:#5A6180;margin:10px auto 0;line-height:1.55;max-width:280px">Receba seu certificado individual e comprove o que você passou a dominar.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- AUTORIDADE / SPEAKER -->
  <div style="max-width:1160px;margin:0 auto;padding:100px 30px 20px">
    <div style="max-width:700px;margin:0 0 38px">
      <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">AUTORIDADE</div>
      <h2 style="font-family:'Schibsted Grotesk';font-weight:700;font-size:42px;line-height:1.06;letter-spacing:-1.5px;color:#0C1A57;margin:14px 0 0">Aprenda com quem constrói a <span style="font-family:'Newsreader';font-style:italic;font-weight:500">jurisprudência na prática</span></h2>
    </div>
    <div style="background:radial-gradient(720px 520px at 90% 8%, rgba(41,66,150,0.55), transparent 60%), linear-gradient(158deg,#0C1A57,#070E33);border-radius:30px;overflow:hidden;display:grid;grid-template-columns:0.8fr 1.2fr">
      <div style="position:relative;min-height:540px">
        <img id="clg-bento-verzani" src="/assets/bruno-verzani.png" alt="Bruno Verzani, Procurador do Estado do Rio de Janeiro" style="display:block;width:100%;height:100%;min-height:540px;object-fit:cover;object-position:50% 22%">
      </div>
      <div style="padding:64px 58px;display:flex;flex-direction:column;justify-content:center">
        <div style="color:#E9C65A;font-size:12px;font-weight:700;letter-spacing:1.8px">FUNDADOR &amp; COORDENADOR ACADÊMICO</div>
        <p style="font-family:'Newsreader';font-style:italic;font-weight:400;font-size:31px;line-height:1.34;color:#fff;margin:22px 0 0;max-width:580px">Procurador do Estado, autor e analista de jurisprudência, cada turma é desenhada para você aprender a norma como ela é aplicada de verdade.</p>
        <div style="font-family:'Schibsted Grotesk';font-weight:700;font-size:36px;color:#fff;letter-spacing:-0.8px;margin-top:32px">Bruno Verzani</div>
        <div style="color:#B7C0DC;font-size:16px;margin-top:5px">Procurador do Estado do Rio de Janeiro</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:26px">
          <span style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:999px;padding:8px 15px;font-size:12.5px;color:#D7DEF4;font-weight:600">Autor sobre contratação pública</span>
          <span style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:999px;padding:8px 15px;font-size:12.5px;color:#D7DEF4;font-weight:600">Coordenação acadêmica do CLG</span>
        </div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px">
      <div style="background:#fff;border:1px solid #e5e5ea;border-radius:20px;padding:26px 30px;display:flex;align-items:center;gap:22px">
        <div style="font-family:'Schibsted Grotesk';font-weight:700;font-size:19px;color:#0C1A57;line-height:1.15;flex-shrink:0;max-width:150px">Professores renomados</div>
        <div style="width:1px;height:38px;background:#e5e5ea"></div>
        <div style="color:#5A6180;font-size:14.5px;line-height:1.45">de todo o Brasil, autores de referência em contratação pública.</div>
      </div>
      <div style="background:#fff;border:1px solid #e5e5ea;border-radius:20px;padding:26px 30px;display:flex;align-items:center;gap:22px">
        <div style="font-family:'Schibsted Grotesk';font-weight:700;font-size:19px;color:#0C1A57;flex-shrink:0">@jurisprudencia.tcu</div>
        <div style="width:1px;height:38px;background:#e5e5ea"></div>
        <div style="color:#5A6180;font-size:14.5px;line-height:1.45">idealizadora do CLG e referência em boletins de jurisprudência do TCU.</div>
      </div>
    </div>
  </div>

  <!-- PROVA SOCIAL -->
  <div style="max-width:1160px;margin:0 auto;padding:78px 30px">
    <div style="text-align:center;margin-bottom:42px">
      <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">RESULTADOS</div>
      <h2 style="font-family:'Schibsted Grotesk';font-weight:700;font-size:38px;letter-spacing:-1px;color:#0C1A57;margin:12px 0 0">Quem estudou com a gente, <span style="font-family:'Newsreader';font-style:italic;font-weight:500">recomenda</span></h2>
    </div>

    <!-- featured -->
    <div style="background:radial-gradient(720px 440px at 86% 14%, rgba(41,66,150,0.5), transparent 60%), linear-gradient(158deg,#0C1A57,#070E33);border-radius:28px;overflow:hidden;display:grid;grid-template-columns:0.82fr 1.18fr;margin-bottom:22px">
      <img id="clg-featured" src="/assets/img-portrait-aluno.svg" alt="Aluno do Grupo CLG" style="display:block;width:100%;height:100%;min-height:360px;object-fit:cover">
      <div style="padding:52px 50px">
        <div style="color:#E9C65A;font-size:15px;letter-spacing:2px">★★★★★</div>
        <p style="font-family:'Newsreader';font-style:italic;font-weight:400;font-size:27px;line-height:1.36;color:#fff;margin:20px 0 0">“O melhor curso direcionado para a nossa área. Quero parabenizar o professor Verzani e toda a equipe.”</p>
        <div style="margin-top:24px;font-weight:600;font-size:16px;color:#fff">Fabio Jules</div>
        <div style="font-size:14px;color:#9BA6C8">Servidor público · Licitações e Contratos</div>
        <div style="height:1px;background:rgba(255,255,255,0.12);margin:28px 0 22px"></div>
        <div style="display:flex;gap:44px;flex-wrap:wrap">
          <div>
            <div style="font-size:12px;letter-spacing:1.5px;font-weight:700;color:#7E88AE">ANTES</div>
            <div style="font-size:15px;color:#B7C0DC;margin-top:6px;max-width:190px;line-height:1.4">Dúvidas dispersas sobre a norma</div>
          </div>
          <div>
            <div style="font-size:12px;letter-spacing:1.5px;font-weight:700;color:#E9C65A">DEPOIS</div>
            <div style="font-size:15px;color:#fff;margin-top:6px;max-width:220px;line-height:1.4;font-weight:600">Pareceres fundamentados em acórdãos do TCU</div>
          </div>
        </div>
      </div>
    </div>

    <!-- supporting -->
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:22px">
      
        <div style="background:#fff;border:1px solid #e5e5ea;border-radius:20px;padding:32px;display:flex;flex-direction:column">
          <div style="color:#C9A227;font-size:15px;letter-spacing:2px">★★★★★</div>
          <p style="font-family:'Newsreader';font-style:italic;font-weight:400;font-size:20px;line-height:1.5;color:#2A3252;margin:18px 0 0">“Todas as aulas foram excelentes, hoje estão, ao meu ver, entre as melhores do curso.”</p>
          <div style="display:flex;align-items:center;gap:12px;margin-top:auto;padding-top:26px">
            <div style="width:44px;height:44px;border-radius:50%;background:#0C1A57;display:flex;align-items:center;justify-content:center;font-family:'Schibsted Grotesk';font-weight:700;color:#fff">V</div>
            <div>
              <div style="font-weight:600;font-size:15px;color:#0C1A57">Dr. Vinicius de Lima</div>
              <div style="font-size:13px;color:#8A90A6">Advogado · Assessoria Jurídica</div>
            </div>
          </div>
        </div>
      

        <div style="background:#fff;border:1px solid #e5e5ea;border-radius:20px;padding:32px;display:flex;flex-direction:column">
          <div style="color:#C9A227;font-size:15px;letter-spacing:2px">★★★★★</div>
          <p style="font-family:'Newsreader';font-style:italic;font-weight:400;font-size:20px;line-height:1.5;color:#2A3252;margin:18px 0 0">“Parabéns à organização e aos professores. Os conteúdos são de altíssima qualidade.”</p>
          <div style="display:flex;align-items:center;gap:12px;margin-top:auto;padding-top:26px">
            <div style="width:44px;height:44px;border-radius:50%;background:#0C1A57;display:flex;align-items:center;justify-content:center;font-family:'Schibsted Grotesk';font-weight:700;color:#fff">D</div>
            <div>
              <div style="font-weight:600;font-size:15px;color:#0C1A57">Daniel Barion</div>
              <div style="font-size:13px;color:#8A90A6">Servidor público · Gestão Pública</div>
            </div>
          </div>
        </div>
      
    </div>
  </div>

  <!-- TURMAS COM INSCRIÇÕES ABERTAS (carrossel) -->
  <div data-row style="max-width:1200px;margin:0 auto;padding:78px 30px 20px">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap">
      <div style="max-width:640px">
        <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">MATRÍCULAS ABERTAS</div>
        <h2 style="font-size:38px;line-height:1.1;color:#0C1A57;margin:12px 0 0">Turmas com <span style="color:#C9A227">inscrições abertas</span></h2>
        <p style="font-size:17px;color:#5A6180;margin:12px 0 0;line-height:1.5">Garanta sua vaga nas próximas turmas, antes que as inscrições se encerrem.</p>
      </div>
      <div style="display:flex;gap:8px">
        <button data-slide="prev" aria-label="Anterior" style="width:40px;height:40px;border-radius:50%;background:#fff;border:1px solid #e5e5ea;color:#0C1A57;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:20px;line-height:1;padding-bottom:2px" data-hv="hv5">‹</button>
        <button data-slide="next" aria-label="Próximo" style="width:40px;height:40px;border-radius:50%;background:#fff;border:1px solid #e5e5ea;color:#0C1A57;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:20px;line-height:1;padding-bottom:2px" data-hv="hv6">›</button>
      </div>
    </div>
    <div data-slider class="hide-scroll" style="display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x proximity;scroll-behavior:smooth;padding:28px 2px 12px">
      <!-- CARD -->
      <div style="flex:0 0 300px;scroll-snap-align:start;background:#fff;border:1px solid #e5e5ea;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .25s ease, border-color .25s ease" data-hv="hv7">
        <div style="position:relative;padding:22px 22px 20px;background:radial-gradient(300px 200px at 92% 0%, rgba(41,66,150,0.5), transparent 60%), linear-gradient(150deg,#13275F,#0A1236);color:#fff">
          <div style="position:absolute;top:16px;right:16px;display:inline-flex;align-items:center;gap:7px;background:rgba(91,214,160,0.16);border:1px solid rgba(91,214,160,0.4);border-radius:999px;padding:5px 10px;font-size:11px;font-weight:600;color:#7FE0B0"><span style="width:7px;height:7px;border-radius:50%;background:#5BD6A0;display:inline-block"></span>Vagas abertas</div>
          <div style="font-size:11px;letter-spacing:1.2px;font-weight:700;color:#E9C65A">LICITAÇÕES</div>
          <h3 style="font-size:19px;font-weight:600;color:#fff;margin:28px 0 0;line-height:1.25">Nova Lei de Licitações e Contratos</h3>
        </div>
        <div style="padding:20px 22px;flex:1;display:flex;flex-direction:column;gap:12px">
          <div style="display:flex;align-items:center;gap:10px;font-size:14px;color:#42496A"><span style="color:#C9A227"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9h17M8 3.5v3M16 3.5v3"/></svg></span>Inscrições até <b style="color:#0C1A57;font-weight:600">25/07</b></div>
          <div style="display:flex;align-items:center;gap:10px;font-size:14px;color:#42496A"><span style="color:#C9A227"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.5"/><path d="M10 8.3l6 3.7-6 3.7z" fill="currentColor" stroke="none"/></svg></span>Início <b style="color:#0C1A57;font-weight:600">04/08</b> · 20 horas</div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:#C9A227;font-weight:600">Últimas 8 vagas</div>
          <button data-href="/cursos/lei-14133" style="margin-top:auto;background:#0C1A57;color:#fff;border:0;border-radius:999px;padding:12px;font-weight:700;font-size:14px;cursor:pointer;width:100%;display:inline-flex;align-items:center;justify-content:center;gap:8px" data-hv="hv8">Garantir vaga <span>→</span></button>
        </div>
      </div>
      <!-- CARD -->
      <div style="flex:0 0 300px;scroll-snap-align:start;background:#fff;border:1px solid #e5e5ea;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .25s ease, border-color .25s ease" data-hv="hv9">
        <div style="position:relative;padding:22px 22px 20px;background:radial-gradient(300px 200px at 92% 0%, rgba(41,66,150,0.5), transparent 60%), linear-gradient(150deg,#12285E,#0A1236);color:#fff">
          <div style="position:absolute;top:16px;right:16px;display:inline-flex;align-items:center;gap:7px;background:rgba(91,214,160,0.16);border:1px solid rgba(91,214,160,0.4);border-radius:999px;padding:5px 10px;font-size:11px;font-weight:600;color:#7FE0B0"><span style="width:7px;height:7px;border-radius:50%;background:#5BD6A0;display:inline-block"></span>Vagas abertas</div>
          <div style="font-size:11px;letter-spacing:1.2px;font-weight:700;color:#E9C65A">LICITAÇÕES</div>
          <h3 style="font-size:19px;font-weight:600;color:#fff;margin:28px 0 0;line-height:1.25">Pregão Eletrônico na Prática</h3>
        </div>
        <div style="padding:20px 22px;flex:1;display:flex;flex-direction:column;gap:12px">
          <div style="display:flex;align-items:center;gap:10px;font-size:14px;color:#42496A"><span style="color:#C9A227"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9h17M8 3.5v3M16 3.5v3"/></svg></span>Inscrições até <b style="color:#0C1A57;font-weight:600">30/07</b></div>
          <div style="display:flex;align-items:center;gap:10px;font-size:14px;color:#42496A"><span style="color:#C9A227"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.5"/><path d="M10 8.3l6 3.7-6 3.7z" fill="currentColor" stroke="none"/></svg></span>Início <b style="color:#0C1A57;font-weight:600">11/08</b> · 8 horas</div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:#C9A227;font-weight:600">12 vagas restantes</div>
          <button data-href="/cursos/pregao" style="margin-top:auto;background:#0C1A57;color:#fff;border:0;border-radius:999px;padding:12px;font-weight:700;font-size:14px;cursor:pointer;width:100%;display:inline-flex;align-items:center;justify-content:center;gap:8px" data-hv="hv10">Garantir vaga <span>→</span></button>
        </div>
      </div>
      <!-- CARD -->
      <div style="flex:0 0 300px;scroll-snap-align:start;background:#fff;border:1px solid #e5e5ea;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .25s ease, border-color .25s ease" data-hv="hv11">
        <div style="position:relative;padding:22px 22px 20px;background:radial-gradient(300px 200px at 92% 0%, rgba(41,66,150,0.5), transparent 60%), linear-gradient(150deg,#1A2C66,#0A1236);color:#fff">
          <div style="position:absolute;top:16px;right:16px;display:inline-flex;align-items:center;gap:7px;background:rgba(91,214,160,0.16);border:1px solid rgba(91,214,160,0.4);border-radius:999px;padding:5px 10px;font-size:11px;font-weight:600;color:#7FE0B0"><span style="width:7px;height:7px;border-radius:50%;background:#5BD6A0;display:inline-block"></span>Vagas abertas</div>
          <div style="font-size:11px;letter-spacing:1.2px;font-weight:700;color:#E9C65A">CONTRATOS</div>
          <h3 style="font-size:19px;font-weight:600;color:#fff;margin:28px 0 0;line-height:1.25">Gestão e Fiscalização de Contratos</h3>
        </div>
        <div style="padding:20px 22px;flex:1;display:flex;flex-direction:column;gap:12px">
          <div style="display:flex;align-items:center;gap:10px;font-size:14px;color:#42496A"><span style="color:#C9A227"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9h17M8 3.5v3M16 3.5v3"/></svg></span>Inscrições até <b style="color:#0C1A57;font-weight:600">08/08</b></div>
          <div style="display:flex;align-items:center;gap:10px;font-size:14px;color:#42496A"><span style="color:#C9A227"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.5"/><path d="M10 8.3l6 3.7-6 3.7z" fill="currentColor" stroke="none"/></svg></span>Início <b style="color:#0C1A57;font-weight:600">18/08</b> · 12 horas</div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:#C9A227;font-weight:600">Últimas 10 vagas</div>
          <button data-href="/cursos/fiscalizacao" style="margin-top:auto;background:#0C1A57;color:#fff;border:0;border-radius:999px;padding:12px;font-weight:700;font-size:14px;cursor:pointer;width:100%;display:inline-flex;align-items:center;justify-content:center;gap:8px" data-hv="hv12">Garantir vaga <span>→</span></button>
        </div>
      </div>
      <!-- CARD -->
      <div style="flex:0 0 300px;scroll-snap-align:start;background:#fff;border:1px solid #e5e5ea;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .25s ease, border-color .25s ease" data-hv="hv13">
        <div style="position:relative;padding:22px 22px 20px;background:radial-gradient(300px 200px at 92% 0%, rgba(41,66,150,0.5), transparent 60%), linear-gradient(150deg,#1E2A66,#0A1236);color:#fff">
          <div style="position:absolute;top:16px;right:16px;display:inline-flex;align-items:center;gap:7px;background:rgba(91,214,160,0.16);border:1px solid rgba(91,214,160,0.4);border-radius:999px;padding:5px 10px;font-size:11px;font-weight:600;color:#7FE0B0"><span style="width:7px;height:7px;border-radius:50%;background:#5BD6A0;display:inline-block"></span>Vagas abertas</div>
          <div style="font-size:11px;letter-spacing:1.2px;font-weight:700;color:#E9C65A">JURÍDICO</div>
          <h3 style="font-size:19px;font-weight:600;color:#fff;margin:28px 0 0;line-height:1.25">Assessoria Jurídica e Pareceres</h3>
        </div>
        <div style="padding:20px 22px;flex:1;display:flex;flex-direction:column;gap:12px">
          <div style="display:flex;align-items:center;gap:10px;font-size:14px;color:#42496A"><span style="color:#C9A227"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9h17M8 3.5v3M16 3.5v3"/></svg></span>Inscrições até <b style="color:#0C1A57;font-weight:600">15/08</b></div>
          <div style="display:flex;align-items:center;gap:10px;font-size:14px;color:#42496A"><span style="color:#C9A227"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.5"/><path d="M10 8.3l6 3.7-6 3.7z" fill="currentColor" stroke="none"/></svg></span>Início <b style="color:#0C1A57;font-weight:600">25/08</b> · 16 horas</div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:#C9A227;font-weight:600">15 vagas restantes</div>
          <button data-href="/cursos/pareceres" style="margin-top:auto;background:#0C1A57;color:#fff;border:0;border-radius:999px;padding:12px;font-weight:700;font-size:14px;cursor:pointer;width:100%;display:inline-flex;align-items:center;justify-content:center;gap:8px" data-hv="hv14">Garantir vaga <span>→</span></button>
        </div>
      </div>
      <!-- CARD -->
      <div style="flex:0 0 300px;scroll-snap-align:start;background:#fff;border:1px solid #e5e5ea;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .25s ease, border-color .25s ease" data-hv="hv15">
        <div style="position:relative;padding:22px 22px 20px;background:radial-gradient(300px 200px at 92% 0%, rgba(41,66,150,0.5), transparent 60%), linear-gradient(150deg,#163A6B,#0A1236);color:#fff">
          <div style="position:absolute;top:16px;right:16px;display:inline-flex;align-items:center;gap:7px;background:rgba(91,214,160,0.16);border:1px solid rgba(91,214,160,0.4);border-radius:999px;padding:5px 10px;font-size:11px;font-weight:600;color:#7FE0B0"><span style="width:7px;height:7px;border-radius:50%;background:#5BD6A0;display:inline-block"></span>Vagas abertas</div>
          <div style="font-size:11px;letter-spacing:1.2px;font-weight:700;color:#E9C65A">WORKSHOP</div>
          <h3 style="font-size:19px;font-weight:600;color:#fff;margin:28px 0 0;line-height:1.25">Licitações para Fornecedores</h3>
        </div>
        <div style="padding:20px 22px;flex:1;display:flex;flex-direction:column;gap:12px">
          <div style="display:flex;align-items:center;gap:10px;font-size:14px;color:#42496A"><span style="color:#C9A227"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9h17M8 3.5v3M16 3.5v3"/></svg></span>Inscrições até <b style="color:#0C1A57;font-weight:600">05/08</b></div>
          <div style="display:flex;align-items:center;gap:10px;font-size:14px;color:#42496A"><span style="color:#C9A227"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.5"/><path d="M10 8.3l6 3.7-6 3.7z" fill="currentColor" stroke="none"/></svg></span>Início <b style="color:#0C1A57;font-weight:600">15/08</b> · 8 horas</div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:#C9A227;font-weight:600">Últimas 9 vagas</div>
          <button data-href="/cursos/fornecedores" style="margin-top:auto;background:#0C1A57;color:#fff;border:0;border-radius:999px;padding:12px;font-weight:700;font-size:14px;cursor:pointer;width:100%;display:inline-flex;align-items:center;justify-content:center;gap:8px" data-hv="hv16">Garantir vaga <span>→</span></button>
        </div>
      </div>
      <!-- CARD -->
      <div style="flex:0 0 300px;scroll-snap-align:start;background:#fff;border:1px solid #e5e5ea;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .25s ease, border-color .25s ease" data-hv="hv17">
        <div style="position:relative;padding:22px 22px 20px;background:radial-gradient(300px 200px at 92% 0%, rgba(41,66,150,0.5), transparent 60%), linear-gradient(150deg,#15296B,#0A1236);color:#fff">
          <div style="position:absolute;top:16px;right:16px;display:inline-flex;align-items:center;gap:7px;background:rgba(91,214,160,0.16);border:1px solid rgba(91,214,160,0.4);border-radius:999px;padding:5px 10px;font-size:11px;font-weight:600;color:#7FE0B0"><span style="width:7px;height:7px;border-radius:50%;background:#5BD6A0;display:inline-block"></span>Vagas abertas</div>
          <div style="font-size:11px;letter-spacing:1.2px;font-weight:700;color:#E9C65A">TERCEIRO SETOR</div>
          <h3 style="font-size:19px;font-weight:600;color:#fff;margin:28px 0 0;line-height:1.25">MROSC, Organizações da Sociedade Civil</h3>
        </div>
        <div style="padding:20px 22px;flex:1;display:flex;flex-direction:column;gap:12px">
          <div style="display:flex;align-items:center;gap:10px;font-size:14px;color:#42496A"><span style="color:#C9A227"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9h17M8 3.5v3M16 3.5v3"/></svg></span>Inscrições até <b style="color:#0C1A57;font-weight:600">12/08</b></div>
          <div style="display:flex;align-items:center;gap:10px;font-size:14px;color:#42496A"><span style="color:#C9A227"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.5"/><path d="M10 8.3l6 3.7-6 3.7z" fill="currentColor" stroke="none"/></svg></span>Início <b style="color:#0C1A57;font-weight:600">22/08</b> · 6 horas</div>
          <div style="display:flex;align-items:center;gap:10px;font-size:13px;color:#C9A227;font-weight:600">14 vagas restantes</div>
          <button data-href="/cursos/mrosc" style="margin-top:auto;background:#0C1A57;color:#fff;border:0;border-radius:999px;padding:12px;font-weight:700;font-size:14px;cursor:pointer;width:100%;display:inline-flex;align-items:center;justify-content:center;gap:8px" data-hv="hv18">Garantir vaga <span>→</span></button>
        </div>
      </div>
    </div>
  </div>

  <!-- CTA CURSOS -->
  <div style="max-width:1160px;margin:0 auto;padding:20px 30px 10px">
    <div style="background:#f5f5f7;border:1px solid #e5e5ea;border-radius:28px;padding:58px 40px;text-align:center">
      <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">MATRÍCULAS ABERTAS</div>
      <h2 style="font-family:'Schibsted Grotesk';font-weight:700;font-size:36px;letter-spacing:-1px;color:#0C1A57;margin:12px auto 0;max-width:640px;line-height:1.14">Encontre a formação certa para o seu momento profissional</h2>
      <p style="font-size:17px;color:#5A6180;margin:16px auto 0;max-width:560px;line-height:1.5">Licitações, contratos, fiscalização, pregão e mais, turmas práticas, com certificado individual e valor que cabe no orçamento.</p>
      <div style="display:inline-flex;align-items:baseline;gap:8px;margin-top:22px"><span style="font-size:14px;color:#8A90A6">Investimento a partir de</span><span style="font-size:26px;font-weight:700;color:#0C1A57;letter-spacing:-0.02em">12x R$ 29</span><span style="font-size:14px;color:#8A90A6">· certificado incluso</span></div>
      <div style="margin-top:26px"><button data-nav="cursos" style="background:#0C1A57;color:#fff;border:0;border-radius:999px;padding:16px 34px;font-weight:700;font-size:16px;cursor:pointer;display:inline-flex;align-items:center;gap:9px" data-hv="hv19">Ver turmas abertas <span>→</span></button></div>
    </div>
  </div>

  <!-- FECHAMENTO DE IMPACTO + CONTATO -->
  <div style="background:radial-gradient(1000px 520px at 28% 18%, rgba(41,66,150,0.5), transparent 58%), linear-gradient(158deg,#0C1A57,#070E33);margin-top:30px">
    <div style="max-width:1000px;margin:0 auto;padding:104px 30px 104px;text-align:center">
      <div style="font-size:12px;letter-spacing:2.6px;font-weight:700;color:#E9C65A">COMECE AGORA</div>
      <h2 style="font-family:'Schibsted Grotesk';font-weight:700;font-size:52px;line-height:1.08;letter-spacing:-1.9px;color:#fff;margin:18px 0 0">Comece hoje e <span style="font-family:'Newsreader';font-style:italic;font-weight:500">acelere sua carreira</span> no setor público.</h2>
      <p style="font-size:19px;color:#B7C0DC;margin:22px auto 0;max-width:560px;line-height:1.5">Turmas com vagas limitadas e valor que cabe no orçamento público. Dê o próximo passo enquanto as matrículas estão abertas.</p>
      <div style="display:flex;gap:13px;justify-content:center;margin-top:34px;flex-wrap:wrap">
        <button data-nav="cursos" style="background:#E9C65A;color:#0A1442;border:0;border-radius:999px;padding:17px 34px;font-weight:700;font-size:16px;cursor:pointer" data-hv="hv20">Ver turmas abertas</button>
        <button data-nav="home" style="background:rgba(255,255,255,0.06);color:#fff;border:1.5px solid rgba(255,255,255,0.28);border-radius:999px;padding:16px 30px;font-weight:600;font-size:16px;cursor:pointer" data-hv="hv21">Falar com um especialista</button>
      </div>
    </div>
  </div>

</div>`;

export const cursos = `<div>

  <!-- header -->
  <div style="max-width:1200px;margin:0 auto;padding:130px 30px 10px">
    <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">CATÁLOGO DE CURSOS</div>
    <h1 style="font-weight:600;font-size:48px;line-height:1.06;color:#0C1A57;margin:14px 0 0;max-width:840px">Capacitações que unem teoria, prática e <span style="color:#C9A227">jurisprudência</span> em Licitações e Gestão Pública.</h1>
    <p style="font-size:18px;color:#5A6180;margin:18px 0 0;max-width:640px;line-height:1.55">Escolha entre cursos completos, workshops e formações especializadas, conduzidos por profissionais que atuam diariamente no setor público.</p>
    <div style="display:flex;gap:10px 22px;flex-wrap:wrap;margin-top:26px">
      <span style="display:inline-flex;align-items:center;gap:8px;font-size:14px;color:#42496A;font-weight:500"><span style="color:#C9A227;font-weight:800">✓</span>Certificado individual</span>
      <span style="display:inline-flex;align-items:center;gap:8px;font-size:14px;color:#42496A;font-weight:500"><span style="color:#C9A227;font-weight:800">✓</span>Professores atuantes</span>
      <span style="display:inline-flex;align-items:center;gap:8px;font-size:14px;color:#42496A;font-weight:500"><span style="color:#C9A227;font-weight:800">✓</span>Casos reais</span>
      <span style="display:inline-flex;align-items:center;gap:8px;font-size:14px;color:#42496A;font-weight:500"><span style="color:#C9A227;font-weight:800">✓</span>Conteúdo atualizado</span>
      <span style="display:inline-flex;align-items:center;gap:8px;font-size:14px;color:#42496A;font-weight:500"><span style="color:#C9A227;font-weight:800">✓</span>Online e presencial</span>
    </div>
  </div>

  <!-- POR QUE ESTUDAR + AUTORIDADE -->
  <div style="max-width:1200px;margin:0 auto;padding:36px 30px 0">
    <div style="background:#f5f5f7;border:1px solid #e5e5ea;border-radius:16px;padding:32px 34px;display:grid;grid-template-columns:1.1fr 0.9fr;gap:40px;align-items:center">
      <div>
        <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">POR QUE ESTUDAR NO GRUPO CLG</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px 24px;margin-top:18px">
          <span style="display:inline-flex;align-items:flex-start;gap:9px;font-size:15px;color:#0C1A57"><span style="color:#C9A227;font-weight:800">•</span>Professores atuantes na Administração Pública</span>
          <span style="display:inline-flex;align-items:flex-start;gap:9px;font-size:15px;color:#0C1A57"><span style="color:#C9A227;font-weight:800">•</span>Conteúdo atualizado conforme a jurisprudência</span>
          <span style="display:inline-flex;align-items:flex-start;gap:9px;font-size:15px;color:#0C1A57"><span style="color:#C9A227;font-weight:800">•</span>Metodologia prática, com casos reais</span>
          <span style="display:inline-flex;align-items:flex-start;gap:9px;font-size:15px;color:#0C1A57"><span style="color:#C9A227;font-weight:800">•</span>Certificação individual e material complementar</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;text-align:center;border-left:1px solid #e5e5ea;padding-left:36px">
        <div><div style="font-size:28px;font-weight:600;color:#0C1A57;letter-spacing:-0.02em">+12 mil</div><div style="font-size:13px;color:#5A6180;margin-top:2px">profissionais capacitados</div></div>
        <div><div style="font-size:28px;font-weight:600;color:#0C1A57;letter-spacing:-0.02em">+300</div><div style="font-size:13px;color:#5A6180;margin-top:2px">órgãos atendidos</div></div>
        <div><div style="font-size:28px;font-weight:600;color:#0C1A57;letter-spacing:-0.02em">15 anos</div><div style="font-size:13px;color:#5A6180;margin-top:2px">de experiência</div></div>
        <div><div style="font-size:28px;font-weight:600;color:#0C1A57;letter-spacing:-0.02em">4,9/5</div><div style="font-size:13px;color:#5A6180;margin-top:2px">avaliação média</div></div>
      </div>
    </div>
  </div>

  <!-- CATÁLOGO EM LINHAS (cards pôster) -->
  <div style="max-width:1200px;margin:0 auto;padding:52px 30px 90px">

    <!-- ROW: Licitações e Pregão -->
    <div data-row>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:16px">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="color:#C9A227"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.2v16.3"/><path d="M7.8 19.5h8.4"/><path d="M4.5 7.3h15"/><path d="M4.5 7.3 2.3 12.1M4.5 7.3 6.7 12.1"/><path d="M2.3 12.1a2.2 1.9 0 0 0 4.4 0"/><path d="M19.5 7.3 17.3 12.1M19.5 7.3 21.7 12.1"/><path d="M17.3 12.1a2.2 1.9 0 0 0 4.4 0"/></svg></span>
          <span style="font-size:21px;font-weight:600;color:#0C1A57;letter-spacing:-0.01em">Licitações e Pregão</span>
        </div>
        <div style="display:flex;align-items:center;gap:14px">
          <span style="font-size:14.5px;color:#8A90A6">3 cursos disponíveis</span>
          <div style="display:flex;gap:8px">
            <button data-slide="prev" aria-label="Anterior" style="width:38px;height:38px;border-radius:50%;background:#fff;border:1px solid #e5e5ea;color:#0C1A57;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:20px;line-height:1;padding-bottom:2px" data-hv="hv22">‹</button>
            <button data-slide="next" aria-label="Próximo" style="width:38px;height:38px;border-radius:50%;background:#fff;border:1px solid #e5e5ea;color:#0C1A57;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:20px;line-height:1;padding-bottom:2px" data-hv="hv23">›</button>
          </div>
        </div>
      </div>
      <div style="height:1px;background:#e5e5ea;margin:16px 0 26px"></div>
      <div data-slider class="hide-scroll" style="display:flex;gap:24px;overflow-x:auto;scroll-snap-type:x proximity;scroll-behavior:smooth;padding:4px 2px 12px">
        <div data-href="/cursos/lei-14133" style="cursor:pointer;flex:0 0 300px;scroll-snap-align:start">
          <div style="border-radius:16px;overflow:hidden;aspect-ratio:380/500;box-shadow:0 20px 44px -34px rgba(10,20,66,0.45);transition:transform .25s ease, box-shadow .25s ease" data-hv="hv24"><img src="/assets/poster-14133.svg" alt="Nova Lei de Licitações e Contratos" style="display:block;width:100%;height:100%;object-fit:cover"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:13px"><span style="font-size:13px;color:#8A90A6">8 módulos · 20 horas</span><span style="font-size:12.5px;font-weight:600;color:#C9A227">Ver programa →</span></div>
        </div>
        <div data-href="/cursos/pregao" style="cursor:pointer;flex:0 0 300px;scroll-snap-align:start">
          <div style="border-radius:16px;overflow:hidden;aspect-ratio:380/500;box-shadow:0 20px 44px -34px rgba(10,20,66,0.45);transition:transform .25s ease, box-shadow .25s ease" data-hv="hv25"><img src="/assets/poster-pregao.svg" alt="Pregão Eletrônico na Prática" style="display:block;width:100%;height:100%;object-fit:cover"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:13px"><span style="font-size:13px;color:#8A90A6">4 módulos · 8 horas</span><span style="font-size:12.5px;font-weight:600;color:#C9A227">Ver programa →</span></div>
        </div>
        <div data-href="/cursos/fornecedores" style="cursor:pointer;flex:0 0 300px;scroll-snap-align:start">
          <div style="border-radius:16px;overflow:hidden;aspect-ratio:380/500;box-shadow:0 20px 44px -34px rgba(10,20,66,0.45);transition:transform .25s ease, box-shadow .25s ease" data-hv="hv26"><img src="/assets/poster-fornecedores.svg" alt="Licitações para Fornecedores" style="display:block;width:100%;height:100%;object-fit:cover"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:13px"><span style="font-size:13px;color:#8A90A6">4 módulos · 8 horas</span><span style="font-size:12.5px;font-weight:600;color:#C9A227">Ver programa →</span></div>
        </div>
      </div>
    </div>

    <!-- ROW: Contratos e Pareceres -->
    <div data-row style="margin-top:64px">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:16px">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="color:#C9A227"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3.5h7l3.5 3.5V20.5H7z"/><path d="M14 3.5V7h3.5"/><path d="M9.3 13.6l1.6 1.6 3.4-3.4"/></svg></span>
          <span style="font-size:21px;font-weight:600;color:#0C1A57;letter-spacing:-0.01em">Contratos e Pareceres</span>
        </div>
        <div style="display:flex;align-items:center;gap:14px">
          <span style="font-size:14.5px;color:#8A90A6">2 cursos disponíveis</span>
          <div style="display:flex;gap:8px">
            <button data-slide="prev" aria-label="Anterior" style="width:38px;height:38px;border-radius:50%;background:#fff;border:1px solid #e5e5ea;color:#0C1A57;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:20px;line-height:1;padding-bottom:2px" data-hv="hv27">‹</button>
            <button data-slide="next" aria-label="Próximo" style="width:38px;height:38px;border-radius:50%;background:#fff;border:1px solid #e5e5ea;color:#0C1A57;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:20px;line-height:1;padding-bottom:2px" data-hv="hv28">›</button>
          </div>
        </div>
      </div>
      <div style="height:1px;background:#e5e5ea;margin:16px 0 26px"></div>
      <div data-slider class="hide-scroll" style="display:flex;gap:24px;overflow-x:auto;scroll-snap-type:x proximity;scroll-behavior:smooth;padding:4px 2px 12px">
        <div data-href="/cursos/fiscalizacao" style="cursor:pointer;flex:0 0 300px;scroll-snap-align:start">
          <div style="border-radius:16px;overflow:hidden;aspect-ratio:380/500;box-shadow:0 20px 44px -34px rgba(10,20,66,0.45);transition:transform .25s ease, box-shadow .25s ease" data-hv="hv29"><img src="/assets/poster-fiscalizacao.svg" alt="Gestão e Fiscalização de Contratos" style="display:block;width:100%;height:100%;object-fit:cover"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:13px"><span style="font-size:13px;color:#8A90A6">5 módulos · 12 horas</span><span style="font-size:12.5px;font-weight:600;color:#C9A227">Ver programa →</span></div>
        </div>
        <div data-href="/cursos/pareceres" style="cursor:pointer;flex:0 0 300px;scroll-snap-align:start">
          <div style="border-radius:16px;overflow:hidden;aspect-ratio:380/500;box-shadow:0 20px 44px -34px rgba(10,20,66,0.45);transition:transform .25s ease, box-shadow .25s ease" data-hv="hv30"><img src="/assets/poster-pareceres.svg" alt="Assessoria Jurídica e Elaboração de Pareceres" style="display:block;width:100%;height:100%;object-fit:cover"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:13px"><span style="font-size:13px;color:#8A90A6">6 módulos · 16 horas</span><span style="font-size:12.5px;font-weight:600;color:#C9A227">Ver programa →</span></div>
        </div>
      </div>
    </div>

    <!-- ROW: Terceiro Setor -->
    <div data-row style="margin-top:64px">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:16px">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="color:#C9A227"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3.6 19.5c0-3 2.4-5.2 5.4-5.2s5.4 2.2 5.4 5.2"/><circle cx="17.2" cy="9" r="2.3"/><path d="M15.6 14.6c2.7-.1 5 1.8 5 4.9"/></svg></span>
          <span style="font-size:21px;font-weight:600;color:#0C1A57;letter-spacing:-0.01em">Terceiro Setor</span>
        </div>
        <div style="display:flex;align-items:center;gap:14px">
          <span style="font-size:14.5px;color:#8A90A6">1 curso disponível</span>
          <div style="display:flex;gap:8px">
            <button data-slide="prev" aria-label="Anterior" style="width:38px;height:38px;border-radius:50%;background:#fff;border:1px solid #e5e5ea;color:#0C1A57;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:20px;line-height:1;padding-bottom:2px" data-hv="hv31">‹</button>
            <button data-slide="next" aria-label="Próximo" style="width:38px;height:38px;border-radius:50%;background:#fff;border:1px solid #e5e5ea;color:#0C1A57;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:20px;line-height:1;padding-bottom:2px" data-hv="hv32">›</button>
          </div>
        </div>
      </div>
      <div style="height:1px;background:#e5e5ea;margin:16px 0 26px"></div>
      <div data-slider class="hide-scroll" style="display:flex;gap:24px;overflow-x:auto;scroll-snap-type:x proximity;scroll-behavior:smooth;padding:4px 2px 12px">
        <div data-href="/cursos/mrosc" style="cursor:pointer;flex:0 0 300px;scroll-snap-align:start">
          <div style="border-radius:16px;overflow:hidden;aspect-ratio:380/500;box-shadow:0 20px 44px -34px rgba(10,20,66,0.45);transition:transform .25s ease, box-shadow .25s ease" data-hv="hv33"><img src="/assets/poster-mrosc.svg" alt="MROSC, Organizações da Sociedade Civil" style="display:block;width:100%;height:100%;object-fit:cover"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:13px"><span style="font-size:13px;color:#8A90A6">3 módulos · 6 horas</span><span style="font-size:12.5px;font-weight:600;color:#C9A227">Ver programa →</span></div>
        </div>
      </div>
    </div>

  </div>

</div>`;

export const sobre = `<div>
  <div style="max-width:960px;margin:0 auto;padding:138px 30px 20px;text-align:center">
    <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">SOBRE O GRUPO CLG</div>
    <h1 style="font-weight:600;font-size:50px;line-height:1.05;letter-spacing:-0.022em;color:#0C1A57;margin:16px 0 0">Capacitação de <span style="color:#C9A227">alto nível</span> em contratação pública, ao alcance de quem serve o público.</h1>
    <p style="font-size:19px;line-height:1.55;color:#5A6180;margin:24px auto 0;max-width:680px">
      O Grupo CLG nasceu da equipe do @jurisprudencia.tcu e é coordenado por Bruno Verzani, Procurador do Estado do Rio de Janeiro. Reunimos quem vive a norma para formar quem a aplica todos os dias.
    </p>
  </div>
  <div style="max-width:1160px;margin:0 auto;padding:30px 30px 0">
    <img id="clg-sobre-hero" src="/assets/img-auditorio.svg" alt="Auditório e equipe do Grupo CLG" style="display:block;width:100%;height:420px;object-fit:cover;border-radius:24px">
  </div>

  <div style="max-width:960px;margin:0 auto;padding:70px 30px 20px;display:grid;grid-template-columns:0.8fr 1.2fr;gap:50px">
    <h2 style="font-weight:600;font-size:32px;letter-spacing:-0.02em;color:#0C1A57;margin:0;line-height:1.14">Nossa missão</h2>
    <p style="font-size:18px;line-height:1.65;color:#42496A;margin:0">
      Contratação pública exige domínio técnico, mas capacitação de qualidade costuma ser cara e distante da rotina de quem faz o trabalho. O Grupo CLG existe para mudar isso. Reunimos os melhores especialistas em Licitações, Contratos, Direito Financeiro, Estatais e Gestão Pública e entregamos formação prática, ancorada na jurisprudência, a um preço que cabe no orçamento público.
    </p>
  </div>

  <div style="max-width:1160px;margin:0 auto;padding:56px 30px">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
      <div style="background:#fff;border:1px solid #e5e5ea;border-radius:20px;padding:34px">
        <div style="width:34px;height:2px;background:#C9A227;margin-bottom:20px"></div>
        <div style="font-weight:600;font-size:24px;color:#0C1A57">Excelência</div>
        <p style="font-size:15.5px;color:#5A6180;margin:12px 0 0;line-height:1.55">Professores que atuam na Administração Pública e são autores de referência em contratação pública.</p>
      </div>
      <div style="background:#0C1A57;border-radius:20px;padding:34px">
        <div style="width:34px;height:2px;background:#C9A227;margin-bottom:20px"></div>
        <div style="font-weight:600;font-size:24px;color:#fff">Acessível</div>
        <p style="font-size:15.5px;color:#C6CEE6;margin:12px 0 0;line-height:1.55">Valor bem abaixo do mercado. Capacitação de qualidade não deveria ser privilégio.</p>
      </div>
      <div style="background:#fff;border:1px solid #e5e5ea;border-radius:20px;padding:34px">
        <div style="width:34px;height:2px;background:#C9A227;margin-bottom:20px"></div>
        <div style="font-weight:600;font-size:24px;color:#0C1A57">Prático</div>
        <p style="font-size:15.5px;color:#5A6180;margin:12px 0 0;line-height:1.55">Cada aula ancorada em acórdãos do TCU, STJ e STF, prontos para aplicar na sua rotina.</p>
      </div>
    </div>
  </div>

  <div style="max-width:1160px;margin:0 auto;padding:20px 30px 90px">
    <div style="background:#fff;border:1px solid #e5e5ea;border-radius:24px;padding:14px;display:grid;grid-template-columns:1fr 1.4fr;gap:14px;align-items:center">
      <img id="clg-verzani-sobre" src="/assets/bruno-verzani.png" alt="Bruno Verzani, coordenação acadêmica" style="display:block;width:100%;height:360px;object-fit:cover;border-radius:18px;object-position:50% 22%">
      <div style="padding:38px 42px">
        <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">COORDENAÇÃO ACADÊMICA</div>
        <div style="font-weight:600;font-size:32px;color:#0C1A57;margin-top:10px;letter-spacing:-0.02em">Bruno Verzani</div>
        <p style="font-size:17px;line-height:1.6;color:#42496A;margin:16px 0 0">Procurador do Estado do Rio de Janeiro, Bruno coordena academicamente cada curso, para que você aprenda a norma como ela é aplicada de verdade, não apenas na teoria.</p>
        <button data-nav="cursos" style="margin-top:26px;background:#0C1A57;color:#fff;border:0;border-radius:999px;padding:14px 26px;font-weight:600;font-size:15px;cursor:pointer" data-hv="hv34">Ver turmas abertas</button>
      </div>
    </div>
  </div>
</div>`;

export const incompany = `<div>

  <!-- HERO -->
  <div data-incompany-hero style="position:relative;overflow:hidden;min-height:100vh;display:flex;align-items:center;background:radial-gradient(880px 640px at 16% 22%, rgba(41,66,150,0.5), transparent 60%), linear-gradient(160deg,#0C1A57,#070E33);color:#fff">
    <div data-hero-photo data-incompany-photo style="position:absolute;top:0;right:0;bottom:0;width:50%">
      <img src="/assets/bruno-verzani.png" alt="Bruno Verzani conduzindo capacitação" style="display:block;width:100%;height:100%;object-fit:cover;object-position:50% 12%">
      <div style="position:absolute;inset:0;background:linear-gradient(90deg,#0C1A57 0%,rgba(12,26,87,0.6) 24%,transparent 62%)"></div>
      <div style="position:absolute;inset:0;background:linear-gradient(180deg, transparent 50%,rgba(7,14,51,0.65) 100%)"></div>
    </div>
    <div style="position:relative;width:100%;max-width:1160px;margin:0 auto;padding:150px 30px 100px">
      <div data-hero-col style="max-width:640px">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(233,198,90,0.12);border:1px solid rgba(233,198,90,0.35);border-radius:999px;padding:8px 15px;font-size:11.5px;letter-spacing:1.4px;font-weight:700;color:#E9C65A">CAPACITAÇÃO IN COMPANY · SOB MEDIDA</div>
        <h1 style="font-size:55px;line-height:1.03;color:#fff;margin:26px 0 0">Cada órgão enfrenta desafios diferentes. O seu treinamento <span style="color:#E9C65A">também deveria ser único</span>.</h1>
        <p style="font-size:19px;color:#C3CBE0;line-height:1.6;margin:28px 0 0;max-width:500px">Cada instituição tem processos, equipes e desafios próprios. Entendemos a realidade do seu órgão para construir uma capacitação que realmente faça sentido.</p>
        <div style="display:flex;gap:13px;margin-top:38px;flex-wrap:wrap;align-items:center">
          <a href="https://wa.me/5521980936347?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20proposta%20de%20capacita%C3%A7%C3%A3o%20In%20Company%20para%20o%20meu%20%C3%B3rg%C3%A3o." target="_blank" rel="noopener" style="background:#E9C65A;color:#0A1442;border-radius:999px;padding:17px 32px;font-weight:700;font-size:16px;display:inline-flex;align-items:center;gap:8px">Solicitar proposta <span>→</span></a>
          <a href="https://wa.me/5521980936347?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20conversa%20sobre%20capacita%C3%A7%C3%A3o%20In%20Company." target="_blank" rel="noopener" style="color:#fff;font-weight:600;font-size:15.5px;display:inline-flex;align-items:center;gap:8px;padding:10px 4px" data-hv="hv35">Falar com um especialista <span style="color:#E9C65A">→</span></a>
        </div>
        <div style="font-size:13.5px;color:#9BA6C8;margin-top:18px">Proposta sem compromisso · resposta em até 1 dia útil</div>
        <div style="display:flex;gap:40px;flex-wrap:wrap;margin-top:48px;padding-top:26px;border-top:1px solid rgba(255,255,255,0.12)">
          <div style="max-width:210px"><div style="font-size:12px;color:#8892B0">Coordenação acadêmica</div><div style="font-size:14px;font-weight:500;color:#C3CBE0;margin-top:3px">Bruno Verzani · Procurador do Estado</div></div>
          <div style="max-width:190px"><div style="font-size:12px;color:#8892B0">Formato</div><div style="font-size:14px;font-weight:500;color:#C3CBE0;margin-top:3px">Presencial, online ou híbrido</div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- INDICADORES INSTITUCIONAIS (números a confirmar pelo cliente) -->
  <div style="border-bottom:1px solid #e5e5ea;background:#f5f5f7">
    <div style="max-width:1160px;margin:0 auto;padding:42px 30px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;text-align:center">
      <div><div style="font-size:42px;font-weight:600;color:#0C1A57;letter-spacing:-0.02em">+300</div><div style="font-size:14.5px;color:#5A6180;margin-top:4px">órgãos atendidos</div></div>
      <div style="border-left:1px solid #e5e5ea;border-right:1px solid #e5e5ea"><div style="font-size:42px;font-weight:600;color:#0C1A57;letter-spacing:-0.02em">+12 mil</div><div style="font-size:14.5px;color:#5A6180;margin-top:4px">profissionais capacitados</div></div>
      <div><div style="font-size:42px;font-weight:600;color:#0C1A57;letter-spacing:-0.02em">15 anos</div><div style="font-size:14.5px;color:#5A6180;margin-top:4px">formando especialistas</div></div>
    </div>
  </div>

  <!-- POR QUE SOB MEDIDA -->
  <div style="max-width:820px;margin:0 auto;padding:104px 30px 44px;text-align:center">
    <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">POR QUE SOB MEDIDA</div>
    <h2 style="font-size:40px;line-height:1.12;color:#0C1A57;margin:18px 0 0">Curso de prateleira não resolve o problema do <span style="color:#C9A227">seu órgão</span>.</h2>
    <p style="font-size:19px;color:#5A6180;line-height:1.62;margin:24px auto 0;max-width:660px">Todo órgão tem processos, maturidade, riscos e dúvidas diferentes. Então por que oferecer exatamente o mesmo curso para todos? Na metodologia In Company, o conteúdo <b style="color:#0C1A57;font-weight:600">nasce da realidade da sua equipe</b>.</p>
  </div>
  <!-- COMPARATIVO -->
  <div style="max-width:1000px;margin:0 auto;padding:0 30px 96px">
    <div style="display:grid;grid-template-columns:0.92fr 1.08fr;gap:20px;align-items:stretch">
      <div style="background:#fff;border:1px solid #dcdce1;border-radius:14px;padding:32px 30px;box-shadow:0 18px 42px -34px rgba(10,20,66,0.28)">
        <div style="font-size:12px;letter-spacing:1.6px;font-weight:700;color:#8A8F9E">TREINAMENTO GENÉRICO</div>
        <div style="display:flex;flex-direction:column;gap:15px;margin-top:22px">
          <div style="display:flex;gap:13px;align-items:flex-start;color:#666B78;font-size:15.5px;line-height:1.45"><span style="width:21px;height:21px;border-radius:50%;background:#e4e4ea;color:#767C8B;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0">✕</span><span>Conteúdo padrão, igual para qualquer órgão</span></div>
          <div style="display:flex;gap:13px;align-items:flex-start;color:#666B78;font-size:15.5px;line-height:1.45"><span style="width:21px;height:21px;border-radius:50%;background:#e4e4ea;color:#767C8B;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0">✕</span><span>Exemplos distantes da rotina da sua equipe</span></div>
          <div style="display:flex;gap:13px;align-items:flex-start;color:#666B78;font-size:15.5px;line-height:1.45"><span style="width:21px;height:21px;border-radius:50%;background:#e4e4ea;color:#767C8B;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0">✕</span><span>Dúvidas específicas ficam sem resposta</span></div>
          <div style="display:flex;gap:13px;align-items:flex-start;color:#666B78;font-size:15.5px;line-height:1.45"><span style="width:21px;height:21px;border-radius:50%;background:#e4e4ea;color:#767C8B;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0">✕</span><span>Ritmo que ignora o nível real dos servidores</span></div>
        </div>
      </div>
      <div style="background:radial-gradient(520px 320px at 88% 0%, rgba(233,198,90,0.16), transparent 62%), linear-gradient(155deg,#12235F,#0A1440);border:1px solid rgba(233,198,90,0.45);border-radius:14px;padding:34px 34px;position:relative;box-shadow:0 44px 90px -50px rgba(10,20,66,0.6)">
        <div style="position:absolute;top:-13px;right:24px;background:#E9C65A;color:#0A1442;font-size:10.5px;letter-spacing:1px;font-weight:700;border-radius:999px;padding:6px 13px">NOSSA METODOLOGIA</div>
        <div style="font-size:12px;letter-spacing:1.6px;font-weight:700;color:#E9C65A">IN COMPANY · GRUPO CLG</div>
        <div style="display:flex;flex-direction:column;gap:16px;margin-top:22px">
          <div style="display:flex;gap:13px;align-items:flex-start;color:#EAEFFA;font-size:16px;line-height:1.45"><span style="width:22px;height:22px;border-radius:50%;background:#E9C65A;color:#0A1442;display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex-shrink:0">✓</span><span>Ementa construída a partir do seu diagnóstico</span></div>
          <div style="display:flex;gap:13px;align-items:flex-start;color:#EAEFFA;font-size:16px;line-height:1.45"><span style="width:22px;height:22px;border-radius:50%;background:#E9C65A;color:#0A1442;display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex-shrink:0">✓</span><span>Casos e acórdãos da sua área de atuação</span></div>
          <div style="display:flex;gap:13px;align-items:flex-start;color:#EAEFFA;font-size:16px;line-height:1.45"><span style="width:22px;height:22px;border-radius:50%;background:#E9C65A;color:#0A1442;display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex-shrink:0">✓</span><span>Espaço para as dúvidas reais da sua equipe</span></div>
          <div style="display:flex;gap:13px;align-items:flex-start;color:#EAEFFA;font-size:16px;line-height:1.45"><span style="width:22px;height:22px;border-radius:50%;background:#E9C65A;color:#0A1442;display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex-shrink:0">✓</span><span>Carga horária e formato sob medida</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- O QUE VOCÊ RECEBE (tile escuro · hierarquia) -->
  <div style="background:radial-gradient(900px 620px at 84% 0%, rgba(41,66,150,0.5), transparent 60%), linear-gradient(160deg,#0C1A57,#070E33);color:#fff">
    <div style="max-width:1160px;margin:0 auto;padding:104px 30px 100px">
      <div style="max-width:680px;margin:0 0 48px">
        <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#C9A876">O QUE A SUA INSTITUIÇÃO RECEBE</div>
        <h2 style="font-size:40px;line-height:1.08;color:#fff;margin:20px 0 0">Uma capacitação feita <span style="color:#E9C65A">para o seu contexto</span></h2>
      </div>

      <!-- card principal -->
      <div data-motivo data-reveal style="background:linear-gradient(150deg, rgba(233,198,90,0.12), rgba(255,255,255,0.02));border:1px solid rgba(233,198,90,0.4);border-radius:14px;padding:36px 38px;display:grid;grid-template-columns:auto 1fr;gap:34px;align-items:center;margin-bottom:16px">
        <div data-motivo-ico style="width:72px;height:72px;border-radius:50%;background:linear-gradient(150deg,#E9C65A,#C9A227);display:flex;align-items:center;justify-content:center;color:#0A1442;flex-shrink:0;box-shadow:0 16px 34px -14px rgba(233,198,90,0.6)"><svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg></div>
        <div>
          <div style="display:inline-block;font-size:10.5px;letter-spacing:1.4px;font-weight:700;color:#0A1442;background:#E9C65A;border-radius:999px;padding:3px 10px;margin-bottom:12px">O CORAÇÃO DO IN COMPANY</div>
          <h3 style="font-size:26px;color:#fff;margin:0;line-height:1.15">Programa 100% sob medida</h3>
          <p style="font-size:16px;color:#C7CFE4;margin:12px 0 0;line-height:1.6;max-width:560px">A ementa nasce do diagnóstico do seu órgão. Nada de conteúdo pronto, o treinamento resolve o que a sua equipe realmente precisa.</p>
        </div>
      </div>

      <!-- 3 cards de apoio -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
        <div data-motivo data-reveal style="background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.09);border-radius:12px;padding:30px 28px">
          <div data-motivo-ico style="width:50px;height:50px;border-radius:50%;border:1.5px solid rgba(233,198,90,0.5);display:flex;align-items:center;justify-content:center;color:#E9C65A;margin-bottom:22px"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 9 12 4l8.5 5"/><path d="M4.5 9.2v8.3M19.5 9.2v8.3M8.5 9.2v8.3M12 9.2v8.3M15.5 9.2v8.3"/><path d="M3 20.2h18M4 17.6h16"/></svg></div>
          <h3 style="font-size:18.5px;color:#fff;margin:0;line-height:1.2">Jurisprudência aplicada ao seu caso</h3>
          <p style="font-size:15px;color:#AEB6D4;margin:11px 0 0;line-height:1.55">Acórdãos e decisões do TCU, STJ e STF que impactam diretamente as suas contratações, não teoria genérica.</p>
        </div>
        <div data-motivo data-reveal style="background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.09);border-radius:12px;padding:30px 28px">
          <div data-motivo-ico style="width:50px;height:50px;border-radius:50%;border:1.5px solid rgba(233,198,90,0.5);display:flex;align-items:center;justify-content:center;color:#E9C65A;margin-bottom:22px"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.2v16.3"/><path d="M7.8 19.5h8.4"/><path d="M4.5 7.3h15"/><path d="M4.5 7.3 2.3 12.1M4.5 7.3 6.7 12.1"/><path d="M2.3 12.1a2.2 1.9 0 0 0 4.4 0"/><path d="M19.5 7.3 17.3 12.1M19.5 7.3 21.7 12.1"/><path d="M17.3 12.1a2.2 1.9 0 0 0 4.4 0"/></svg></div>
          <h3 style="font-size:18.5px;color:#fff;margin:0;line-height:1.2">Autoridade que ensina</h3>
          <p style="font-size:15px;color:#AEB6D4;margin:11px 0 0;line-height:1.55">Coordenação de Bruno Verzani, Procurador do Estado, e professores que vivem a contratação pública.</p>
        </div>
        <div data-motivo data-reveal style="background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.09);border-radius:12px;padding:30px 28px">
          <div data-motivo-ico style="width:50px;height:50px;border-radius:50%;border:1.5px solid rgba(233,198,90,0.5);display:flex;align-items:center;justify-content:center;color:#E9C65A;margin-bottom:22px"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="12.5" rx="1.5"/><path d="M9 20.5h6M12 17v3.5"/></svg></div>
          <h3 style="font-size:18.5px;color:#fff;margin:0;line-height:1.2">No formato da sua rotina</h3>
          <p style="font-size:15px;color:#AEB6D4;margin:11px 0 0;line-height:1.55">Presencial, online ou híbrido, no ritmo do seu órgão, com certificado individual.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- COMO FUNCIONA (timeline) -->
  <div style="max-width:1080px;margin:0 auto;padding:104px 30px 48px">
    <div style="text-align:center;max-width:680px;margin:0 auto 64px">
      <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">COMO FUNCIONA</div>
      <h2 style="font-size:38px;line-height:1.1;color:#0C1A57;margin:14px 0 0">Do diagnóstico ao resultado, sem etapa desperdiçada</h2>
    </div>
    <div style="position:relative">
      <div aria-hidden="true" data-trilha-path style="position:absolute;top:28px;left:12.5%;right:12.5%;height:0;border-top:2px dashed rgba(201,162,39,0.4);z-index:0"></div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:26px;position:relative;z-index:1">
        <div data-reveal style="text-align:center;padding:0 8px">
          <div style="width:56px;height:56px;margin:0 auto;border-radius:50%;background:#ffffff;border:2px solid #C9A227;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 8px #ffffff"><span style="font-weight:700;font-size:20px;color:#C9A227">01</span></div>
          <h3 style="font-size:19px;color:#0C1A57;margin:24px 0 0">Diagnóstico</h3>
          <p style="font-size:15px;color:#5A6180;margin:9px auto 0;line-height:1.55;max-width:230px">Entendemos riscos, dúvidas e necessidades da sua equipe.</p>
        </div>
        <div data-reveal style="text-align:center;padding:0 8px">
          <div style="width:56px;height:56px;margin:0 auto;border-radius:50%;background:#ffffff;border:2px solid #C9A227;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 8px #ffffff"><span style="font-weight:700;font-size:20px;color:#C9A227">02</span></div>
          <h3 style="font-size:19px;color:#0C1A57;margin:24px 0 0">Construção</h3>
          <p style="font-size:15px;color:#5A6180;margin:9px auto 0;line-height:1.55;max-width:230px">Desenhamos uma trilha exclusiva para a sua realidade.</p>
        </div>
        <div data-reveal style="text-align:center;padding:0 8px">
          <div style="width:56px;height:56px;margin:0 auto;border-radius:50%;background:#ffffff;border:2px solid #C9A227;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 8px #ffffff"><span style="font-weight:700;font-size:20px;color:#C9A227">03</span></div>
          <h3 style="font-size:19px;color:#0C1A57;margin:24px 0 0">Execução</h3>
          <p style="font-size:15px;color:#5A6180;margin:9px auto 0;line-height:1.55;max-width:230px">Capacitação prática, aplicada ao dia a dia da equipe.</p>
        </div>
        <div data-reveal style="text-align:center;padding:0 8px">
          <div style="width:56px;height:56px;margin:0 auto;border-radius:50%;background:linear-gradient(150deg,#E9C65A,#C9A227);border:2px solid #C9A227;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 8px #ffffff, 0 14px 30px -12px rgba(201,162,39,0.6)"><span style="font-weight:700;font-size:20px;color:#0A1442">04</span></div>
          <h3 style="font-size:19px;color:#0C1A57;margin:24px 0 0">Resultado</h3>
          <p style="font-size:15px;color:#5A6180;margin:9px auto 0;line-height:1.55;max-width:230px">Equipe mais preparada para decidir com segurança.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- QUEM CONDUZ -->
  <div style="max-width:1000px;margin:0 auto;padding:80px 30px 20px">
    <div style="background:#f5f5f7;border:1px solid #e5e5ea;border-radius:16px;padding:16px;display:grid;grid-template-columns:0.62fr 1fr;gap:14px;align-items:stretch">
      <div style="border-radius:10px;overflow:hidden;min-height:300px;position:relative">
        <img src="/assets/bruno-verzani.png" alt="Bruno Verzani" style="display:block;width:100%;height:100%;min-height:300px;object-fit:cover;object-position:50% 16%">
      </div>
      <div style="padding:30px 30px 30px 20px;display:flex;flex-direction:column;justify-content:center">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(201,162,39,0.12);border:1px solid rgba(201,162,39,0.35);border-radius:999px;padding:6px 13px;font-size:11px;letter-spacing:1px;font-weight:700;color:#C9A227">★ ESPECIALISTA RESPONSÁVEL</div>
        <h2 style="font-size:30px;line-height:1.12;color:#0C1A57;margin:16px 0 0">Bruno Verzani</h2>
        <div style="font-size:15px;color:#5A6180;margin-top:4px">Procurador do Estado do Rio de Janeiro</div>
        <p style="font-size:15.5px;color:#42496A;line-height:1.6;margin:18px 0 0">Coordenador acadêmico do Grupo CLG e autor de artigos sobre contratação pública. Atua na linha de frente das licitações e contratos, traduzindo a jurisprudência do TCU em prática para servidores de todo o país.</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:20px">
          <span style="font-size:12.5px;color:#42496A;background:#ffffff;border:1px solid #e5e5ea;border-radius:999px;padding:6px 13px">Licitações &amp; Contratos</span>
          <span style="font-size:12.5px;color:#42496A;background:#ffffff;border:1px solid #e5e5ea;border-radius:999px;padding:6px 13px">Jurisprudência do TCU</span>
          <span style="font-size:12.5px;color:#42496A;background:#ffffff;border:1px solid #e5e5ea;border-radius:999px;padding:6px 13px">Direito Financeiro</span>
        </div>
      </div>
    </div>
  </div>

  <!-- DEPOIMENTOS -->
  <div style="max-width:1160px;margin:0 auto;padding:80px 30px 40px">
    <div style="text-align:center;max-width:640px;margin:0 auto 44px">
      <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">O QUE DIZEM SOBRE O GRUPO CLG</div>
      <h2 style="font-size:36px;line-height:1.1;color:#0C1A57;margin:14px 0 0">Autoridade reconhecida por quem estuda com a gente</h2>
    </div>
    <div style="display:grid;grid-template-columns:1.35fr 1fr;gap:20px;align-items:stretch">
      <div data-reveal style="background:radial-gradient(500px 320px at 90% 0%, rgba(233,198,90,0.14), transparent 62%), linear-gradient(155deg,#12235F,#0A1440);border:1px solid rgba(233,198,90,0.32);border-radius:14px;padding:42px 40px;display:flex;flex-direction:column">
        <div style="color:#E9C65A;font-size:16px;letter-spacing:2px">★★★★★</div>
        <p style="font-size:23px;color:#fff;line-height:1.42;margin:22px 0 0">“<span style="font-weight:600">O melhor curso direcionado para a nossa área.</span> <span style="color:#AEB6D4">Parabéns ao professor Verzani e a toda a equipe.</span>”</p>
        <div style="display:flex;align-items:center;gap:14px;margin-top:auto;padding-top:32px"><div style="width:50px;height:50px;border-radius:50%;background:linear-gradient(150deg,#E9C65A,#C9A227);display:flex;align-items:center;justify-content:center;font-weight:700;color:#0A1442;font-size:18px">F</div><div><div style="font-weight:600;font-size:16px;color:#fff">Fabio Jules</div><div style="font-size:13.5px;color:#9BA6C8">Servidor público · Licitações e Contratos</div></div></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:20px">
        <div data-reveal style="background:#ffffff;border:1px solid #e5e5ea;border-radius:14px;padding:28px 30px;flex:1">
          <div style="color:#C9A227;font-size:14px;letter-spacing:2px">★★★★★</div>
          <p style="font-size:15.5px;color:#2A3252;line-height:1.5;margin:14px 0 0">“Todas as aulas foram excelentes, hoje estão, ao meu ver, entre as melhores do curso.”</p>
          <div style="display:flex;align-items:center;gap:12px;margin-top:18px"><div style="width:40px;height:40px;border-radius:50%;background:#0C1A57;display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff">V</div><div><div style="font-weight:600;font-size:14.5px;color:#0C1A57">Dr. Vinicius de Lima</div><div style="font-size:12.5px;color:#8A90A6">Advogado · Assessoria Jurídica</div></div></div>
        </div>
        <div data-reveal style="background:#ffffff;border:1px solid #e5e5ea;border-radius:14px;padding:28px 30px;flex:1">
          <div style="color:#C9A227;font-size:14px;letter-spacing:2px">★★★★★</div>
          <p style="font-size:15.5px;color:#2A3252;line-height:1.5;margin:14px 0 0">“Conteúdos de altíssima qualidade. Parabéns à organização e aos professores.”</p>
          <div style="display:flex;align-items:center;gap:12px;margin-top:18px"><div style="width:40px;height:40px;border-radius:50%;background:#0C1A57;display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff">D</div><div><div style="font-weight:600;font-size:14.5px;color:#0C1A57">Daniel Barion</div><div style="font-size:12.5px;color:#8A90A6">Servidor público · Gestão Pública</div></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- LOGOS INSTITUIÇÕES (oculto até ter logos reais; trocar display:none e os tiles pelos logos) -->
  <div style="display:none;max-width:1100px;margin:0 auto;padding:64px 30px 20px;text-align:center">
    <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">INSTITUIÇÕES QUE JÁ CAPACITARAM SUAS EQUIPES CONOSCO</div>
    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:16px;margin-top:28px;align-items:center">
      <div style="height:56px;border-radius:8px;background:#f5f5f7;border:1px solid #e5e5ea;display:flex;align-items:center;justify-content:center;color:#c7c7cf"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h6v5M9 11h.01M15 11h.01"/></svg></div>
      <div style="height:56px;border-radius:8px;background:#f5f5f7;border:1px solid #e5e5ea;display:flex;align-items:center;justify-content:center;color:#c7c7cf"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h6v5M9 11h.01M15 11h.01"/></svg></div>
      <div style="height:56px;border-radius:8px;background:#f5f5f7;border:1px solid #e5e5ea;display:flex;align-items:center;justify-content:center;color:#c7c7cf"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h6v5M9 11h.01M15 11h.01"/></svg></div>
      <div style="height:56px;border-radius:8px;background:#f5f5f7;border:1px solid #e5e5ea;display:flex;align-items:center;justify-content:center;color:#c7c7cf"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h6v5M9 11h.01M15 11h.01"/></svg></div>
      <div style="height:56px;border-radius:8px;background:#f5f5f7;border:1px solid #e5e5ea;display:flex;align-items:center;justify-content:center;color:#c7c7cf"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h6v5M9 11h.01M15 11h.01"/></svg></div>
      <div style="height:56px;border-radius:8px;background:#f5f5f7;border:1px solid #e5e5ea;display:flex;align-items:center;justify-content:center;color:#c7c7cf"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h6v5M9 11h.01M15 11h.01"/></svg></div>
    </div>
  </div>

  <!-- FAQ -->
  <div style="max-width:860px;margin:0 auto;padding:70px 30px 40px">
    <div style="text-align:center;margin-bottom:40px">
      <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">PERGUNTAS FREQUENTES</div>
      <h2 style="font-size:34px;line-height:1.12;color:#0C1A57;margin:14px 0 0">Tire as dúvidas antes de falar com a gente</h2>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <details open style="background:#ffffff;border:1px solid #e5e5ea;border-radius:12px;padding:18px 22px"><summary style="cursor:pointer;font-weight:600;font-size:16.5px;color:#0C1A57;list-style:none">O treinamento pode ser 100% online?</summary><p style="font-size:15px;color:#5A6180;line-height:1.6;margin:12px 0 0">Sim. O formato é definido com o órgão, presencial, online ao vivo ou híbrido, conforme a logística e a preferência da equipe.</p></details>
      <details style="background:#ffffff;border:1px solid #e5e5ea;border-radius:12px;padding:18px 22px"><summary style="cursor:pointer;font-weight:600;font-size:16.5px;color:#0C1A57;list-style:none">Quantas pessoas participam por turma?</summary><p style="font-size:15px;color:#5A6180;line-height:1.6;margin:12px 0 0">É uma turma fechada, dimensionada para a sua equipe, de pequenos grupos a turmas com dezenas ou centenas de servidores.</p></details>
      <details style="background:#ffffff;border:1px solid #e5e5ea;border-radius:12px;padding:18px 22px"><summary style="cursor:pointer;font-weight:600;font-size:16.5px;color:#0C1A57;list-style:none">Quanto tempo dura a capacitação?</summary><p style="font-size:15px;color:#5A6180;line-height:1.6;margin:12px 0 0">A carga horária é definida no diagnóstico, de acordo com os temas e a profundidade desejada, de workshops pontuais a programas mais longos.</p></details>
      <details style="background:#ffffff;border:1px solid #e5e5ea;border-radius:12px;padding:18px 22px"><summary style="cursor:pointer;font-weight:600;font-size:16.5px;color:#0C1A57;list-style:none">É realmente personalizado?</summary><p style="font-size:15px;color:#5A6180;line-height:1.6;margin:12px 0 0">Sim. A ementa nasce das dúvidas, dos processos e dos riscos do seu órgão, não é um curso padrão adaptado.</p></details>
      <details style="background:#ffffff;border:1px solid #e5e5ea;border-radius:12px;padding:18px 22px"><summary style="cursor:pointer;font-weight:600;font-size:16.5px;color:#0C1A57;list-style:none">Emitem certificado?</summary><p style="font-size:15px;color:#5A6180;line-height:1.6;margin:12px 0 0">Sim, cada participante recebe certificado individual ao final do treinamento.</p></details>
      <details style="background:#ffffff;border:1px solid #e5e5ea;border-radius:12px;padding:18px 22px"><summary style="cursor:pointer;font-weight:600;font-size:16.5px;color:#0C1A57;list-style:none">Como funciona o diagnóstico?</summary><p style="font-size:15px;color:#5A6180;line-height:1.6;margin:12px 0 0">Começa com uma conversa para entender o contexto, o nível da equipe e os objetivos do órgão. A partir dela, desenhamos a proposta sob medida.</p></details>
      <details style="background:#ffffff;border:1px solid #e5e5ea;border-radius:12px;padding:18px 22px"><summary style="cursor:pointer;font-weight:600;font-size:16.5px;color:#0C1A57;list-style:none">Pode ser realizado presencialmente e online?</summary><p style="font-size:15px;color:#5A6180;line-height:1.6;margin:12px 0 0">Sim. Trabalhamos nos três formatos, presencial, online ao vivo ou híbrido, inclusive combinando encontros presenciais e turmas remotas no mesmo programa.</p></details>
      <details style="background:#ffffff;border:1px solid #e5e5ea;border-radius:12px;padding:18px 22px"><summary style="cursor:pointer;font-weight:600;font-size:16.5px;color:#0C1A57;list-style:none">Existe carga horária mínima?</summary><p style="font-size:15px;color:#5A6180;line-height:1.6;margin:12px 0 0">Não há um mínimo fixo. Definimos a carga horária no diagnóstico, de acordo com os temas e a profundidade que o seu órgão precisa.</p></details>
      <details style="background:#ffffff;border:1px solid #e5e5ea;border-radius:12px;padding:18px 22px"><summary style="cursor:pointer;font-weight:600;font-size:16.5px;color:#0C1A57;list-style:none">É possível montar uma trilha específica?</summary><p style="font-size:15px;color:#5A6180;line-height:1.6;margin:12px 0 0">Sim. Combinamos temas de licitações, contratos, jurídico e governança em uma trilha exclusiva para os objetivos da sua equipe.</p></details>
      <details style="background:#ffffff;border:1px solid #e5e5ea;border-radius:12px;padding:18px 22px"><summary style="cursor:pointer;font-weight:600;font-size:16.5px;color:#0C1A57;list-style:none">O conteúdo acompanha as atualizações da jurisprudência?</summary><p style="font-size:15px;color:#5A6180;line-height:1.6;margin:12px 0 0">Sim. O material é revisado com base nos acórdãos e decisões mais recentes do TCU, STJ e STF, a jurisprudência aplicada é o centro da nossa metodologia.</p></details>
    </div>
  </div>

  <!-- TEMAS (por categoria) -->
  <div style="max-width:1160px;margin:0 auto;padding:70px 30px 40px">
    <div style="text-align:center;max-width:640px;margin:0 auto 44px">
      <div style="font-size:12px;letter-spacing:2.4px;font-weight:700;color:#A89A6E">TEMAS QUE PODEMOS APROFUNDAR</div>
      <h2 style="font-size:36px;line-height:1.1;color:#0C1A57;margin:14px 0 0">Montamos a trilha ideal para a sua equipe</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px">
      <div style="background:radial-gradient(320px 220px at 100% 0%, rgba(233,198,90,0.14), transparent 60%), #ffffff;border:1.5px solid rgba(201,162,39,0.55);border-radius:14px;padding:30px 26px;position:relative;min-height:258px">
        <div style="position:absolute;top:-12px;left:24px;background:#C9A227;color:#fff;font-size:9.5px;letter-spacing:0.8px;font-weight:700;border-radius:999px;padding:5px 11px">MAIS PROCURADO</div>
        <div style="width:46px;height:46px;border-radius:12px;background:linear-gradient(150deg,#E9C65A,#C9A227);display:flex;align-items:center;justify-content:center;color:#0A1442;margin-bottom:20px"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3.5h7l3.5 3.5V20.5H7z"/><path d="M14 3.5V7h3.5"/><path d="M9.5 12h6M9.5 15h6M9.5 9h3"/></svg></div>
        <div style="font-size:12px;letter-spacing:1.4px;font-weight:700;color:#C9A227">LICITAÇÕES</div>
        <div style="display:flex;flex-direction:column;gap:12px;margin-top:16px;color:#0C1A57;font-size:15px;font-weight:500">
          <span style="display:flex;align-items:center;gap:9px"><span style="width:4px;height:4px;border-radius:50%;background:#C9A227;flex-shrink:0"></span>Nova Lei 14.133/21</span><span style="display:flex;align-items:center;gap:9px"><span style="width:4px;height:4px;border-radius:50%;background:#C9A227;flex-shrink:0"></span>Pregão Eletrônico</span><span style="display:flex;align-items:center;gap:9px"><span style="width:4px;height:4px;border-radius:50%;background:#C9A227;flex-shrink:0"></span>Pesquisa de Preços</span><span style="display:flex;align-items:center;gap:9px"><span style="width:4px;height:4px;border-radius:50%;background:#C9A227;flex-shrink:0"></span>Modalidades e fases</span>
        </div>
      </div>
      <div style="background:#ffffff;border:1px solid #e5e5ea;border-radius:14px;padding:30px 26px;min-height:258px">
        <div style="width:46px;height:46px;border-radius:12px;background:#f5f5f7;border:1px solid #e5e5ea;display:flex;align-items:center;justify-content:center;color:#C9A227;margin-bottom:20px"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3.5h7l3.5 3.5V20.5H7z"/><path d="M14 3.5V7h3.5"/><path d="M9.3 13.6l1.6 1.6 3.4-3.4"/></svg></div>
        <div style="font-size:12px;letter-spacing:1.4px;font-weight:700;color:#C9A227">CONTRATOS</div>
        <div style="display:flex;flex-direction:column;gap:12px;margin-top:16px;color:#42496A;font-size:15px">
          <span style="display:flex;align-items:center;gap:9px"><span style="width:4px;height:4px;border-radius:50%;background:#D8C79A;flex-shrink:0"></span>Gestão e Fiscalização</span><span style="display:flex;align-items:center;gap:9px"><span style="width:4px;height:4px;border-radius:50%;background:#D8C79A;flex-shrink:0"></span>Reequilíbrio econômico</span><span style="display:flex;align-items:center;gap:9px"><span style="width:4px;height:4px;border-radius:50%;background:#D8C79A;flex-shrink:0"></span>Sanções e penalidades</span><span style="display:flex;align-items:center;gap:9px"><span style="width:4px;height:4px;border-radius:50%;background:#D8C79A;flex-shrink:0"></span>Aditivos e prorrogações</span>
        </div>
      </div>
      <div style="background:#ffffff;border:1px solid #e5e5ea;border-radius:14px;padding:30px 26px;min-height:258px">
        <div style="width:46px;height:46px;border-radius:12px;background:#f5f5f7;border:1px solid #e5e5ea;display:flex;align-items:center;justify-content:center;color:#C9A227;margin-bottom:20px"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.2v16.3"/><path d="M7.8 19.5h8.4"/><path d="M4.5 7.3h15"/><path d="M4.5 7.3 2.3 12.1M4.5 7.3 6.7 12.1"/><path d="M2.3 12.1a2.2 1.9 0 0 0 4.4 0"/><path d="M19.5 7.3 17.3 12.1M19.5 7.3 21.7 12.1"/><path d="M17.3 12.1a2.2 1.9 0 0 0 4.4 0"/></svg></div>
        <div style="font-size:12px;letter-spacing:1.4px;font-weight:700;color:#C9A227">JURÍDICO</div>
        <div style="display:flex;flex-direction:column;gap:12px;margin-top:16px;color:#42496A;font-size:15px">
          <span style="display:flex;align-items:center;gap:9px"><span style="width:4px;height:4px;border-radius:50%;background:#D8C79A;flex-shrink:0"></span>Elaboração de Pareceres</span><span style="display:flex;align-items:center;gap:9px"><span style="width:4px;height:4px;border-radius:50%;background:#D8C79A;flex-shrink:0"></span>Assessoria Jurídica</span><span style="display:flex;align-items:center;gap:9px"><span style="width:4px;height:4px;border-radius:50%;background:#D8C79A;flex-shrink:0"></span>Jurisprudência do TCU</span><span style="display:flex;align-items:center;gap:9px"><span style="width:4px;height:4px;border-radius:50%;background:#D8C79A;flex-shrink:0"></span>Responsabilização</span>
        </div>
      </div>
      <div style="background:#ffffff;border:1px solid #e5e5ea;border-radius:14px;padding:30px 26px;min-height:258px">
        <div style="width:46px;height:46px;border-radius:12px;background:#f5f5f7;border:1px solid #e5e5ea;display:flex;align-items:center;justify-content:center;color:#C9A227;margin-bottom:20px"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 9 12 4l8.5 5"/><path d="M4.5 9.2v8.3M19.5 9.2v8.3M8.5 9.2v8.3M12 9.2v8.3M15.5 9.2v8.3"/><path d="M3 20.2h18M4 17.6h16"/></svg></div>
        <div style="font-size:12px;letter-spacing:1.4px;font-weight:700;color:#C9A227">GESTÃO &amp; GOVERNANÇA</div>
        <div style="display:flex;flex-direction:column;gap:12px;margin-top:16px;color:#42496A;font-size:15px">
          <span style="display:flex;align-items:center;gap:9px"><span style="width:4px;height:4px;border-radius:50%;background:#D8C79A;flex-shrink:0"></span>Direito Financeiro</span><span style="display:flex;align-items:center;gap:9px"><span style="width:4px;height:4px;border-radius:50%;background:#D8C79A;flex-shrink:0"></span>MROSC, Terceiro Setor</span><span style="display:flex;align-items:center;gap:9px"><span style="width:4px;height:4px;border-radius:50%;background:#D8C79A;flex-shrink:0"></span>Controle Interno</span><span style="display:flex;align-items:center;gap:9px"><span style="width:4px;height:4px;border-radius:50%;background:#D8C79A;flex-shrink:0"></span>Governança de contratações</span>
        </div>
      </div>
    </div>
    <p style="text-align:center;font-size:15px;color:#8A90A6;margin:24px 0 0">Não encontrou o tema da sua equipe? Montamos sob demanda.</p>
  </div>

  <!-- CTA FINAL -->
  <div style="background:radial-gradient(1000px 520px at 28% 18%, rgba(41,66,150,0.5), transparent 58%), linear-gradient(158deg,#0C1A57,#070E33);margin-top:60px">
    <div style="max-width:900px;margin:0 auto;padding:104px 30px;text-align:center">
      <div style="font-size:12px;letter-spacing:2.6px;font-weight:700;color:#E9C65A">VAMOS CONVERSAR</div>
      <h2 style="font-size:46px;line-height:1.08;color:#fff;margin:18px 0 0">Vamos construir uma capacitação para a realidade do <span style="color:#E9C65A">seu órgão</span>?</h2>
      <p style="font-size:19px;color:#B7C0DC;line-height:1.55;margin:18px auto 0;max-width:560px">Conte o desafio da sua equipe. Nós desenhamos o treinamento ideal e enviamos uma proposta sob medida, sem compromisso.</p>
      <div style="display:flex;gap:13px;justify-content:center;margin-top:26px;flex-wrap:wrap">
        <a href="https://wa.me/5521980936347?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20proposta%20de%20capacita%C3%A7%C3%A3o%20In%20Company%20para%20o%20meu%20%C3%B3rg%C3%A3o." target="_blank" rel="noopener" style="background:#E9C65A;color:#0A1442;border-radius:999px;padding:17px 34px;font-weight:700;font-size:16px;display:inline-flex;align-items:center;gap:8px">Solicitar proposta <span>→</span></a>
        <a href="https://wa.me/5521980936347?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20conversa%20sobre%20capacita%C3%A7%C3%A3o%20In%20Company." target="_blank" rel="noopener" style="background:rgba(255,255,255,0.06);color:#fff;border:1.5px solid rgba(255,255,255,0.28);border-radius:999px;padding:16px 30px;font-weight:600;font-size:16px">Falar com um especialista</a>
      </div>
    </div>
  </div>

  <!-- BARRA CTA FIXA (landing page) -->
  <div data-sticky-cta style="position:fixed;left:0;right:0;bottom:0;z-index:55;display:flex;justify-content:center;padding:14px 20px;transform:translateY(160%);pointer-events:none">
    <div style="pointer-events:auto;width:100%;max-width:920px;display:flex;align-items:center;justify-content:space-between;gap:20px;background:rgba(10,16,40,0.92);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.12);border-radius:14px;padding:13px 15px 13px 24px;box-shadow:0 24px 60px -24px rgba(0,0,0,0.75)">
      <div style="min-width:0">
        <div style="font-size:15px;font-weight:600;color:#fff">Capacitação In Company sob medida</div>
        <div style="font-size:13px;color:#9BA6C8">Proposta sem compromisso · resposta rápida</div>
      </div>
      <a href="https://wa.me/5521980936347?text=Ol%C3%A1%2C%20gostaria%20de%20uma%20proposta%20de%20capacita%C3%A7%C3%A3o%20In%20Company%20para%20o%20meu%20%C3%B3rg%C3%A3o." target="_blank" rel="noopener" style="flex-shrink:0;background:#E9C65A;color:#0A1442;border-radius:999px;padding:13px 24px;font-weight:700;font-size:15px;display:inline-flex;align-items:center;gap:8px;white-space:nowrap">Solicitar proposta <span>→</span></a>
    </div>
  </div>

</div>`;

export const navbar = `<div style="position:fixed;top:0;left:0;right:0;z-index:60;padding:18px 24px;display:flex;justify-content:center;pointer-events:none">
  <div style="pointer-events:auto;width:100%;max-width:1200px;margin:0 auto;padding:12px 16px 12px 20px;display:flex;align-items:center;gap:36px;background:rgba(10,16,40,0.72);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.1);border-radius:20px;box-shadow:0 14px 40px -26px rgba(0,0,0,0.5)">
    <button data-nav="home" style="display:flex;align-items:center;gap:11px;background:none;border:0;cursor:pointer;padding:0">
      <div style="width:38px;height:38px;border-radius:10px;background:linear-gradient(150deg,#E9C65A,#C9A227);display:flex;align-items:center;justify-content:center">
        <span style="font-family:'Schibsted Grotesk';font-weight:800;color:#0A1442;font-size:14px;letter-spacing:-0.5px">CLG</span>
      </div>
      <div style="text-align:left;line-height:1">
        <div style="font-family:'Schibsted Grotesk';font-weight:700;font-size:18px;color:#fff;letter-spacing:-0.4px">Grupo CLG</div>
        <div style="font-size:9px;letter-spacing:2.6px;color:#C9B26B;font-weight:700;margin-top:4px">LICITAÇÕES &amp; GESTÃO</div>
      </div>
    </button>
    <nav style="display:flex;gap:4px;margin-left:8px">
      <button data-nav="home" data-navkey="home" style="position:relative;background:none;border:0;cursor:pointer;font-size:15px;font-weight:500;color:rgba(255,255,255,0.72);padding:9px 16px;border-radius:999px" data-hv="hv36"><span style="position:relative">Home</span></button>
      <div class="nav-drop">
        <button data-nav="cursos" data-navkey="capacitacao" style="position:relative;background:none;border:0;cursor:pointer;font-size:15px;font-weight:500;color:rgba(255,255,255,0.72);padding:9px 16px;border-radius:999px" data-hv="hv37"><span style="position:relative;display:inline-flex;align-items:center;gap:6px">Capacitação <svg class="nav-drop-caret" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span></button>
        <div class="nav-drop-panel">
          <div>
            <button data-nav="cursos">Cursos</button>
            <button data-nav="congressos">Congressos</button>
          </div>
        </div>
      </div>
      <div class="nav-drop">
        <button data-nav="incompany" data-navkey="treinamentos" style="position:relative;background:none;border:0;cursor:pointer;font-size:15px;font-weight:500;color:rgba(255,255,255,0.72);padding:9px 16px;border-radius:999px" data-hv="hv38"><span style="position:relative;display:inline-flex;align-items:center;gap:6px">Treinamentos <svg class="nav-drop-caret" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span></button>
        <div class="nav-drop-panel">
          <div>
            <button data-nav="incompany">In Company</button>
          </div>
        </div>
      </div>
      <button data-nav="sobre" data-navkey="sobre" style="position:relative;background:none;border:0;cursor:pointer;font-size:15px;font-weight:500;color:rgba(255,255,255,0.72);padding:9px 16px;border-radius:999px" data-hv="hv39"><span style="position:relative">Sobre</span></button>
    </nav>
    <div style="margin-left:auto;display:flex;align-items:center;gap:20px">
      <a href="#" style="font-size:15px;font-weight:600;color:#fff">Já sou aluno</a>
      <button data-nav="cursos" style="background:#E9C65A;color:#0A1442;border:0;border-radius:999px;padding:12px 22px;font-weight:700;font-size:14.5px;cursor:pointer" data-hv="hv40">Ver turmas abertas</button>
    </div>
  </div>
</div>`;

export const footer = `<div style="background:#0A1442;color:#fff">
  <div style="max-width:1200px;margin:0 auto;padding:66px 30px 40px;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:40px">
    <div>
      <div style="display:flex;align-items:center;gap:11px">
        <div style="width:38px;height:38px;border-radius:10px;background:#fff;display:flex;align-items:center;justify-content:center">
          <span style="font-family:'Schibsted Grotesk';font-weight:800;color:#0C1A57;font-size:13px">CLG</span>
        </div>
        <span style="font-family:'Schibsted Grotesk';font-weight:700;font-size:18px">Grupo CLG</span>
      </div>
      <p style="font-size:15px;color:#9AA3C2;margin:20px 0 0;line-height:1.6;max-width:290px">Capacitação de excelência em Licitações e Gestão, para servidores públicos e profissionais da iniciativa privada.</p>
      <div style="display:flex;gap:10px;margin-top:22px">
        <div style="width:38px;height:38px;border-radius:10px;background:rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600">in</div>
        <div style="width:38px;height:38px;border-radius:10px;background:rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600">IG</div>
        <div style="width:38px;height:38px;border-radius:10px;background:rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600">YT</div>
      </div>
    </div>
    <div>
      <div style="font-size:11.5px;font-weight:700;letter-spacing:1.6px;color:#C9A227">NAVEGAÇÃO</div>
      <div style="display:flex;flex-direction:column;gap:12px;margin-top:18px">
        <button data-nav="home" style="background:none;border:0;color:#B8C0DA;font-size:15px;text-align:left;cursor:pointer;padding:0" data-hv="hv41">Home</button>
        <button data-nav="cursos" style="background:none;border:0;color:#B8C0DA;font-size:15px;text-align:left;cursor:pointer;padding:0" data-hv="hv42">Cursos</button>
        <button data-nav="congressos" style="background:none;border:0;color:#B8C0DA;font-size:15px;text-align:left;cursor:pointer;padding:0" data-hv="hv42">Congressos</button>
        <button data-nav="incompany" style="background:none;border:0;color:#B8C0DA;font-size:15px;text-align:left;cursor:pointer;padding:0" data-hv="hv43">In Company</button>
        <button data-nav="sobre" style="background:none;border:0;color:#B8C0DA;font-size:15px;text-align:left;cursor:pointer;padding:0" data-hv="hv44">Sobre</button>
      </div>
    </div>
    <div>
      <div style="font-size:11.5px;font-weight:700;letter-spacing:1.6px;color:#C9A227">RECURSOS</div>
      <div style="display:flex;flex-direction:column;gap:12px;margin-top:18px">
        <a href="#" style="color:#B8C0DA;font-size:15px" data-hv="hv45">Artigos e Notícias</a>
        <a href="#" style="color:#B8C0DA;font-size:15px" data-hv="hv46">Eventos</a>
        <a href="#" style="color:#B8C0DA;font-size:15px" data-hv="hv47">Acesso do Aluno</a>
        <a href="#" style="color:#B8C0DA;font-size:15px" data-hv="hv48">Boletim de Jurisprudência</a>
      </div>
    </div>
    <div>
      <div style="font-size:11.5px;font-weight:700;letter-spacing:1.6px;color:#C9A227">CONTATO</div>
      <div style="display:flex;flex-direction:column;gap:12px;margin-top:18px">
        <a href="#" style="color:#B8C0DA;font-size:15px" data-hv="hv49">contato@grupoclg.com.br</a>
        <a href="#" style="color:#B8C0DA;font-size:15px" data-hv="hv50">+55 (21) 98093-6347</a>
      </div>
    </div>
  </div>
  <div style="border-top:1px solid rgba(255,255,255,0.08)">
    <div style="max-width:1200px;margin:0 auto;padding:22px 30px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px">
      <span style="font-size:14px;color:#6E77A0">Grupo CLG, 2025 © Todos os direitos reservados</span>
      <span style="font-size:14px;color:#6E77A0">Feito com dedicação para o setor público</span>
    </div>
  </div>
</div>

</div>`;
