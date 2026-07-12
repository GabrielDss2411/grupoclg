#!/usr/bin/env node
/**
 * Guard rails do site Grupo CLG (ver CLAUDE.md).
 * Uso: node scripts/check-guardrails.mjs
 * Sai com código 1 se alguma regra do design system / estrutura for violada.
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = process.argv[2] ?? join(root, 'index.html');
const html = readFileSync(htmlPath, 'utf8');

const errors = [];
const warnings = [];

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
const hexes = html.match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g) ?? [];
const foreign = [...new Set(hexes.map((h) => h.toUpperCase()))].filter((h) => !PALETTE.has(h));
if (foreign.length) {
  errors.push(
    `Cores fora da paleta: ${foreign.join(', ')}. Use a paleta do CLAUDE.md ou, se a cor for uma decisão consciente de design, adicione-a ao allowlist deste script.`
  );
}

/* ---------------- 2. Tipografia ---------------- */
const FONT_OK =
  /^\s*(-apple-system|inherit|'Inter'|'Newsreader'|'Hanken Grotesk'|'Schibsted Grotesk')/;
for (const m of html.matchAll(/font-family:\s*([^;"}]+)/g)) {
  if (!FONT_OK.test(m[1])) {
    errors.push(`font-family fora do stack aprovado: "${m[1].trim()}" (ver CLAUDE.md, seção Tipografia).`);
  }
}

/* ---------------- 3. Copy: sem travessões ---------------- */
const dashes = (html.match(/[—–]/g) ?? []).length;
if (dashes > 0) {
  errors.push(`${dashes} travessão(ões) (— ou –) encontrados. A copy do site não usa travessões (commit e23dd32).`);
}

/* ---------------- 4. Seletores responsivos órfãos ---------------- */
// O bloco responsivo casa substrings de estilos inline: [style*="..."].
// Se um valor inline mudar e o seletor não casar mais, o mobile quebra em silêncio.
const styleBlocks = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
const css = styleBlocks.join('\n').replace(/:not\(\[style\*="[^"]+"\]\)/g, ''); // :not() não precisa casar
const needles = [...new Set([...css.matchAll(/\[style\*="([^"]+)"\]/g)].map((m) => m[1]))];
const inlineStyles = [...html.matchAll(/style="([^"]*)"/g)].map((m) => m[1]);
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
      `Seletor responsivo órfão: [style*="${needle}"] não casa com nenhum estilo inline. ` +
        `Se você alterou um valor inline, atualize o seletor correspondente no bloco <style> responsivo.`
    );
  }
}

/* ---------------- 5. Assets referenciados existem ---------------- */
for (const m of html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)) {
  if (!existsSync(join(root, m[1]))) {
    errors.push(`Asset referenciado não existe: ${m[1]}`);
  }
}

/* ---------------- 6. Estrutura da SPA ---------------- */
const REQUIRED = [
  ['class Component extends DCLogic', 'runtime da SPA (script text/x-dc)'],
  ['assets/gsap.min.js', 'GSAP'],
  ['gsap-ready', 'failsafe de animação do hero'],
  ['prefers-reduced-motion', 'suporte a movimento reduzido'],
  ['Ver turmas abertas', 'CTA principal do site'],
];
for (const key of ['isHome', 'isCursos', 'isCurso', 'isCongressos', 'isCongresso', 'isSobre', 'isInCompany', 'isCapacitacao', 'isTreinamentos', 'goHome', 'goCursos', 'goCurso', 'goCongressos', 'goCongresso', 'goSobre', 'goInCompany']) {
  REQUIRED.push([`${key}:`, `tela/navegação "${key}" no renderVals`]);
}
for (const [needle, label] of REQUIRED) {
  if (!html.includes(needle)) {
    errors.push(`Estrutura quebrada: ${label} ("${needle}") não encontrado no index.html.`);
  }
}
if ((html.match(/<style/g) ?? []).length < 2) {
  errors.push('Estrutura quebrada: esperados 2 blocos <style> (fontes + design system/responsivo).');
}

/* ---------------- resultado ---------------- */
for (const w of warnings) console.warn(`AVISO: ${w}`);
if (errors.length) {
  console.error(`Guard rails: ${errors.length} violação(ões) em index.html:\n`);
  for (const e of errors) console.error(` - ${e}`);
  console.error('\nRegras completas: CLAUDE.md');
  process.exit(1);
}
console.log(`Guard rails OK (${needles.length} seletores responsivos, ${hexes.length} usos de cor, paleta e estrutura íntegras).`);
