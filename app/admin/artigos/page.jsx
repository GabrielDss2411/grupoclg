// Lista de artigos do painel: client autenticado vê TODOS os artigos
// (disponíveis e indisponíveis) -- por isso usa lib/supabase/server-actions.js
// (RLS authenticated: using(true)), nunca lib/db.js (anon, só disponivel=true).
import { createClient } from '@/lib/supabase/server-actions';
import ToggleDisponivel from '@/app/admin/ToggleDisponivel';

export default async function ArtigosAdminPage() {
  const supabase = await createClient();
  const { data: artigos, error } = await supabase
    .from('artigos')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="adm-section-head">
        <div>
          <div className="adm-eyebrow">ARTIGOS</div>
          <h1 className="adm-h1" style={{ fontSize: '26px' }}>Artigos e notícias</h1>
        </div>
        <a href="/admin/artigos/novo" className="adm-btn adm-btn-gold">Novo artigo</a>
      </div>

      {error ? (
        <p className="adm-notice">Não foi possível carregar os artigos agora. Tente novamente.</p>
      ) : artigos.length === 0 ? (
        <p className="adm-empty">Nenhum artigo cadastrado ainda.</p>
      ) : (
        <div className="adm-list">
          {artigos.map((a) => (
            <div key={a.id} className="adm-list-row">
              <a href={`/admin/artigos/${a.id}`} className="adm-row-title" style={{ flex: '1 1 auto', minWidth: '220px' }}>
                <div style={{ fontSize: '16px' }}>{a.titulo}</div>
                <div className="adm-row-sub">{a.categoria}</div>
              </a>
              <ToggleDisponivel tipo="artigos" id={a.id} valor={a.disponivel} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
