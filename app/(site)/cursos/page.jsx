import Screen from '@/components/Screen';
import { getCursos } from '@/lib/db';
import { cursosPageHtml } from '@/lib/content';

export const metadata = {
  title: 'Cursos',
  description:
    'Licitações, contratos, fiscalização, pregão e mais. Turmas práticas com certificado individual e valor que cabe no orçamento público.',
};

export default async function CursosPage() {
  const cursos = await getCursos();
  return <Screen html={cursosPageHtml(cursos)} />;
}
