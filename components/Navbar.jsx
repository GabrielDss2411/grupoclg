'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { navbar } from '@/lib/content';
import { useSiteHandlers } from './handlers';

const ACTIVE = { '/': 'home', '/cursos': 'cursos', '/in-company': 'incompany', '/sobre': 'sobre' };

export default function Navbar() {
  const ref = useRef(null);
  const pathname = usePathname();
  useSiteHandlers(ref, {});
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.querySelectorAll('nav [data-nav]').forEach((b) => b.classList.remove('nav-active'));
    const key = ACTIVE[pathname];
    if (key) {
      const b = root.querySelector(`nav [data-nav="${key}"]`);
      if (b) b.classList.add('nav-active');
    }
  }, [pathname]);
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: navbar }} />;
}
