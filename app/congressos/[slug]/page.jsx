import { notFound } from 'next/navigation';
import Screen from '@/components/Screen';
import { CONGRESSOS, congressoHtml } from '@/lib/congressos-data';

export function generateStaticParams() {
  return Object.keys(CONGRESSOS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = CONGRESSOS[slug];
  if (!c) return {};
  return { title: `${c.nome} · ${c.edicao}`, description: c.tagline };
}

export default async function CongressoPage({ params }) {
  const { slug } = await params;
  const html = congressoHtml(slug);
  if (!html) notFound();
  return <Screen html={html} />;
}
