'use client';
// Sidebar retrátil do painel: colapsa para uma trilha de ícones (com tooltip)
// ou expande com rótulos e submenus. Estado de colapso persiste em
// localStorage. Client component porque controla estado e o logout chama
// supabase.auth.signOut() (o layout que a usa é Server Component).
import { useEffect, useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
const IconGrid = (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>);
const IconBook = (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2z" /><path d="M4 18.5A1.5 1.5 0 0 1 5.5 17H20" /></svg>);
const IconCalendar = (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v3M16 3v3" /></svg>);
const IconArtigo = (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="M6 3.5h9l3 3v14H6z" /><path d="M15 3.5V6.5h3" /><path d="M9 11h6M9 14.5h6M9 18h4" /></svg>);
const IconInscricao = (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="M5 4.5h14v15H5z" /><path d="M8.5 9.5l2.5 2.5 4.5-4.5" /><path d="M8.5 15.5h7" /></svg>);
const IconChevron = (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="M9 6l6 6-6 6" /></svg>);
const IconLogout = (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="M15 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" /><path d="M10 17l-5-5 5-5M15 12H5" /></svg>);
const IconPanel = (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16" /></svg>);

const NAV = [
  { href: '/admin', label: 'Visão geral', Icon: IconGrid },
  {
    href: '/admin/cursos', label: 'Cursos', Icon: IconBook,
    sub: [{ href: '/admin/cursos', label: 'Todos os cursos' }, { href: '/admin/cursos/novo', label: 'Novo curso' }],
  },
  {
    href: '/admin/congressos', label: 'Congressos', Icon: IconCalendar,
    sub: [{ href: '/admin/congressos', label: 'Agenda' }, { href: '/admin/congressos/novo', label: 'Novo congresso' }],
  },
  {
    href: '/admin/artigos', label: 'Artigos', Icon: IconArtigo,
    sub: [{ href: '/admin/artigos', label: 'Todos os artigos' }, { href: '/admin/artigos/novo', label: 'Novo artigo' }],
  },
  { href: '/admin/inscricoes', label: 'Inscrições', Icon: IconInscricao },
];

const matches = (pathname, href) =>
  href === '/admin' ? pathname === '/admin' : pathname === href || pathname.startsWith(href + '/');

export default function AdminNav({ userEmail = '' }) {
  const router = useRouter();
  const pathname = usePathname() ?? '/admin';
  const [pending, startTransition] = useTransition();
  const [signingOut, setSigningOut] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openKey, setOpenKey] = useState(null);

  // Restaura preferência de colapso e abre o submenu da rota atual.
  useEffect(() => {
    setCollapsed(localStorage.getItem('adm:collapsed') === '1');
  }, []);
  useEffect(() => {
    const active = NAV.find((n) => n.sub && matches(pathname, n.href));
    if (active) setOpenKey(active.href);
  }, [pathname]);

  function toggleCollapse() {
    setCollapsed((c) => {
      const next = !c;
      localStorage.setItem('adm:collapsed', next ? '1' : '0');
      return next;
    });
  }

  function sair() {
    setSigningOut(true);
    startTransition(async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/admin/login');
      router.refresh();
    });
  }

  const inicial = (userEmail.trim()[0] || 'A').toUpperCase();

  return (
    <aside className={`adm-sidebar${collapsed ? ' is-collapsed' : ''}`}>
      <div className="adm-sidebar-head">
        <div className="adm-brand">
          <img className="adm-brand-logo" src="/assets/logo-grupoclg.png" alt="Grupo CLG" />
          <div className="adm-brand-mark">CLG</div>
        </div>
        <button
          type="button"
          className="adm-collapse-btn"
          onClick={toggleCollapse}
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
          title={collapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          <IconPanel />
        </button>
      </div>

      <div className="adm-nav-label">GERENCIAR</div>

      {NAV.map(({ href, label, Icon, sub }) => {
        const active = matches(pathname, href);
        const isOpen = openKey === href;
        return (
          <div key={href} className={`adm-navitem${isOpen ? ' is-open' : ''}`}>
            {sub ? (
              <button
                type="button"
                className={`adm-link${active ? ' is-active' : ''}`}
                onClick={() => (collapsed ? router.push(href) : setOpenKey(isOpen ? null : href))}
              >
                <Icon className="adm-ico" />
                <span className="adm-link-label">{label}</span>
                <IconChevron className="adm-chevron" />
              </button>
            ) : (
              <a href={href} className={`adm-link${active ? ' is-active' : ''}`}>
                <Icon className="adm-ico" />
                <span className="adm-link-label">{label}</span>
              </a>
            )}
            <span className="adm-tip">{label}</span>

            {sub ? (
              <div className="adm-sub">
                <div className="adm-sub-inner">
                  {sub.map((it) => (
                    <a
                      key={it.href + it.label}
                      href={it.href}
                      className={`adm-sublink${pathname === it.href ? ' is-active' : ''}`}
                    >
                      {it.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}

      <div className="adm-sidebar-foot">
        <div className="adm-divider" />
        <div className="adm-user">
          <div className="adm-user-avatar">{inicial}</div>
          <div className="adm-user-text" style={{ minWidth: 0 }}>
            <div className="adm-user-name">Administrador</div>
            {userEmail ? <div className="adm-user-mail">{userEmail}</div> : null}
          </div>
        </div>
        <button type="button" className="adm-signout" onClick={sair} disabled={pending || signingOut}>
          <IconLogout />
          <span>{pending || signingOut ? 'Saindo…' : 'Sair'}</span>
        </button>
      </div>
    </aside>
  );
}
