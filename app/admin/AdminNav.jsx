'use client';
// Navegação do painel + botão "Sair" (client component: layout.jsx que a usa
// é Server Component e não pode chamar supabase.auth.signOut() diretamente).
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const LINKS = [
  { href: '/admin', label: 'Visão geral' },
  { href: '/admin/cursos', label: 'Cursos' },
  { href: '/admin/congressos', label: 'Congressos' },
];

export default function AdminNav() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [signingOut, setSigningOut] = useState(false);

  function sair() {
    setSigningOut(true);
    startTransition(async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/admin/login');
      router.refresh();
    });
  }

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap',
        padding: '18px 30px',
        borderBottom: '1px solid #e5e5ea',
        background: '#fff',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 700, fontSize: '15px', color: '#0C1A57', letterSpacing: '-0.01em' }}>
          Painel Grupo CLG
        </span>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#0C1A57',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '999px',
              }}
              data-hv="card"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={sair}
        disabled={pending || signingOut}
        style={{
          background: '#0C1A57',
          color: '#fff',
          border: 0,
          borderRadius: '999px',
          padding: '10px 22px',
          fontWeight: 700,
          fontSize: '14px',
          cursor: pending || signingOut ? 'default' : 'pointer',
          opacity: pending || signingOut ? 0.7 : 1,
        }}
        data-hv="navy"
      >
        Sair
      </button>
    </nav>
  );
}
