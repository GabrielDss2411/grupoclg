'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const ROUTES = { home: '/', cursos: '/cursos', congressos: '/congressos', incompany: '/in-company', sobre: '/sobre' };

/**
 * Delegação de eventos para o conteúdo migrado (renderizado via HTML):
 * - [data-href] => navegação para caminho literal (páginas de detalhe)
 * - [data-nav] => navegação por rota nomeada (Next router)
 * - [data-slide] (com sliders:true) => rolagem dos carrosséis
 */
export function useSiteHandlers(ref, { sliders = false } = {}) {
  const router = useRouter();
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const onClick = (e) => {
      const t = e.target;
      if (!t || !t.closest) return;
      const link = t.closest('[data-href]');
      if (link) {
        e.preventDefault();
        router.push(link.getAttribute('data-href'));
        return;
      }
      const nav = t.closest('[data-nav]');
      if (nav) {
        const r = ROUTES[nav.getAttribute('data-nav')];
        if (r) { e.preventDefault(); router.push(r); }
        return;
      }
      if (sliders) {
        const b = t.closest('[data-slide]');
        if (b) {
          const row = b.closest('[data-row]');
          const s = row && row.querySelector('[data-slider]');
          if (s) {
            const dir = b.getAttribute('data-slide') === 'next' ? 1 : -1;
            s.scrollBy({ left: dir * Math.max(s.clientWidth * 0.8, 324), behavior: 'smooth' });
          }
        }
      }
    };
    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, [ref, router, sliders]);
}
