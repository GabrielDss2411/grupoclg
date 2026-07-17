import { notFound } from 'next/navigation';
import Screen from '@/components/Screen';
import { getCursos, getCurso, seguroNoBuild } from '@/lib/db';
import { cursoHtml } from '@/lib/cursos-data';

export const dynamicParams = true;

export async function generateStaticParams() {
  const cursos = await seguroNoBuild(getCursos(), []);
  return cursos.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = await getCurso(slug);
  if (!c) return {};
  return { title: c.title, description: c.descricao };
}

export default async function CursoPage({ params }) {
  const { slug } = await params;
  const curso = await getCurso(slug);
  if (!curso) notFound();
  return <Screen html={cursoHtml(curso)} />;
}
