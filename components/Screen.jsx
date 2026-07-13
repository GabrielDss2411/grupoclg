'use client';
import { useEffect, useRef } from 'react';
import { useSiteHandlers } from './handlers';
import { initAnimations } from '@/lib/animations';

/**
 * Renderiza o conteúdo de uma tela (markup migrado) e ativa navegação,
 * carrosséis e animações GSAP no cliente.
 */
export default function Screen({ html }) {
  const ref = useRef(null);
  useSiteHandlers(ref, { sliders: true });
  useEffect(() => {
    const cleanup = initAnimations();
    return () => { if (cleanup) cleanup(); };
  }, [html]);
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
