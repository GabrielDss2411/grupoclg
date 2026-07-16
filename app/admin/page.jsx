// Dashboard do painel: métricas reais de cursos/congressos, um medidor de
// "vitrine" (quanto do catálogo está no ar) e a lista dos itens mais recentes.
// Client autenticado (server-actions, RLS authenticated) enxerga TODOS os
// itens, inclusive os que estão fora do site (disponivel=false).
import { createClient } from '@/lib/supabase/server-actions';

function fmtData(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return '—';
  }
}

function saudacao() {
  let h = 9;
  try {
    h = Number(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo', hour: 'numeric', hour12: false }));
  } catch {}
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
const IconBook = () => (<svg viewBox="0 0 24 24" {...s}><path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2z" /><path d="M4 18.5A1.5 1.5 0 0 1 5.5 17H20" /></svg>);
const IconCalendar = () => (<svg viewBox="0 0 24 24" {...s}><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v3M16 3v3" /></svg>);
const IconEyeOff = () => (<svg viewBox="0 0 24 24" {...s}><path d="M9.9 5A9.8 9.8 0 0 1 12 4.8c6 0 9.5 6.2 9.5 6.2a16 16 0 0 1-3 3.5M6 6.3A16 16 0 0 0 2.5 11s3.5 6.2 9.5 6.2a9 9 0 0 0 4-.9" /><path d="M3 3l18 18M10 10a2.5 2.5 0 0 0 3.4 3.4" /></svg>);
const IconEdit = () => (<svg viewBox="0 0 24 24" {...s}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>);

export default async function AdminHomePage() {
  const supabase = await createClient();
  const [cursosRes, congressosRes] = await Promise.all([
    supabase.from('cursos').select('id, title, cat, disponivel, created_at').order('created_at', { ascending: false }),
    supabase.from('congressos').select('id, nome, edicao, disponivel, created_at').order('created_at', { ascending: false }),
  ]);

  const cursos = cursosRes.data ?? [];
  const congressos = congressosRes.data ?? [];

  const totalCursos = cursos.length;
  const cursosOn = cursos.filter((c) => c.disponivel).length;
  const totalCongressos = congressos.length;
  const congressosOn = congressos.filter((c) => c.disponivel).length;
  const total = totalCursos + totalCongressos;
  const publicado = cursosOn + congressosOn;
  const foraSite = total - publicado;
  const pctOn = total ? Math.round((publicado / total) * 100) : 0;

  // Donut do medidor.
  const R = 62, STROKE = 15, CIRC = 2 * Math.PI * R;
  const dash = (pctOn / 100) * CIRC;

  const maxTotal = Math.max(totalCursos, totalCongressos, 1);
  const hPx = (n) => `${Math.round((n / maxTotal) * 170)}px`;

  const recentes = [
    ...cursos.map((c) => ({ id: c.id, tipo: 'Curso', href: `/admin/cursos/${c.id}`, titulo: c.title, sub: c.cat, on: c.disponivel, data: c.created_at })),
    ...congressos.map((c) => ({ id: c.id, tipo: 'Congresso', href: `/admin/congressos/${c.id}`, titulo: c.nome, sub: c.edicao, on: c.disponivel, data: c.created_at })),
  ]
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 6);

  const metrics = [
    { label: 'Cursos', value: totalCursos, on: cursosOn, total: totalCursos, sub: `${cursosOn} no site`, Icon: IconBook, navy: false },
    { label: 'Congressos', value: totalCongressos, on: congressosOn, total: totalCongressos, sub: `${congressosOn} no site`, Icon: IconCalendar, navy: false },
    { label: 'Fora do site', value: foraSite, on: foraSite, total: total || 1, sub: 'ocultos do público', Icon: IconEyeOff, navy: true },
  ];

  return (
    <div>
      <div className="adm-section-head">
        <div>
          <div className="adm-eyebrow">VISÃO GERAL</div>
          <h1 className="adm-h1">{saudacao()}, Administrador</h1>
          <p className="adm-lede">
            O que está no ar e o que precisa da sua atenção. Alterações salvas aqui aparecem no site em até
            60 segundos.
          </p>
        </div>
        <a href="/admin/cursos/novo" className="adm-btn adm-btn-gold">+ Novo curso</a>
      </div>

      <div className="adm-metrics">
        {metrics.map((m) => (
          <div className="adm-card adm-metric" key={m.label}>
            <div className="adm-metric-top">
              <span className="adm-metric-icon"><m.Icon /></span>
              <span className="adm-metric-label">{m.label}</span>
            </div>
            <div className="adm-metric-value">{m.value}</div>
            <div className="adm-meter">
              <div className={`adm-meter-fill${m.navy ? ' is-navy' : ''}`} style={{ width: `${m.total ? (m.on / m.total) * 100 : 0}%` }} />
            </div>
            <div className="adm-metric-foot">
              <span className="adm-metric-sub">{m.sub}</span>
              <span className="adm-metric-sub">{m.total ? Math.round((m.on / m.total) * 100) : 0}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="adm-grid-2">
        {/* Gráfico */}
        <div className="adm-card adm-card-pad adm-chart">
          <div className="adm-section-head">
            <div>
              <div className="adm-panel-title">Disponibilidade do catálogo</div>
              <div className="adm-panel-sub">Itens no site frente ao total cadastrado</div>
            </div>
            <div className="adm-chart-legend">
              <span className="adm-legend-item"><span className="adm-legend-dot" style={{ background: '#E9C65A' }} /> No site</span>
              <span className="adm-legend-item"><span className="adm-legend-dot" style={{ background: '#12235F' }} /> Fora</span>
            </div>
          </div>
          <div className="adm-bars">
            {[
              { nome: 'Cursos', on: cursosOn, off: totalCursos - cursosOn, total: totalCursos },
              { nome: 'Congressos', on: congressosOn, off: totalCongressos - congressosOn, total: totalCongressos },
            ].map((g) => (
              <div className="adm-bar-group" key={g.nome}>
                <div className="adm-bar-stack" style={{ height: hPx(g.total) }}>
                  {g.off > 0 ? <div className="adm-bar adm-bar-off" style={{ height: `${(g.off / (g.total || 1)) * 100}%` }} /> : null}
                  {g.on > 0 ? <div className="adm-bar adm-bar-on" style={{ height: `${(g.on / (g.total || 1)) * 100}%` }} /> : null}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div className="adm-bar-caption">{g.nome}</div>
                  <div className="adm-bar-count">{g.on} de {g.total} no site</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medidor-assinatura: Vitrine do site */}
        <div className="adm-card adm-card-pad adm-gauge-card">
          <div className="adm-panel-title">Vitrine do site</div>
          <div className="adm-panel-sub">Parte do catálogo visível ao público</div>
          <div className="adm-gauge-wrap">
            <div className="adm-gauge">
              <svg viewBox="0 0 148 148" width="148" height="148">
                <circle cx="74" cy="74" r={R} fill="none" stroke="#E7E9F2" strokeWidth={STROKE} />
                <circle
                  cx="74" cy="74" r={R} fill="none" stroke="url(#gaugeGold)" strokeWidth={STROKE}
                  strokeLinecap="round" strokeDasharray={`${dash} ${CIRC}`} transform="rotate(-90 74 74)"
                />
                <defs>
                  <linearGradient id="gaugeGold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#E9C65A" /><stop offset="100%" stopColor="#C9A227" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="adm-gauge-center">
                <div>
                  <div className="adm-gauge-pct">{pctOn}%</div>
                  <div className="adm-gauge-pct-label">NO AR</div>
                </div>
              </div>
            </div>
            <div className="adm-gauge-legend">
              <div className="adm-gl-row">
                <span className="adm-gl-dot" style={{ background: '#C9A227' }} />
                <div><div className="adm-gl-num">{publicado}</div><div className="adm-gl-label">no site</div></div>
              </div>
              <div className="adm-gl-row">
                <span className="adm-gl-dot" style={{ background: '#C7C7CF' }} />
                <div><div className="adm-gl-num">{foraSite}</div><div className="adm-gl-label">fora do site</div></div>
              </div>
            </div>
          </div>
          <div className="adm-gauge-actions">
            <a href="/admin/cursos/novo" className="adm-btn adm-btn-gold adm-btn-sm">Novo curso</a>
            <a href="/admin/congressos/novo" className="adm-btn adm-btn-navy adm-btn-sm">Novo congresso</a>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className="adm-card" style={{ marginTop: '16px', overflow: 'hidden' }}>
        <div className="adm-panel-head">
          <div>
            <div className="adm-panel-title">Itens recentes</div>
            <div className="adm-panel-sub">Últimos cursos e congressos cadastrados</div>
          </div>
          <a href="/admin/cursos" className="adm-btn adm-btn-ghost adm-btn-sm">Ver tudo</a>
        </div>
        {recentes.length === 0 ? (
          <p className="adm-empty" style={{ padding: '0 22px 22px' }}>Nenhum conteúdo cadastrado ainda.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="adm-table">
              <thead>
                <tr><th>Título</th><th>Tipo</th><th>Status</th><th>Criado em</th><th>Editar</th></tr>
              </thead>
              <tbody>
                {recentes.map((r) => (
                  <tr key={`${r.tipo}-${r.id}`}>
                    <td>
                      <a href={r.href} className="adm-row-title">{r.titulo}</a>
                      {r.sub ? <div className="adm-row-sub">{r.sub}</div> : null}
                    </td>
                    <td><span className="adm-type-chip">{r.tipo}</span></td>
                    <td>
                      <span className={`adm-status ${r.on ? 'adm-status-on' : 'adm-status-off'}`}>
                        <span className={`adm-dot ${r.on ? 'adm-dot-on' : 'adm-dot-off'}`} />
                        {r.on ? 'No site' : 'Fora do site'}
                      </span>
                    </td>
                    <td style={{ color: '#5A6180' }}>{fmtData(r.data)}</td>
                    <td className="adm-td-right">
                      <a href={r.href} className="adm-row-edit" aria-label={`Editar ${r.titulo}`}><IconEdit /></a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
