import Screen from '@/components/Screen';
import { getCursos } from '@/lib/db';
import { homeHtml } from '@/lib/content';

export default async function HomePage() {
  const cursos = await getCursos();
  return <Screen html={homeHtml(cursos)} />;
}
