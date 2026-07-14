// Lista de congressos do painel (spec P1-C/1): client autenticado vê TODOS
// os congressos -- mesma lógica de app/admin/cursos/page.jsx.
import { createClient } from '@/lib/supabase/server-actions';
import ToggleDisponivel from '@/app/admin/ToggleDisponivel';

export default async function CongressosAdminPage() {
  const supabase = await createClient();
  const { data: congressos, error } = await supabase
    .from('congressos')
    .select('*')
    .order('created_at', { ascending: true });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '12px', letterSpacing: '2.4px', fontWeight: 700, color: '#A89A6E' }}>CONGRESSOS</div>
          <h1 style={{ fontWeight: 600, fontSize: '26px', color: '#0C1A57', margin: '8px 0 0' }}>
            Agenda de congressos
          </h1>
        </div>
        <a
          href="/admin/congressos/novo"
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
          Novo congresso
        </a>
      </div>

      {error ? (
        <p style={{ marginTop: '22px', fontSize: '14px', color: '#0C1A57', background: '#fff', border: '1px solid #e5e5ea', borderRadius: '12px', padding: '16px 18px' }}>
          Não foi possível carregar os congressos agora. Tente novamente.
        </p>
      ) : (
        <div style={{ marginTop: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {congressos.length === 0 ? (
            <p style={{ fontSize: '14.5px', color: '#5A6180' }}>Nenhum congresso cadastrado ainda.</p>
          ) : (
            congressos.map((c) => (
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
                <a href={`/admin/congressos/${c.id}`} style={{ textDecoration: 'none', flex: '1 1 auto', minWidth: '220px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#0C1A57' }}>{c.nome}</div>
                  <div style={{ fontSize: '13px', color: '#8A90A6', marginTop: '4px' }}>
                    {c.edicao} · {c.datas}
                  </div>
                </a>
                <ToggleDisponivel tipo="congressos" id={c.id} valor={c.disponivel} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
