'use client';
import { useRef } from 'react';
import { footer } from '@/lib/content';
import { useSiteHandlers } from './handlers';

export default function Footer() {
  const ref = useRef(null);
  useSiteHandlers(ref, {});
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: footer }} />;
}
