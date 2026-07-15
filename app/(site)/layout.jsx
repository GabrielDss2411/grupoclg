// Layout do site público (route group): navbar/footer institucionais.
// Isolado do root layout para que /admin/** (fora deste grupo) não herde a
// navegação pública — ver .specs/features/painel-adm/tasks.md, Phase 4 fix.
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SiteLayout({ children }) {
  return (
    <div style={{ overflowX: 'hidden', background: '#ffffff' }}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
