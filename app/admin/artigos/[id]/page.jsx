// Formulário de artigo: cria (id === 'novo', sem registro no banco) ou edita
// (id real, busca no client autenticado -- vê inclusive indisponíveis).
import { createClient } from '@/lib/supabase/server-actions';
import ArtigoForm from './ArtigoForm';

export default async function ArtigoAdminPage({ params }) {
  const { id } = await params;

  if (id === 'novo') {
    return <ArtigoForm artigo={null} />;
  }

  const supabase = await createClient();
  const { data: artigo, error } = await supabase.from('artigos').select('*').eq('id', id).maybeSingle();

  if (error || !artigo) {
    return (
      <div>
        <p style={{ fontSize: '15px', color: '#0C1A57' }}>Artigo não encontrado.</p>
        <a href="/admin/artigos" style={{ fontSize: '14px', color: '#C9A227', fontWeight: 600 }} data-hv="goldlink">
          ← Voltar à lista
        </a>
      </div>
    );
  }

  return <ArtigoForm artigo={artigo} />;
}
