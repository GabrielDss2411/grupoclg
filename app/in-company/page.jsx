import Screen from '@/components/Screen';
import { incompany } from '@/lib/content';

export const metadata = {
  title: 'In Company',
  description:
    'Treinamento In Company sob medida em contratação pública para a sua equipe: presencial, online ou híbrido, conduzido por especialistas que atuam no setor público.',
};

export default function InCompanyPage() {
  return <Screen html={incompany} />;
}
