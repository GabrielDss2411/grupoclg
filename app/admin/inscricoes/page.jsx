// Lista de inscrições recebidas pela ficha pública (cursos/congressos).
// Somente leitura -- inscrições não são criadas nem editadas pelo painel,
// só consultadas/exportadas. Client autenticado (RLS authenticated: select
// all); o client anon usado pela ficha pública não tem permissão de SELECT.
import { createClient } from '@/lib/supabase/server-actions';
import ExportarCsvButton from './ExportarCsvButton';

export default async function InscricoesAdminPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('inscricoes')
    .select('id, curso_id, congresso_id, item_titulo, nome, email, telefone, cpf, observacoes, created_at')
    .order('created_at', { ascending: false });

  const inscricoes = (data ?? []).map((i) => ({ ...i, tipo: i.curso_id ? 'Curso' : 'Congresso' }));

  return (
    <div>
      <div className="adm-section-head">
        <div>
          <div className="adm-eyebrow">INSCRIÇÕES</div>
          <h1 className="adm-h1" style={{ fontSize: '26px' }}>Ficha de inscrição</h1>
          <p className="adm-lede">Inscrições recebidas pelo site em cursos e congressos.</p>
        </div>
        {inscricoes.length > 0 ? <ExportarCsvButton inscricoes={inscricoes} /> : null}
      </div>

      {error ? (
        <p className="adm-notice">Não foi possível carregar as inscrições agora. Tente novamente.</p>
      ) : inscricoes.length === 0 ? (
        <p className="adm-empty">Nenhuma inscrição recebida ainda.</p>
      ) : (
        <div className="adm-card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="adm-table">
              <thead>
                <tr><th>Nome</th><th>Contato</th><th>CPF</th><th>Curso/Congresso</th><th>Tipo</th><th>Recebida em</th></tr>
              </thead>
              <tbody>
                {inscricoes.map((i) => (
                  <tr key={i.id}>
                    <td>
                      <div className="adm-row-title">{i.nome}</div>
                      {i.observacoes ? <div className="adm-row-sub">{i.observacoes}</div> : null}
                    </td>
                    <td style={{ color: '#5A6180' }}>
                      <div>{i.email}</div>
                      <div className="adm-row-sub">{i.telefone}</div>
                    </td>
                    <td style={{ color: '#5A6180' }}>{i.cpf}</td>
                    <td style={{ color: '#5A6180' }}>{i.item_titulo}</td>
                    <td><span className="adm-type-chip">{i.tipo}</span></td>
                    <td style={{ color: '#5A6180' }}>{new Date(i.created_at).toLocaleString('pt-BR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
