'use client';
// Login do painel (spec P1-A). Credencial inválida mostra EXATAMENTE uma
// mensagem ("E-mail ou senha incorretos"), sem indicar qual campo errou (AC3).
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [pending, startTransition] = useTransition();

  function onSubmit(e) {
    e.preventDefault();
    setErro('');
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
      if (error) {
        setErro('E-mail ou senha incorretos');
        return;
      }
      router.push('/admin');
      router.refresh();
    });
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: '100%',
          maxWidth: '380px',
          background: '#fff',
          border: '1px solid #e5e5ea',
          borderRadius: '16px',
          padding: '36px 32px',
          boxShadow: '0 20px 44px -34px rgba(10,20,66,0.45)',
        }}
      >
        <div style={{ fontSize: '12px', letterSpacing: '2.4px', fontWeight: 700, color: '#A89A6E' }}>
          PAINEL ADMINISTRATIVO
        </div>
        <h1 style={{ fontWeight: 600, fontSize: '26px', color: '#0C1A57', margin: '10px 0 0' }}>
          Entrar
        </h1>

        <label style={{ display: 'block', marginTop: '22px' }}>
          <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#42496A' }}>E-mail</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              display: 'block',
              width: '100%',
              marginTop: '6px',
              padding: '11px 14px',
              fontSize: '15px',
              color: '#0C1A57',
              border: '1px solid #e5e5ea',
              borderRadius: '8px',
              boxSizing: 'border-box',
            }}
          />
        </label>

        <label style={{ display: 'block', marginTop: '16px' }}>
          <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#42496A' }}>Senha</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{
              display: 'block',
              width: '100%',
              marginTop: '6px',
              padding: '11px 14px',
              fontSize: '15px',
              color: '#0C1A57',
              border: '1px solid #e5e5ea',
              borderRadius: '8px',
              boxSizing: 'border-box',
            }}
          />
        </label>

        {erro ? (
          <p style={{ fontSize: '13.5px', color: '#0C1A57', background: '#f5f5f7', border: '1px solid #e5e5ea', borderRadius: '8px', padding: '10px 12px', marginTop: '16px' }}>
            {erro}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          style={{
            marginTop: '22px',
            width: '100%',
            background: '#E9C65A',
            color: '#0A1442',
            border: 0,
            borderRadius: '999px',
            padding: '13px',
            fontWeight: 700,
            fontSize: '15px',
            cursor: pending ? 'default' : 'pointer',
            opacity: pending ? 0.7 : 1,
          }}
          data-hv="gold"
        >
          {pending ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
