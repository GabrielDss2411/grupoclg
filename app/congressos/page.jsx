import Screen from '@/components/Screen';
import { congressos } from '@/lib/content';

export const metadata = {
  title: 'Congressos',
  description:
    'Congressos e eventos do Grupo CLG: imersões em licitações, contratos e gestão pública com professores de referência e a jurisprudência mais recente do TCU.',
};

export default function CongressosPage() {
  return <Screen html={congressos} />;
}
