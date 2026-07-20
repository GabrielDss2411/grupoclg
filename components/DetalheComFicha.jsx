'use client';
// Wrapper client das páginas de detalhe (/cursos/[slug], /congressos/[slug]):
// mantém o estado de abertura do modal da ficha de inscrição, acionado pelo
// CTA "Garantir vaga" ([data-ficha]) dentro do HTML migrado.
import { useState } from 'react';
import Screen from './Screen';
import FichaInscricao from './FichaInscricao';

export default function DetalheComFicha({ html, tipo, item }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Screen html={html} onFicha={() => setOpen(true)} />
      <FichaInscricao open={open} onClose={() => setOpen(false)} tipo={tipo} item={item} />
    </>
  );
}
