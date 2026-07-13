// Guarda de sessão do painel (spec P1-A/1): sem sessão, qualquer rota sob
// /admin mostra só a tela de login, nenhum dado administrativo. Com sessão,
// renderiza a navegação (AdminNav, client component) + o conteúdo da rota.
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server-actions';
import AdminNav from './AdminNav';

export const metadata = {
  title: 'Painel administrativo',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '/admin';
  const isLoginPage = pathname === '/admin/login';

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isLoginPage) redirect('/admin/login');
  if (user && isLoginPage) redirect('/admin');

  if (isLoginPage) {
    return <div style={{ minHeight: '100vh', background: '#f5f5f7' }}>{children}</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f7' }}>
      <AdminNav />
      <main style={{ maxWidth: '1160px', margin: '0 auto', padding: '32px 30px 90px' }}>{children}</main>
    </div>
  );
}
