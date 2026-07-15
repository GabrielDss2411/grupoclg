import './globals.css';
import './base.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata = {
  metadataBase: new URL('https://grupoclg.com.br'),
  title: {
    default: 'Grupo CLG · Capacitação em Licitações, Contratos e Gestão Pública',
    template: '%s · Grupo CLG',
  },
  description:
    'Capacitação de alto nível em Licitações, Contratos, Direito Financeiro e Gestão Pública para servidores, gestores e advogados. Coordenação de Bruno Verzani, Procurador do Estado do Rio de Janeiro.',
  openGraph: {
    title: 'Grupo CLG · Capacitação em Licitações e Gestão Pública',
    description:
      'Formação prática ancorada na jurisprudência do TCU para quem atua no setor público.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
