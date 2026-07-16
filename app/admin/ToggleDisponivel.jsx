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
      {!valor && <span className="adm-badge-off">fora do site</span>}
      <button
        type="button"
        onClick={toggle}
        disabled={pending}
        className={`adm-toggle ${valor ? 'adm-toggle-on' : 'adm-toggle-off'}`}
      >
        {pending ? 'Salvando…' : valor ? 'Disponível' : 'Indisponível'}
      </button>
      {erro ? <span style={{ fontSize: '12px', color: '#0C1A57' }}>{erro}</span> : null}
    </div>
  );
}
