// Formulário de curso: cria (id === 'novo', sem registro no banco) ou edita
// (id real, busca no client autenticado -- vê inclusive indisponíveis).
import { createClient } from '@/lib/supabase/server-actions';
import CursoForm from './CursoForm';

export default async function CursoAdminPage({ params }) {
  const { id } = await params;

  if (id === 'novo') {
    return <CursoForm curso={null} />;
  }

  const supabase = await createClient();
  const { data: curso, error } = await supabase.from('cursos').select('*').eq('id', id).maybeSingle();

  if (error || !curso) {
    return (
      <div>
        <p style={{ fontSize: '15px', color: '#0C1A57' }}>Curso não encontrado.</p>
        <a href="/admin/cursos" style={{ fontSize: '14px', color: '#C9A227', fontWeight: 600 }} data-hv="goldlink">
          ← Voltar à lista
        </a>
      </div>
    );
  }

  return <CursoForm curso={curso} />;
}
