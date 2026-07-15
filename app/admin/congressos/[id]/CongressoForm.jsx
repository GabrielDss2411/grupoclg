'use client';
// Form controlado de congresso (criar/editar). Mesma lógica de submit/erro/
// confirmação de app/admin/cursos/[id]/CursoForm.jsx (T19), com editor de
// programação por dia (dia, título, itens) e os campos de stats.
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { salvarCongresso } from '../../actions';

const label = { display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#42496A', marginTop: '16px' };
const input = {
  display: 'block',
  width: '100%',
  marginTop: '6px',
  padding: '11px 14px',
  fontSize: '15px',
  color: '#0C1A57',
  border: '1px solid #e5e5ea',
  borderRadius: '8px',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};
const fieldErro = { fontSize: '12.5px', color: '#0C1A57', fontWeight: 600, marginTop: '4px' };
const card = { background: '#fff', border: '1px solid #e5e5ea', borderRadius: '16px', padding: '22px 24px', marginTop: '18px' };
const sectionLabel = { fontSize: '12px', letterSpacing: '2.2px', fontWeight: 700, color: '#A89A6E' };
const pillBtn = {
  border: '1px solid #e5e5ea',
  background: '#f5f5f7',
  color: '#0C1A57',
  borderRadius: '999px',
  padding: '6px 14px',
  fontSize: '12.5px',
  fontWeight: 700,
  cursor: 'pointer',
};

function moveItem(arr, i, dir) {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

export default function CongressoForm({ congresso }) {
  const router = useRouter();
  const editando = Boolean(congresso?.id);

  const [nome, setNome] = useState(congresso?.nome || '');
  const [edicao, setEdicao] = useState(congresso?.edicao || '');
  const [tagline, setTagline] = useState(congresso?.tagline || '');
  const [datas, setDatas] = useState(congresso?.datas || '');
  const [iso, setIso] = useState(congresso?.iso || '');
  const [cardDias, setCardDias] = useState(congresso?.card_dias || '');
  const [cardMes, setCardMes] = useState(congresso?.card_mes || '');
  const [cardLocal, setCardLocal] = useState(congresso?.card_local || '');
  const [cardDesc, setCardDesc] = useState(congresso?.card_desc || '');
  const [status, setStatus] = useState(congresso?.status || 'Inscrições abertas');
  const [localChip, setLocalChip] = useState(congresso?.local_chip || '');
  const [formato, setFormato] = useState(congresso?.formato || '');
  const [sobre, setSobre] = useState(congresso?.sobre || '');
  const [localNome, setLocalNome] = useState(congresso?.local_nome || '');
  const [localDesc, setLocalDesc] = useState(congresso?.local_desc || '');
  const [stats, setStats] = useState(
    congresso?.stats && typeof congresso.stats === 'object'
      ? { dias: '', paineis: '', workshops: '', publico: '', ...congresso.stats }
      : { dias: '', paineis: '', workshops: '', publico: '' }
  );
  const [prog, setProg] = useState(
    congresso?.prog?.length ? congresso.prog : [{ dia: '', titulo: '', itens: [''] }]
  );

  const [erro, setErro] = useState('');
  const [camposComErro, setCamposComErro] = useState([]);
  const [sucesso, setSucesso] = useState(false);
  const [pending, startTransition] = useTransition();

  function temErro(campo) {
    return camposComErro.includes(campo);
  }

  function updateDia(i, patch) {
    const next = [...prog];
    next[i] = { ...next[i], ...patch };
    setProg(next);
  }

  function onSubmit(e) {
    e.preventDefault();
    setErro('');
    setCamposComErro([]);
    setSucesso(false);

    const progLimpo = prog
      .filter((d) => d.dia.trim() !== '' || d.titulo.trim() !== '' || d.itens.some((it) => it.trim() !== ''))
      .map((d) => ({ ...d, itens: d.itens.filter((it) => it.trim() !== '') }));

    const fd = new FormData();
    if (editando) fd.set('id', congresso.id);
    fd.set('nome', nome);
    fd.set('edicao', edicao);
    fd.set('tagline', tagline);
    fd.set('datas', datas);
    fd.set('iso', iso);
    fd.set('card_dias', cardDias);
    fd.set('card_mes', cardMes);
    fd.set('card_local', cardLocal);
    fd.set('card_desc', cardDesc);
    fd.set('status', status);
    fd.set('local_chip', localChip);
    fd.set('formato', formato);
    fd.set('sobre', sobre);
    fd.set('local_nome', localNome);
    fd.set('local_desc', localDesc);
    fd.set('stats_dias', stats.dias);
    fd.set('stats_paineis', stats.paineis);
    fd.set('stats_workshops', stats.workshops);
    fd.set('stats_publico', stats.publico);
    fd.set('prog', JSON.stringify(progLimpo));

    startTransition(async () => {
      const result = await salvarCongresso(fd);
      if (!result.ok) {
        setErro(result.error);
        setCamposComErro(result.fields || []);
        return;
      }
      setSucesso(true);
      router.refresh();
    });
  }

  return (
    <div>
      <a href="/admin/congressos" style={{ fontSize: '14px', color: '#C9A227', fontWeight: 600, textDecoration: 'none' }} data-hv="goldlink">
        ← Voltar à lista de congressos
      </a>
      <h1 style={{ fontWeight: 600, fontSize: '26px', color: '#0C1A57', margin: '14px 0 0' }}>
        {editando ? 'Editar congresso' : 'Novo congresso'}
      </h1>

      <form onSubmit={onSubmit}>
        <div style={card}>
          <div style={sectionLabel}>DADOS DO CONGRESSO</div>

          <label style={label}>
            Nome *
            <input style={input} value={nome} onChange={(e) => setNome(e.target.value)} maxLength={250} />
          </label>
          {temErro('nome') && <div style={fieldErro}>Campo obrigatório (até 200 caracteres).</div>}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
            <label style={label}>
              Edição *
              <input style={input} value={edicao} onChange={(e) => setEdicao(e.target.value)} placeholder="4ª edição" />
            </label>
            <label style={label}>
              Status
              <input style={input} value={status} onChange={(e) => setStatus(e.target.value)} />
            </label>
          </div>
          {temErro('edicao') && <div style={fieldErro}>Campo obrigatório.</div>}

          <label style={label}>
            Tagline
            <input style={input} value={tagline} onChange={(e) => setTagline(e.target.value)} />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
            <label style={label}>
              Datas (texto) *
              <input style={input} value={datas} onChange={(e) => setDatas(e.target.value)} placeholder="24 a 27 de agosto de 2026" />
            </label>
            <label style={label}>
              Data ISO de início *
              <input style={input} type="date" value={iso} onChange={(e) => setIso(e.target.value)} />
            </label>
          </div>
          {temErro('datas') && <div style={fieldErro}>Campo obrigatório.</div>}
          {temErro('iso') && <div style={fieldErro}>Data inválida -- use o formato AAAA-MM-DD.</div>}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
            <label style={label}>
              Local (chip) *
              <input style={input} value={localChip} onChange={(e) => setLocalChip(e.target.value)} placeholder="Brasília/DF" />
            </label>
            <label style={label}>
              Formato *
              <input style={input} value={formato} onChange={(e) => setFormato(e.target.value)} placeholder="Presencial · transmissão online" />
            </label>
          </div>
          {temErro('local_chip') && <div style={fieldErro}>Campo obrigatório.</div>}
          {temErro('formato') && <div style={fieldErro}>Campo obrigatório.</div>}

          <label style={label}>
            Sobre o evento
            <textarea style={{ ...input, minHeight: '80px', resize: 'vertical' }} value={sobre} onChange={(e) => setSobre(e.target.value)} />
          </label>
        </div>

        <div style={card}>
          <div style={sectionLabel}>CARD DA AGENDA</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            <label style={label}>
              Dias (card)
              <input style={input} value={cardDias} onChange={(e) => setCardDias(e.target.value)} placeholder="24 a 27" />
            </label>
            <label style={label}>
              Mês (card)
              <input style={input} value={cardMes} onChange={(e) => setCardMes(e.target.value)} placeholder="AGOSTO · 2026" />
            </label>
            <label style={label}>
              Local (card)
              <input style={input} value={cardLocal} onChange={(e) => setCardLocal(e.target.value)} placeholder="PRESENCIAL · BRASÍLIA/DF" />
            </label>
          </div>
          <label style={label}>
            Descrição do card *
            <textarea
              style={{ ...input, minHeight: '80px', resize: 'vertical' }}
              value={cardDesc}
              onChange={(e) => setCardDesc(e.target.value)}
              maxLength={2100}
            />
          </label>
          {temErro('card_desc') && <div style={fieldErro}>Campo obrigatório (até 2000 caracteres).</div>}
        </div>

        <div style={card}>
          <div style={sectionLabel}>NÚMEROS DO EVENTO</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            <label style={label}>
              Dias
              <input style={input} value={stats.dias} onChange={(e) => setStats({ ...stats, dias: e.target.value })} placeholder="4 dias" />
            </label>
            <label style={label}>
              Painéis
              <input style={input} value={stats.paineis} onChange={(e) => setStats({ ...stats, paineis: e.target.value })} placeholder="+20" />
            </label>
            <label style={label}>
              Workshops
              <input style={input} value={stats.workshops} onChange={(e) => setStats({ ...stats, workshops: e.target.value })} placeholder="8" />
            </label>
            <label style={label}>
              Público
              <input style={input} value={stats.publico} onChange={(e) => setStats({ ...stats, publico: e.target.value })} placeholder="+600" />
            </label>
          </div>
        </div>

        <div style={card}>
          <div style={sectionLabel}>LOCAL E FORMATO (detalhe)</div>
          <label style={label}>
            Nome do local
            <input style={input} value={localNome} onChange={(e) => setLocalNome(e.target.value)} placeholder="Centro de Convenções · Brasília/DF" />
          </label>
          <label style={label}>
            Descrição do local
            <textarea style={{ ...input, minHeight: '64px', resize: 'vertical' }} value={localDesc} onChange={(e) => setLocalDesc(e.target.value)} />
          </label>
        </div>

        <div style={card}>
          <div style={sectionLabel}>PROGRAMAÇÃO POR DIA</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
            {prog.map((d, i) => (
              <div key={i} style={{ border: '1px solid #e5e5ea', borderRadius: '12px', padding: '16px 18px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#C9A227' }}>Dia {i + 1}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="button" style={pillBtn} disabled={i === 0} onClick={() => setProg(moveItem(prog, i, -1))}>↑</button>
                    <button type="button" style={pillBtn} disabled={i === prog.length - 1} onClick={() => setProg(moveItem(prog, i, 1))}>↓</button>
                    <button type="button" style={pillBtn} onClick={() => setProg(prog.filter((_, idx) => idx !== i))}>Remover dia</button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                  <label style={label}>
                    Dia (rótulo)
                    <input style={input} placeholder="Segunda, 24/08" value={d.dia} onChange={(e) => updateDia(i, { dia: e.target.value })} />
                  </label>
                  <label style={label}>
                    Título do dia
                    <input style={input} value={d.titulo} onChange={(e) => updateDia(i, { titulo: e.target.value })} />
                  </label>
                </div>

                <div style={{ marginTop: '14px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#42496A' }}>Itens da programação</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                    {d.itens.map((item, j) => (
                      <div key={j} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          style={{ ...input, marginTop: 0, flex: 1 }}
                          value={item}
                          onChange={(e) => {
                            const nextItens = [...d.itens];
                            nextItens[j] = e.target.value;
                            updateDia(i, { itens: nextItens });
                          }}
                        />
                        <button type="button" style={pillBtn} disabled={j === 0} onClick={() => updateDia(i, { itens: moveItem(d.itens, j, -1) })}>↑</button>
                        <button type="button" style={pillBtn} disabled={j === d.itens.length - 1} onClick={() => updateDia(i, { itens: moveItem(d.itens, j, 1) })}>↓</button>
                        <button
                          type="button"
                          style={pillBtn}
                          onClick={() => updateDia(i, { itens: d.itens.filter((_, idx) => idx !== j) })}
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                  </div>
                  <button type="button" style={{ ...pillBtn, marginTop: '10px' }} onClick={() => updateDia(i, { itens: [...d.itens, ''] })}>
                    + Adicionar item
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            style={{ ...pillBtn, marginTop: '14px' }}
            onClick={() => setProg([...prog, { dia: '', titulo: '', itens: [''] }])}
          >
            + Adicionar dia
          </button>
        </div>

        {erro ? (
          <p style={{ marginTop: '18px', fontSize: '13.5px', color: '#0C1A57', background: '#f5f5f7', border: '1px solid #e5e5ea', borderRadius: '8px', padding: '10px 12px' }}>
            {erro}
          </p>
        ) : null}
        {sucesso ? (
          <p style={{ marginTop: '18px', fontSize: '13.5px', color: '#0C1A57', background: 'rgba(91,214,160,0.16)', border: '1px solid rgba(91,214,160,0.4)', borderRadius: '8px', padding: '10px 12px' }}>
            Salvo · já no site
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          style={{
            marginTop: '18px',
            background: '#E9C65A',
            color: '#0A1442',
            border: 0,
            borderRadius: '999px',
            padding: '13px 28px',
            fontWeight: 700,
            fontSize: '15px',
            cursor: pending ? 'default' : 'pointer',
            opacity: pending ? 0.7 : 1,
          }}
          data-hv="gold"
        >
          {pending ? 'Salvando…' : 'Salvar congresso'}
        </button>
      </form>
    </div>
  );
}
