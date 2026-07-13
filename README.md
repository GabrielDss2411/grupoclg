# Grupo CLG — Site (Next.js)

Site institucional do **Grupo CLG** — capacitação em Licitações, Contratos, Direito Financeiro e Gestão Pública.

Migrado de HTML estático para **Next.js (App Router)** com renderização estática (SSG), rotas reais e fontes otimizadas.

## Stack
- **Next.js 15** (App Router) — páginas pré-renderizadas (SSG)
- **React 19**
- **GSAP** — animações (entrada do hero, revelações no scroll, trilha, hover, barra fixa)
- **next/font** — Inter otimizada

## Rotas
- `/` — Home
- `/cursos` — Cursos
- `/in-company` — In Company
- `/sobre` — Sobre

## Desenvolvimento
```bash
npm install
npm run dev      # http://localhost:3000
```

## Build / produção
```bash
npm run build
npm run start
```

## Estrutura
```
app/            rotas (page.jsx por seção) + layout + CSS global
components/     Navbar, Footer, Screen (render + interações)
lib/            content.js (conteúdo das telas) + animations.js (GSAP)
public/assets/  imagens e posters dos cursos
```

## Deploy
Deploy na **Vercel** (detecção automática de Next.js — sem configuração adicional).

> Observação: números, datas de turmas, vagas e preços presentes no site são **placeholders** e devem ser substituídos pelos dados reais antes da divulgação.
