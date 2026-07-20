'use client';
import { useEffect, useRef } from 'react';
import { useSiteHandlers } from './handlers';
import { initAnimations } from '@/lib/animations';

/**
 * Renderiza o conteúdo de uma tela (markup migrado) e ativa navegação,
 * carrosséis e animações GSAP no cliente.
 */
export default function Screen({ html, onFicha }) {
  const ref = useRef(null);
  useSiteHandlers(ref, { sliders: true, onFicha });
  useEffect(() => {
    const cleanup = initAnimations();
    // Countdown das LPs de congresso: calculado no cliente para nunca ficar defasado no SSG.
    if (ref.current) {
      ref.current.querySelectorAll('[data-countdown]').forEach((el) => {
        const dias = Math.ceil((new Date(el.getAttribute('data-countdown') + 'T00:00:00') - Date.now()) / 86400000);
        el.textContent = dias > 0 ? `Faltam ${dias} dias para o evento` : '';
      });
    }
    return () => { if (cleanup) cleanup(); };
  }, [html]);
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
