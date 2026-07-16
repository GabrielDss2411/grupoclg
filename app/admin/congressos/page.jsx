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
      <div className="adm-section-head">
        <div>
          <div className="adm-eyebrow">CONGRESSOS</div>
          <h1 className="adm-h1" style={{ fontSize: '26px' }}>Agenda de congressos</h1>
        </div>
        <a href="/admin/congressos/novo" className="adm-btn adm-btn-gold">Novo congresso</a>
      </div>

      {error ? (
        <p className="adm-notice">Não foi possível carregar os congressos agora. Tente novamente.</p>
      ) : congressos.length === 0 ? (
        <p className="adm-empty">Nenhum congresso cadastrado ainda.</p>
      ) : (
        <div className="adm-list">
          {congressos.map((c) => (
            <div key={c.id} className="adm-list-row">
              <a href={`/admin/congressos/${c.id}`} className="adm-row-title" style={{ flex: '1 1 auto', minWidth: '220px' }}>
                <div style={{ fontSize: '16px' }}>{c.nome}</div>
                <div className="adm-row-sub">{c.edicao} · {c.datas}</div>
              </a>
              <ToggleDisponivel tipo="congressos" id={c.id} valor={c.disponivel} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
