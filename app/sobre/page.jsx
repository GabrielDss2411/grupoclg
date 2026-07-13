import Screen from '@/components/Screen';
import { sobre } from '@/lib/content';

export const metadata = {
  title: 'Sobre',
  description:
    'Capacitação de alto nível em contratação pública ao alcance de quem serve o público. Conheça o Grupo CLG e a coordenação de Bruno Verzani.',
};

export default function SobrePage() {
  return <Screen html={sobre} />;
}
