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
      <div className="adm-section-head">
        <div>
          <div className="adm-eyebrow">CURSOS</div>
          <h1 className="adm-h1" style={{ fontSize: '26px' }}>Catálogo de cursos</h1>
        </div>
        <a href="/admin/cursos/novo" className="adm-btn adm-btn-gold">Novo curso</a>
      </div>

      {error ? (
        <p className="adm-notice">Não foi possível carregar os cursos agora. Tente novamente.</p>
      ) : cursos.length === 0 ? (
        <p className="adm-empty">Nenhum curso cadastrado ainda.</p>
      ) : (
        <div className="adm-list">
          {cursos.map((c) => (
            <div key={c.id} className="adm-list-row">
              <a href={`/admin/cursos/${c.id}`} className="adm-row-title" style={{ flex: '1 1 auto', minWidth: '220px' }}>
                <div style={{ fontSize: '16px' }}>{c.title}</div>
                <div className="adm-row-sub">{c.cat}</div>
              </a>
              <ToggleDisponivel tipo="cursos" id={c.id} valor={c.disponivel} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
