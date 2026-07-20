'use client';
// Form controlado de artigo (criar/editar). Chama salvarArtigo via
// useTransition; botão fica desabilitado durante o envio (evita duplo clique);
// em erro mantém os dados preenchidos e mostra a mensagem; em sucesso mostra
// "Salvo · já no site" (mesmo padrão de CursoForm/CongressoForm).
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { salvarArtigo } from '../../actions';

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

export default function ArtigoForm({ artigo }) {
  const router = useRouter();
  const editando = Boolean(artigo?.id);

  const [titulo, setTitulo] = useState(artigo?.titulo || '');
  const [categoria, setCategoria] = useState(artigo?.categoria || '');
  const [resumo, setResumo] = useState(artigo?.resumo || '');
  const [capa, setCapa] = useState(artigo?.capa || '');
  const [autor, setAutor] = useState(artigo?.autor || 'Bruno Verzani');
  const [conteudo, setConteudo] = useState(artigo?.conteudo || '');

  const [erro, setErro] = useState('');
  const [camposComErro, setCamposComErro] = useState([]);
  const [sucesso, setSucesso] = useState(false);
  const [pending, startTransition] = useTransition();

  function temErro(campo) {
    return camposComErro.includes(campo);
  }

  function onSubmit(e) {
    e.preventDefault();
    setErro('');
    setCamposComErro([]);
    setSucesso(false);

    const fd = new FormData();
    if (editando) fd.set('id', artigo.id);
    fd.set('titulo', titulo);
    fd.set('categoria', categoria);
    fd.set('resumo', resumo);
    fd.set('capa', capa);
    fd.set('autor', autor);
    fd.set('conteudo', conteudo);

    startTransition(async () => {
      const result = await salvarArtigo(fd);
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
      <a href="/admin/artigos" style={{ fontSize: '14px', color: '#C9A227', fontWeight: 600, textDecoration: 'none' }} data-hv="goldlink">
        ← Voltar à lista de artigos
      </a>
      <h1 style={{ fontWeight: 600, fontSize: '26px', color: '#0C1A57', margin: '14px 0 0' }}>
        {editando ? 'Editar artigo' : 'Novo artigo'}
      </h1>

      <form onSubmit={onSubmit}>
        <div style={card}>
          <div style={sectionLabel}>DADOS DO ARTIGO</div>

          <label style={label}>
            Título *
            <input style={input} value={titulo} onChange={(e) => setTitulo(e.target.value)} maxLength={250} />
          </label>
          {temErro('titulo') && <div style={fieldErro}>Campo obrigatório (até 200 caracteres).</div>}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <label style={label}>
              Categoria *
              <input style={input} value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Licitações, Contratos, Jurisprudência..." />
            </label>
            <label style={label}>
              Autor
              <input style={input} value={autor} onChange={(e) => setAutor(e.target.value)} />
            </label>
          </div>
          {temErro('categoria') && <div style={fieldErro}>Campo obrigatório.</div>}

          <label style={label}>
            Resumo (aparece no card e na busca) *
            <textarea
              style={{ ...input, minHeight: '80px', resize: 'vertical' }}
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
              maxLength={2100}
            />
          </label>
          {temErro('resumo') && <div style={fieldErro}>Campo obrigatório (até 2000 caracteres).</div>}

          <label style={label}>
            Imagem de capa (URL ou /assets/...) *
            <input style={input} value={capa} onChange={(e) => setCapa(e.target.value)} placeholder="/assets/... ou https://..." />
          </label>
          {temErro('capa') && <div style={fieldErro}>Campo obrigatório.</div>}
        </div>

        <div style={card}>
          <div style={sectionLabel}>CONTEÚDO</div>
          <label style={label}>
            Corpo do artigo * (separe os parágrafos com uma linha em branco)
            <textarea
              style={{ ...input, minHeight: '320px', resize: 'vertical' }}
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              maxLength={20100}
            />
          </label>
          {temErro('conteudo') && <div style={fieldErro}>Campo obrigatório.</div>}
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
          {pending ? 'Salvando…' : 'Salvar artigo'}
        </button>
      </form>
    </div>
  );
}
