'use client';
// Modal da ficha de inscrição, aberto pelo CTA "Garantir vaga" ([data-ficha]
// em lib/cursos-data.js/lib/congressos-data.js, delegado via useSiteHandlers).
// Captura nome/email/telefone/CPF e grava em `inscricoes` via criarInscricao
// (lib/inscricoes-actions.js). Sem sessão -- é a única escrita pública do
// site. WhatsApp continua disponível como canal alternativo/imediato.
import { useEffect, useState, useTransition } from 'react';
import { criarInscricao } from '@/lib/inscricoes-actions';

const WA = 'https://wa.me/5521980936347';

const label = { display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#42496A', marginTop: '16px' };
const input = {
  display: 'block',
  width: '100%',
  marginTop: '6px',
  padding: '13px 15px',
  fontSize: '15px',
  color: '#0C1A57',
  border: '1px solid #e5e5ea',
  borderRadius: '8px',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};
const fieldErro = { fontSize: '12.5px', color: '#0C1A57', fontWeight: 600, marginTop: '4px' };

export default function FichaInscricao({ open, onClose, tipo, item }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [erro, setErro] = useState('');
  const [camposComErro, setCamposComErro] = useState([]);
  const [sucesso, setSucesso] = useState(false);
  const [pending, startTransition] = useTransition();

  // Esc fecha o modal e trava o scroll da página enquanto ele está aberto.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    const overflowOriginal = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflowOriginal;
    };
  }, [open, onClose]);

  // Reseta o form ao fechar, para a próxima abertura começar limpa.
  useEffect(() => {
    if (open) return;
    setNome('');
    setEmail('');
    setTelefone('');
    setCpf('');
    setObservacoes('');
    setErro('');
    setCamposComErro([]);
    setSucesso(false);
  }, [open]);

  if (!open) return null;

  function temErro(campo) {
    return camposComErro.includes(campo);
  }

  function onSubmit(e) {
    e.preventDefault();
    setErro('');
    setCamposComErro([]);

    const fd = new FormData();
    fd.set('tipo', tipo);
    fd.set('item_id', item.id);
    fd.set('item_titulo', item.titulo);
    fd.set('nome', nome);
    fd.set('email', email);
    fd.set('telefone', telefone);
    fd.set('cpf', cpf);
    fd.set('observacoes', observacoes);

    startTransition(async () => {
      const result = await criarInscricao(fd);
      if (!result.ok) {
        setErro(result.error);
        setCamposComErro(result.fields || []);
        return;
      }
      setSucesso(true);
    });
  }

  const wa = `${WA}?text=${encodeURIComponent(`Olá, quero garantir minha vaga em ${item.titulo}.`)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Ficha de inscrição"
      style={{ position: 'fixed', inset: 0, background: 'rgba(10,20,66,0.55)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: '#fff', borderRadius: '20px', padding: '36px 38px', maxWidth: '540px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 40px 80px -30px rgba(10,20,66,0.6)' }}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          style={{ position: 'absolute', top: '18px', right: '18px', background: '#f5f5f7', border: '1px solid #e5e5ea', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer', fontSize: '17px', lineHeight: 1, color: '#42496A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          ×
        </button>

        <div style={{ fontSize: '12px', letterSpacing: '2.4px', fontWeight: 700, color: '#A89A6E' }}>FICHA DE INSCRIÇÃO</div>
        <h2 style={{ fontSize: '26px', color: '#0C1A57', margin: '10px 0 0', paddingRight: '30px' }}>Garanta sua vaga agora</h2>
        <p style={{ fontSize: '14.5px', color: '#5A6180', margin: '8px 0 0', lineHeight: 1.55 }}>
          Preencha seus dados abaixo e nossa equipe entra em contato para confirmar sua matrícula em {item.titulo}.
        </p>

        {sucesso ? (
          <div style={{ marginTop: '22px', background: 'rgba(91,214,160,0.16)', border: '1px solid rgba(91,214,160,0.4)', borderRadius: '12px', padding: '20px 22px' }}>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#0C1A57' }}>Inscrição recebida.</div>
            <p style={{ fontSize: '14.5px', color: '#42496A', margin: '6px 0 0', lineHeight: 1.55 }}>
              Nossa equipe vai entrar em contato em breve para confirmar sua matrícula. Se preferir, fale agora
              mesmo pelo WhatsApp.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '14px' }}>
              <a href={wa} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#E9C65A', color: '#0A1442', borderRadius: '999px', padding: '13px 24px', fontWeight: 700, fontSize: '14.5px' }} data-hv="gold">
                Falar no WhatsApp <span>→</span>
              </a>
              <button type="button" onClick={onClose} style={{ background: 'none', border: '1px solid #e5e5ea', color: '#42496A', borderRadius: '999px', padding: '13px 24px', fontWeight: 600, fontSize: '14.5px', cursor: 'pointer' }}>
                Fechar
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} style={{ marginTop: '6px' }}>
            <label style={label}>
              Nome completo *
              <input style={input} value={nome} onChange={(e) => setNome(e.target.value)} maxLength={200} autoFocus />
            </label>
            {temErro('nome') && <div style={fieldErro}>Campo obrigatório.</div>}

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '14px' }}>
              <label style={label}>
                E-mail *
                <input style={input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label style={label}>
                Telefone / WhatsApp *
                <input style={input} value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(21) 90000-0000" />
              </label>
            </div>
            {(temErro('email') || temErro('telefone')) && (
              <div style={fieldErro}>
                {temErro('email') ? 'Informe um e-mail válido. ' : ''}
                {temErro('telefone') ? 'Informe um telefone válido.' : ''}
              </div>
            )}

            <label style={label}>
              CPF *
              <input style={input} value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="000.000.000-00" maxLength={14} />
            </label>
            {temErro('cpf') && <div style={fieldErro}>Informe um CPF válido.</div>}

            <label style={label}>
              Observações (opcional)
              <textarea
                style={{ ...input, minHeight: '70px', resize: 'vertical' }}
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                maxLength={1000}
              />
            </label>

            {erro ? (
              <p style={{ marginTop: '16px', fontSize: '13.5px', color: '#0C1A57', background: '#f5f5f7', border: '1px solid #e5e5ea', borderRadius: '8px', padding: '10px 12px' }}>
                {erro}
              </p>
            ) : null}

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '22px' }}>
              <button
                type="submit"
                disabled={pending}
                style={{
                  background: '#E9C65A',
                  color: '#0A1442',
                  border: 0,
                  borderRadius: '999px',
                  padding: '15px 30px',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: pending ? 'default' : 'pointer',
                  opacity: pending ? 0.7 : 1,
                }}
                data-hv="gold"
              >
                {pending ? 'Enviando…' : 'Enviar inscrição'}
              </button>
              <a href={wa} target="_blank" rel="noopener" style={{ fontSize: '13.5px', color: '#C9A227', fontWeight: 600 }} data-hv="goldlink">
                ou fale agora pelo WhatsApp →
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
