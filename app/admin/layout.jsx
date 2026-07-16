// Guarda de sessão do painel (spec P1-A/1): sem sessão, qualquer rota sob
// /admin mostra só a tela de login, nenhum dado administrativo. Com sessão,
// renderiza a navegação (AdminNav, client component) + o conteúdo da rota.
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server-actions';
import AdminNav from './AdminNav';
import './admin.css';

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
    return <div className="adm adm-auth">{children}</div>;
  }

  return (
    <div className="adm">
      <AdminNav userEmail={user?.email ?? ''} />
      <div className="adm-main">
        <div className="adm-topbar">
          <div className="adm-topbar-title">
            Painel <b>Grupo CLG</b> · gestão de conteúdo do site
          </div>
          <div className="adm-topbar-actions">
            <a href="/" target="_blank" rel="noopener" className="adm-ext-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 3h7v7M21 3l-9 9M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
              </svg>
              Ver site
            </a>
          </div>
        </div>
        <main className="adm-content">{children}</main>
      </div>
    </div>
  );
}
