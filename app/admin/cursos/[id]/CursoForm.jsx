'use client';
// Form controlado de curso (criar/editar). Chama salvarCurso (T17) via
// useTransition; botão fica desabilitado durante o envio (evita duplo clique
// -- AC P1-B/8); em erro mantém os dados preenchidos e mostra a mensagem
// (AC P1-B/7); em sucesso mostra "Salvo · já no site" (spec P2/2).
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { salvarCurso } from '../../actions';

const POSTERS = [
  '/assets/poster-14133.svg',
  '/assets/poster-pregao.svg',
  '/assets/poster-fornecedores.svg',
  '/assets/poster-fiscalizacao.svg',
  '/assets/poster-pareceres.svg',
  '/assets/poster-mrosc.svg',
];

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

export default function CursoForm({ curso }) {
  const router = useRouter();
  const editando = Boolean(curso?.id);

  const [title, setTitle] = useState(curso?.title || '');
  const [cat, setCat] = useState(curso?.cat || '');
  const [tag, setTag] = useState(curso?.tag || 'Curso');
  const [nivel, setNivel] = useState(curso?.nivel || '');
  const [modulos, setModulos] = useState(curso?.modulos || '');
  const [horas, setHoras] = useState(curso?.horas || '');
  const [descricao, setDescricao] = useState(curso?.descricao || '');
  const [poster, setPoster] = useState(curso?.poster || POSTERS[0]);
  const [inscricoes, setInscricoes] = useState(curso?.inscricoes || '');
  const [inicio, setInicio] = useState(curso?.inicio || '');
  const [vagas, setVagas] = useState(curso?.vagas || '');
  const [bullets, setBullets] = useState(curso?.bullets?.length ? curso.bullets : ['']);
  const [programa, setPrograma] = useState(
    curso?.programa?.length ? curso.programa : [{ t: '', d: '' }]
  );

  const [erro, setErro] = useState('');
  const [camposComErro, setCamposComErro] = useState([]);
  const [sucesso, setSucesso] = useState(false);
  const [pending, startTransition] = useTransition();

  const posterEhCustom = poster && !POSTERS.includes(poster);

  function temErro(campo) {
    return camposComErro.includes(campo);
  }

  function onSubmit(e) {
    e.preventDefault();
    setErro('');
    setCamposComErro([]);
    setSucesso(false);

    const fd = new FormData();
    if (editando) fd.set('id', curso.id);
    fd.set('title', title);
    fd.set('cat', cat);
    fd.set('tag', tag);
    fd.set('nivel', nivel);
    fd.set('modulos', modulos);
    fd.set('horas', horas);
    fd.set('descricao', descricao);
    fd.set('poster', poster);
    fd.set('inscricoes', inscricoes);
    fd.set('inicio', inicio);
    fd.set('vagas', vagas);
    fd.set('bullets', JSON.stringify(bullets.filter((b) => b.trim() !== '')));
    fd.set(
      'programa',
      JSON.stringify(programa.filter((p) => p.t.trim() !== '' || p.d.trim() !== ''))
    );

    startTransition(async () => {
      const result = await salvarCurso(fd);
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
      <a href="/admin/cursos" style={{ fontSize: '14px', color: '#C9A227', fontWeight: 600, textDecoration: 'none' }} data-hv="goldlink">
        ← Voltar à lista de cursos
      </a>
      <h1 style={{ fontWeight: 600, fontSize: '26px', color: '#0C1A57', margin: '14px 0 0' }}>
        {editando ? 'Editar curso' : 'Novo curso'}
      </h1>

      <form onSubmit={onSubmit}>
        <div style={card}>
          <div style={sectionLabel}>DADOS DO CURSO</div>

          <label style={label}>
            Título *
            <input style={input} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={250} />
          </label>
          {temErro('title') && <div style={fieldErro}>Campo obrigatório (até 200 caracteres).</div>}

          <label style={label}>
            Categoria *
            <input style={input} value={cat} onChange={(e) => setCat(e.target.value)} />
          </label>
          {temErro('cat') && <div style={fieldErro}>Campo obrigatório.</div>}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            <label style={label}>
              Tag
              <input style={input} value={tag} onChange={(e) => setTag(e.target.value)} />
            </label>
            <label style={label}>
              Nível
              <input style={input} value={nivel} onChange={(e) => setNivel(e.target.value)} />
            </label>
            <label style={label}>
              Módulos
              <input style={input} value={modulos} onChange={(e) => setModulos(e.target.value)} />
            </label>
          </div>
          <label style={label}>
            Carga horária
            <input style={input} value={horas} onChange={(e) => setHoras(e.target.value)} />
          </label>

          <label style={label}>
            Descrição *
            <textarea
              style={{ ...input, minHeight: '96px', resize: 'vertical' }}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              maxLength={2100}
            />
          </label>
          {temErro('descricao') && <div style={fieldErro}>Campo obrigatório (até 2000 caracteres).</div>}

          <label style={label}>
            Pôster *
            <select
              style={input}
              value={posterEhCustom ? '__custom__' : poster}
              onChange={(e) => setPoster(e.target.value === '__custom__' ? '' : e.target.value)}
            >
              {POSTERS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
              <option value="__custom__">Outro (informar URL)</option>
            </select>
          </label>
          {(posterEhCustom || poster === '') && (
            <input
              style={{ ...input, marginTop: '8px' }}
              placeholder="/assets/... ou https://..."
              value={poster}
              onChange={(e) => setPoster(e.target.value)}
            />
          )}
          {temErro('poster') && <div style={fieldErro}>Campo obrigatório.</div>}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            <label style={label}>
              Inscrições até
              <input style={input} value={inscricoes} onChange={(e) => setInscricoes(e.target.value)} placeholder="25/07" />
            </label>
            <label style={label}>
              Início da turma
              <input style={input} value={inicio} onChange={(e) => setInicio(e.target.value)} placeholder="04/08" />
            </label>
            <label style={label}>
              Vagas
              <input style={input} value={vagas} onChange={(e) => setVagas(e.target.value)} placeholder="Últimas 8 vagas" />
            </label>
          </div>
        </div>

        <div style={card}>
          <div style={sectionLabel}>O QUE VOCÊ VAI LEVAR (BULLETS)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  style={{ ...input, marginTop: 0, flex: 1 }}
                  value={b}
                  onChange={(e) => {
                    const next = [...bullets];
                    next[i] = e.target.value;
                    setBullets(next);
                  }}
                />
                <button type="button" style={pillBtn} disabled={i === 0} onClick={() => {
                  if (i === 0) return;
                  const next = [...bullets];
                  [next[i - 1], next[i]] = [next[i], next[i - 1]];
                  setBullets(next);
                }}>↑</button>
                <button type="button" style={pillBtn} disabled={i === bullets.length - 1} onClick={() => {
                  if (i === bullets.length - 1) return;
                  const next = [...bullets];
                  [next[i + 1], next[i]] = [next[i], next[i + 1]];
                  setBullets(next);
                }}>↓</button>
                <button type="button" style={pillBtn} onClick={() => setBullets(bullets.filter((_, idx) => idx !== i))}>
                  Remover
                </button>
              </div>
            ))}
          </div>
          <button type="button" style={{ ...pillBtn, marginTop: '12px' }} onClick={() => setBullets([...bullets, ''])}>
            + Adicionar bullet
          </button>
        </div>

        <div style={card}>
          <div style={sectionLabel}>PROGRAMA DO CURSO</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>
            {programa.map((m, i) => (
              <div key={i} style={{ border: '1px solid #e5e5ea', borderRadius: '12px', padding: '14px 16px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#C9A227' }}>Módulo {i + 1}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="button" style={pillBtn} disabled={i === 0} onClick={() => {
                      if (i === 0) return;
                      const next = [...programa];
                      [next[i - 1], next[i]] = [next[i], next[i - 1]];
                      setPrograma(next);
                    }}>↑</button>
                    <button type="button" style={pillBtn} disabled={i === programa.length - 1} onClick={() => {
                      if (i === programa.length - 1) return;
                      const next = [...programa];
                      [next[i + 1], next[i]] = [next[i], next[i + 1]];
                      setPrograma(next);
                    }}>↓</button>
                    <button type="button" style={pillBtn} onClick={() => setPrograma(programa.filter((_, idx) => idx !== i))}>
                      Remover
                    </button>
                  </div>
                </div>
                <input
                  style={input}
                  placeholder="Título do módulo"
                  value={m.t}
                  onChange={(e) => {
                    const next = [...programa];
                    next[i] = { ...next[i], t: e.target.value };
                    setPrograma(next);
                  }}
                />
                <textarea
                  style={{ ...input, minHeight: '64px', resize: 'vertical' }}
                  placeholder="Descrição do módulo"
                  value={m.d}
                  onChange={(e) => {
                    const next = [...programa];
                    next[i] = { ...next[i], d: e.target.value };
                    setPrograma(next);
                  }}
                />
              </div>
            ))}
          </div>
          <button type="button" style={{ ...pillBtn, marginTop: '12px' }} onClick={() => setPrograma([...programa, { t: '', d: '' }])}>
            + Adicionar módulo
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
          {pending ? 'Salvando…' : 'Salvar curso'}
        </button>
      </form>
    </div>
  );
}
