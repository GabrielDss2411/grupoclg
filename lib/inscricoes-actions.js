'use server';
// Server Action pública (sem sessão) que recebe a ficha de inscrição em
// cursos/congressos. Usa o client anon (lib/supabase/server.js) -- RLS
// restringe esse client a INSERT (nunca SELECT), então visitantes não
// conseguem ler as inscrições de outras pessoas pela mesma chave pública.
import { createClient } from './supabase/server.js';

const ERRO_BANCO = 'Não foi possível enviar sua inscrição. Tente novamente.';
const ERRO_OBRIGATORIOS = 'Preencha os campos obrigatórios.';
const MAX_NOME = 200;
const MAX_OBSERVACOES = 1000;

function str(formData, name, fallback = '') {
  const v = formData.get(name);
  return v === null || v === undefined ? fallback : String(v).trim();
}

function digitsOnly(v) {
  return String(v || '').replace(/\D/g, '');
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// Algoritmo padrão de validação de dígitos verificadores do CPF.
function isValidCpf(v) {
  const cpf = digitsOnly(v);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += Number(cpf[i]) * (10 - i);
  let d1 = 11 - (soma % 11);
  if (d1 >= 10) d1 = 0;
  if (d1 !== Number(cpf[9])) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += Number(cpf[i]) * (11 - i);
  let d2 = 11 - (soma % 11);
  if (d2 >= 10) d2 = 0;
  return d2 === Number(cpf[10]);
}

function validar({ tipo, itemId, itemTitulo, nome, email, telefone, cpf }) {
  const fields = [];
  if ((tipo !== 'curso' && tipo !== 'congresso') || !itemId || !itemTitulo) {
    return { ok: false, error: 'Não foi possível identificar o curso/congresso da inscrição.', fields: [] };
  }
  if (!nome) fields.push('nome');
  if (!email || !isValidEmail(email)) fields.push('email');
  if (digitsOnly(telefone).length < 10) fields.push('telefone');
  if (!isValidCpf(cpf)) fields.push('cpf');
  if (fields.length) return { ok: false, error: ERRO_OBRIGATORIOS, fields };
  if (nome.length > MAX_NOME) {
    return { ok: false, error: `Nome deve ter no máximo ${MAX_NOME} caracteres.`, fields: ['nome'] };
  }
  return null;
}

export async function criarInscricao(formData) {
  const tipo = str(formData, 'tipo');
  const itemId = str(formData, 'item_id');
  const itemTitulo = str(formData, 'item_titulo');
  const nome = str(formData, 'nome');
  const email = str(formData, 'email');
  const telefone = str(formData, 'telefone');
  const cpf = str(formData, 'cpf');
  const observacoes = str(formData, 'observacoes').slice(0, MAX_OBSERVACOES);

  const invalido = validar({ tipo, itemId, itemTitulo, nome, email, telefone, cpf });
  if (invalido) return invalido;

  const payload = {
    item_titulo: itemTitulo,
    nome,
    email,
    telefone,
    cpf: digitsOnly(cpf),
    observacoes: observacoes || null,
    [tipo === 'curso' ? 'curso_id' : 'congresso_id']: itemId,
  };

  try {
    const supabase = createClient();
    const { error } = await supabase.from('inscricoes').insert(payload);
    if (error) return { ok: false, error: ERRO_BANCO };
    return { ok: true };
  } catch {
    return { ok: false, error: ERRO_BANCO };
  }
}
