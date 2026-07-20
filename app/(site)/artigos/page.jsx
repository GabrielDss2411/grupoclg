import Screen from '@/components/Screen';
import { getArtigos, seguroNoBuild } from '@/lib/db';
import { artigosPageHtml } from '@/lib/artigos-data';

export const metadata = {
  title: 'Artigos',
  description:
    'Análises, jurisprudência comentada e guias práticos sobre Licitações e Gestão Pública, escritos por quem atua na Administração Pública.',
};

export default async function ArtigosPage() {
  const artigos = await seguroNoBuild(getArtigos(), []);
  return <Screen html={artigosPageHtml(artigos)} />;
}
