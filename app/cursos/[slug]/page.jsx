import { notFound } from 'next/navigation';
import Screen from '@/components/Screen';
import { CURSOS, cursoHtml } from '@/lib/cursos-data';

export function generateStaticParams() {
  return Object.keys(CURSOS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = CURSOS[slug];
  if (!c) return {};
  return { title: c.title, description: c.desc };
}

export default async function CursoPage({ params }) {
  const { slug } = await params;
  const html = cursoHtml(slug);
  if (!html) notFound();
  return <Screen html={html} />;
}
