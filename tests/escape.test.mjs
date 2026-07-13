import { describe, it, expect } from 'vitest';
import { escapeHtml } from '../lib/escape.js';

// Derived from spec.md Edge Cases: "WHEN um texto contém caracteres HTML (<, >, &)
// THEN o site SHALL renderizá-los como texto (escapado), nunca como markup."

describe('escapeHtml', () => {
  it('escapes a full script tag so it cannot execute as markup', () => {
    const result = escapeHtml('<script>alert(1)</script>');
    expect(result).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(result).not.toContain('<script>');
  });

  it('escapes an isolated ampersand', () => {
    expect(escapeHtml('Fulano & Cia')).toBe('Fulano &amp; Cia');
  });

  it('escapes double quotes', () => {
    expect(escapeHtml('ele disse "oi"')).toBe('ele disse &quot;oi&quot;');
  });

  it('escapes single quotes', () => {
    expect(escapeHtml("curso do fulano's")).toBe('curso do fulano&#39;s');
  });

  it('preserves PT-BR accents and punctuation unchanged (not a unicode-escape)', () => {
    const text = 'Licitações, Contratos e Gestão Pública: já é referência técnica.';
    expect(escapeHtml(text)).toBe(text);
  });

  it('returns empty string for null', () => {
    expect(escapeHtml(null)).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(escapeHtml(undefined)).toBe('');
  });
});
