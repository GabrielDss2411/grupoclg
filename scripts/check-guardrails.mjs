#!/usr/bin/env node
/**
 * Guard rails do site Grupo CLG, versão Next.js (ver CLAUDE.md).
 * Uso: node scripts/check-guardrails.mjs
 * Sai com código 1 se alguma regra do design system / estrutura for violada.
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

const content = read('lib/content.js');
const css = read('app/base.css') + '\n' + read('app/globals.css');
const jsxFiles = ['app/layout.jsx', 'app/page.jsx', 'app/cursos/page.jsx', 'app/sobre/page.jsx', 'app/in-company/page.jsx', 'components/Navbar.jsx', 'components/Footer.jsx', 'components/Screen.jsx']
  .filter((p) => existsSync(join(root, p)));
const jsx = jsxFiles.map(read).join('\n');
const handlers = read('components/handlers.js');
const all = content + '\n' + css + '\n' + jsx;

const errors = [];

/* ---------------- 1. Paleta congelada ---------------- */
const PALETTE = new Set([
  '#070E33','#081142','#0A1236','#0A1440','#0A1442','#0C1A57','#12235F','#12285E',
  '#13275F','#15296B','#163A6B','#1A2C66','#1E2A66','#2A3252','#2A3F86','#3A4260',
  '#42496A','#5A6180','#5BD6A0','#666B78','#6E77A0','#767C8B','#7E88AE','#7FE0B0',
  '#8892B0','#8A8F9E','#8A90A6','#8A90A8','#8E9AC0','#9AA3C2','#9BA6C8','#A89A6E',
  '#AEB6D4','#B7C0DC','#B8C0DA','#C3CBE0','#C6CEE6','#C7C7CF','#C7CFE4','#C7D0EA',
  '#C9A227','#C9A876','#C9B26B','#D6D6DD','#D7DEF4','#D8C79A','#DCD8CB','#DCDCE1',
  '#E4E4EA','#E5E5EA','#E9C65A','#EAEFFA','#EDE3CF','#F0D171','#F5F5F7','#FFF','#FFFFFF',
]);
const hexes = all.match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g) ?? [];
const foreign = [...new Set(hexes.map((h) => h.toUpperCase()))].filter((h) => !PALETTE.has(h));
if (foreign.length) {
  errors.push(
    `Cores fora da paleta: ${foreign.join(', ')}. Use a paleta do CLAUDE.md ou, se a cor for uma decisão consciente de design, adicione-a ao allowlist deste script.`
  );
}

/* ---------------- 2. Tipografia ---------------- */
const FONT_OK =
  /^\s*(-apple-system|inherit|var\(--font-inter\)|'Inter'|'Newsreader'|'Hanken Grotesk'|'Schibsted Grotesk')/;
for (const m of all.matchAll(/font-family:\s*([^;"}\\]+)/g)) {
  if (!FONT_OK.test(m[1])) {
    errors.push(`font-family fora do stack aprovado: "${m[1].trim()}" (ver CLAUDE.md, seção Tipografia).`);
  }
}

/* ---------------- 3. Copy: sem travessões ---------------- */
const dashes = (content.match(/[—–]/g) ?? []).length;
if (dashes > 0) {
  errors.push(`${dashes} travessão(ões) (— ou –) em lib/content.js. A copy do site não usa travessões (commit e23dd32).`);
}

/* ---------------- 4. Seletores responsivos órfãos ---------------- */
// O CSS (app/base.css) casa substrings dos estilos inline de lib/content.js via [style*="..."].
// Se um valor inline mudar e o seletor não casar mais, o mobile quebra em silêncio.
const cssClean = css.replace(/:not\(\[style\*="[^"]+"\]\)/g, ''); // :not() não precisa casar
const needles = [...new Set([...cssClean.matchAll(/\[style\*="([^"]+)"\]/g)].map((m) => m[1]))];
const inlineStyles = [...content.matchAll(/style="([^"]*)"/g)].map((m) => m[1]);
// Órfãos pré-existentes (seletores defensivos ou sobras de iterações antigas). Não adicionar novos.
const KNOWN_ORPHANS = new Set([
  'Hanken',
  'border-radius:26px',
  'grid-column:span 2',
  'grid-row:span 2',
  'padding:60px 58px',
  'padding:48px 40px',
  'padding:44px 30px',
  'padding:96px 30px 34px',
  'padding:104px 30px 26px',
  'padding:84px 30px',
  'height:520px',
  'min-height:520px',
  'min-height:450px',
  'min-height:420px',
  'max-width:1040px',
  'max-width:880px',
  'max-width:800px',
  'max-width:760px',
  'padding:150px 30px 96px',
  'padding:100px 30px 40px',
  'padding:108px 30px 100px',
]);
for (const needle of needles) {
  if (!inlineStyles.some((s) => s.includes(needle)) && !KNOWN_ORPHANS.has(needle)) {
    errors.push(
      `Seletor responsivo órfão: [style*="${needle}"] (app/base.css) não casa com nenhum estilo inline de lib/content.js. ` +
        `Se você alterou um valor inline, atualize o seletor correspondente.`
    );
  }
}

/* ---------------- 5. Assets referenciados existem ---------------- */
for (const m of all.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) {
  if (!existsSync(join(root, 'public', m[1]))) {
    errors.push(`Asset referenciado não existe em public/: ${m[1]}`);
  }
}

/* ---------------- 6. Estrutura ---------------- */
for (const exp of ['home', 'cursos', 'sobre', 'incompany', 'navbar', 'footer']) {
  if (!new RegExp(`export const ${exp}\\b`).test(content)) {
    errors.push(`Estrutura quebrada: export "${exp}" não encontrado em lib/content.js.`);
  }
}
for (const route of ['home', 'cursos', 'incompany', 'sobre']) {
  if (!new RegExp(`${route}:\\s*'`).test(handlers)) {
    errors.push(`Estrutura quebrada: rota "${route}" não encontrada em ROUTES (components/handlers.js).`);
  }
}
if (!content.includes('Ver turmas abertas')) {
  errors.push('Estrutura quebrada: CTA principal "Ver turmas abertas" não encontrado em lib/content.js.');
}
if (!/prefers-reduced-motion/.test(css) || !/prefers-reduced-motion/.test(read('lib/animations.js'))) {
  errors.push('Estrutura quebrada: suporte a prefers-reduced-motion removido (app/base.css / lib/animations.js).');
}

/* ---------------- resultado ---------------- */
if (errors.length) {
  console.error(`Guard rails: ${errors.length} violação(ões):\n`);
  for (const e of errors) console.error(` - ${e}`);
  console.error('\nRegras completas: CLAUDE.md');
  process.exit(1);
}
console.log(`Guard rails OK (${needles.length} seletores responsivos, ${hexes.length} usos de cor, paleta e estrutura íntegras).`);
