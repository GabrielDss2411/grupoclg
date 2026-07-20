import { notFound } from 'next/navigation';
import DetalheComFicha from '@/components/DetalheComFicha';
import { getCongressos, getCongresso, seguroNoBuild } from '@/lib/db';
import { congressoHtml } from '@/lib/congressos-data';

export const dynamicParams = true;

export async function generateStaticParams() {
  const congressos = await seguroNoBuild(getCongressos(), []);
  return congressos.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = await getCongresso(slug);
  if (!c) return {};
  return { title: `${c.nome} · ${c.edicao}`, description: c.tagline };
}

export default async function CongressoPage({ params }) {
  const { slug } = await params;
  const congresso = await getCongresso(slug);
  if (!congresso) notFound();
  return <DetalheComFicha html={congressoHtml(congresso)} tipo="congresso" item={{ id: congresso.id, titulo: congresso.nome }} />;
}
