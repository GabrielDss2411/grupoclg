import { notFound } from 'next/navigation';
import Screen from '@/components/Screen';
import { getArtigos, getArtigo, seguroNoBuild } from '@/lib/db';
import { artigoHtml } from '@/lib/artigos-data';

export const dynamicParams = true;

export async function generateStaticParams() {
  const artigos = await seguroNoBuild(getArtigos(), []);
  return artigos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = await getArtigo(slug);
  if (!a) return {};
  return { title: a.titulo, description: a.resumo };
}

export default async function ArtigoPage({ params }) {
  const { slug } = await params;
  const artigo = await getArtigo(slug);
  if (!artigo) notFound();
  return <Screen html={artigoHtml(artigo)} />;
}
