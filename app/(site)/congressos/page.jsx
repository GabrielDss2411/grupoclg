import Screen from '@/components/Screen';
import { getCongressos, seguroNoBuild } from '@/lib/db';
import { congressosPageHtml } from '@/lib/congressos-data';

export const metadata = {
  title: 'Congressos',
  description:
    'Congressos e eventos do Grupo CLG: imersões em licitações, contratos e gestão pública com professores de referência e a jurisprudência mais recente do TCU.',
};

export default async function CongressosPage() {
  const congressos = await seguroNoBuild(getCongressos(), []);
  return <Screen html={congressosPageHtml(congressos)} />;
}
