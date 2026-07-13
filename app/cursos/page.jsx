import Screen from '@/components/Screen';
import { cursos } from '@/lib/content';

export const metadata = {
  title: 'Cursos',
  description:
    'Licitações, contratos, fiscalização, pregão e mais. Turmas práticas com certificado individual e valor que cabe no orçamento público.',
};

export default function CursosPage() {
  return <Screen html={cursos} />;
}
