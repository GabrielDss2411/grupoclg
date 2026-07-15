// Lista de cursos do painel (spec P1-B/1): client autenticado vê TODOS os
// cursos (disponíveis e indisponíveis) -- por isso usa lib/supabase/server-actions.js
// (RLS authenticated: using(true)), nunca lib/db.js (anon, só disponivel=true).
import { createClient } from '@/lib/supabase/server-actions';
import ToggleDisponivel from '@/app/admin/ToggleDisponivel';

export default async function CursosAdminPage() {
  const supabase = await createClient();
  const { data: cursos, error } = await supabase
    .from('cursos')
    .select('*')
    .order('created_at', { ascending: true });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '12px', letterSpacing: '2.4px', fontWeight: 700, color: '#A89A6E' }}>CURSOS</div>
          <h1 style={{ fontWeight: 600, fontSize: '26px', color: '#0C1A57', margin: '8px 0 0' }}>
            Catálogo de cursos
          </h1>
        </div>
        <a
          href="/admin/cursos/novo"
          style={{
            background: '#E9C65A',
            color: '#0A1442',
            borderRadius: '999px',
            padding: '11px 22px',
            fontWeight: 700,
            fontSize: '14px',
            textDecoration: 'none',
          }}
          data-hv="gold"
        >
          Novo curso
        </a>
      </div>

      {error ? (
        <p style={{ marginTop: '22px', fontSize: '14px', color: '#0C1A57', background: '#fff', border: '1px solid #e5e5ea', borderRadius: '12px', padding: '16px 18px' }}>
          Não foi possível carregar os cursos agora. Tente novamente.
        </p>
      ) : (
        <div style={{ marginTop: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {cursos.length === 0 ? (
            <p style={{ fontSize: '14.5px', color: '#5A6180' }}>Nenhum curso cadastrado ainda.</p>
          ) : (
            cursos.map((c) => (
              <div
                key={c.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap',
                  background: '#fff',
                  border: '1px solid #e5e5ea',
                  borderRadius: '16px',
                  padding: '16px 20px',
                }}
              >
                <a href={`/admin/cursos/${c.id}`} style={{ textDecoration: 'none', flex: '1 1 auto', minWidth: '220px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#0C1A57' }}>{c.title}</div>
                  <div style={{ fontSize: '13px', color: '#8A90A6', marginTop: '4px' }}>{c.cat}</div>
                </a>
                <ToggleDisponivel tipo="cursos" id={c.id} valor={c.disponivel} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
