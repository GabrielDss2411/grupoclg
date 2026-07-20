'use client';
// Exporta a lista de inscrições visível na tela como CSV (client-side, sem
// dependência extra) -- uso prático do admin para repassar a lista à equipe
// de matrículas.
function csvCell(v) {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export default function ExportarCsvButton({ inscricoes }) {
  function exportar() {
    const cabecalho = ['Data', 'Tipo', 'Curso/Congresso', 'Nome', 'E-mail', 'Telefone', 'CPF', 'Observações'];
    const linhas = inscricoes.map((i) => [
      new Date(i.created_at).toLocaleString('pt-BR'),
      i.tipo,
      i.item_titulo,
      i.nome,
      i.email,
      i.telefone,
      i.cpf,
      i.observacoes || '',
    ]);
    const csv = [cabecalho, ...linhas].map((linha) => linha.map(csvCell).join(',')).join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inscricoes-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button type="button" onClick={exportar} className="adm-btn adm-btn-navy adm-btn-sm">
      Exportar CSV
    </button>
  );
}
