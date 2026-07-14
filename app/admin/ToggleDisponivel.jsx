'use client';
// Toggle de disponibilidade reutilizado pelas listas de cursos e congressos
// (spec P2/1: badge "fora do site" + toggle imediato via alternarDisponivel).
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { alternarDisponivel } from './actions';

export default function ToggleDisponivel({ tipo, id, valor }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [erro, setErro] = useState('');

  function toggle() {
    setErro('');
    startTransition(async () => {
      const result = await alternarDisponivel(tipo, id, !valor);
      if (!result.ok) {
        setErro(result.error || 'Não foi possível salvar.');
        return;
      }
      router.refresh();
    });
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
      {!valor && (
        <span
          style={{
            fontSize: '11.5px',
            fontWeight: 700,
            color: '#8A90A6',
            background: '#f5f5f7',
            border: '1px solid #e5e5ea',
            borderRadius: '999px',
            padding: '4px 10px',
          }}
        >
          fora do site
        </span>
      )}
      <button
        type="button"
        onClick={toggle}
        disabled={pending}
        style={{
          background: valor ? 'rgba(91,214,160,0.16)' : '#f5f5f7',
          border: `1px solid ${valor ? 'rgba(91,214,160,0.4)' : '#e5e5ea'}`,
          color: valor ? '#0C1A57' : '#5A6180',
          borderRadius: '999px',
          padding: '7px 16px',
          fontSize: '12.5px',
          fontWeight: 700,
          cursor: pending ? 'default' : 'pointer',
          opacity: pending ? 0.6 : 1,
        }}
        data-hv="card"
      >
        {pending ? 'Salvando…' : valor ? 'Disponível' : 'Indisponível'}
      </button>
      {erro ? <span style={{ fontSize: '12px', color: '#0C1A57' }}>{erro}</span> : null}
    </div>
  );
}
