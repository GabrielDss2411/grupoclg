// Formulário de congresso: cria (id === 'novo', sem registro no banco) ou
// edita (id real, busca no client autenticado -- vê inclusive indisponíveis).
import { createClient } from '@/lib/supabase/server-actions';
import CongressoForm from './CongressoForm';

export default async function CongressoAdminPage({ params }) {
  const { id } = await params;

  if (id === 'novo') {
    return <CongressoForm congresso={null} />;
  }

  const supabase = await createClient();
  const { data: congresso, error } = await supabase.from('congressos').select('*').eq('id', id).maybeSingle();

  if (error || !congresso) {
    return (
      <div>
        <p style={{ fontSize: '15px', color: '#0C1A57' }}>Congresso não encontrado.</p>
        <a href="/admin/congressos" style={{ fontSize: '14px', color: '#C9A227', fontWeight: 600 }} data-hv="goldlink">
          ← Voltar à lista
        </a>
      </div>
    );
  }

  return <CongressoForm congresso={congresso} />;
}
