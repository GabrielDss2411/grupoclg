// Visão geral do painel. Placeholder simples nesta etapa (T16); T18 preenche
// com contagens reais de cursos/congressos.
export default function AdminHomePage() {
  return (
    <div>
      <div style={{ fontSize: '12px', letterSpacing: '2.4px', fontWeight: 700, color: '#A89A6E' }}>
        VISÃO GERAL
      </div>
      <h1 style={{ fontWeight: 600, fontSize: '30px', color: '#0C1A57', margin: '10px 0 0' }}>
        Conteúdo do site
      </h1>
      <p style={{ fontSize: '15px', color: '#5A6180', margin: '10px 0 0', maxWidth: '520px', lineHeight: 1.55 }}>
        Gerencie os cursos e congressos exibidos no site. Alterações salvas aqui aparecem no site em
        até 60 segundos.
      </p>

      <div style={{ display: 'flex', gap: '16px', marginTop: '28px', flexWrap: 'wrap' }}>
        <a
          href="/admin/cursos"
          style={{
            display: 'block',
            minWidth: '220px',
            background: '#fff',
            border: '1px solid #e5e5ea',
            borderRadius: '16px',
            padding: '22px 24px',
            textDecoration: 'none',
          }}
          data-hv="card"
        >
          <div style={{ fontSize: '17px', fontWeight: 600, color: '#0C1A57' }}>Cursos</div>
          <p style={{ fontSize: '14px', color: '#5A6180', margin: '6px 0 0' }}>
            Ver, incluir e editar cursos.
          </p>
        </a>
        <a
          href="/admin/congressos"
          style={{
            display: 'block',
            minWidth: '220px',
            background: '#fff',
            border: '1px solid #e5e5ea',
            borderRadius: '16px',
            padding: '22px 24px',
            textDecoration: 'none',
          }}
          data-hv="card"
        >
          <div style={{ fontSize: '17px', fontWeight: 600, color: '#0C1A57' }}>Congressos</div>
          <p style={{ fontSize: '14px', color: '#5A6180', margin: '6px 0 0' }}>
            Ver, incluir e editar congressos e sua programação.
          </p>
        </a>
      </div>
    </div>
  );
}
