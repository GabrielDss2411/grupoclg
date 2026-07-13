'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { navbar } from '@/lib/content';
import { useSiteHandlers } from './handlers';

// Chave ativa por prefixo de rota; páginas de detalhe acendem a categoria correspondente.
function activeKey(pathname) {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/cursos') || pathname.startsWith('/congressos')) return 'capacitacao';
  if (pathname.startsWith('/in-company')) return 'treinamentos';
  if (pathname.startsWith('/sobre')) return 'sobre';
  return null;
}

export default function Navbar() {
  const ref = useRef(null);
  const pathname = usePathname();
  useSiteHandlers(ref, {});
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.querySelectorAll('nav [data-navkey]').forEach((b) => b.classList.remove('nav-active'));
    const key = activeKey(pathname);
    if (key) {
      const b = root.querySelector(`nav [data-navkey="${key}"]`);
      if (b) b.classList.add('nav-active');
    }
  }, [pathname]);
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: navbar }} />;
}
