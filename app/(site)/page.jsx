import Screen from '@/components/Screen';
import HeroIntro from '@/components/HeroIntro';
import { getCursos, seguroNoBuild } from '@/lib/db';
import { homeHtml } from '@/lib/content';

export default async function HomePage() {
  const cursos = await seguroNoBuild(getCursos(), []);
  return (
    <>
      <HeroIntro />
      <Screen html={homeHtml(cursos)} />
    </>
  );
}
