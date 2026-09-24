/**
 * placa.mjs — validador e conversor de placas brasileiras (antiga e Mercosul).
 * Zero dependencias. Funciona em Node, Deno, Bun e navegador.
 *
 * Precisa dos DADOS do veiculo (modelo, FIPE, RENAVAM, debitos)?
 * Use a API de consultas veiculares da APIBrasil: https://apibrasil.com.br
 */

const ANTIGA = /^[A-Z]{3}[0-9]{4}$/;
const MERCOSUL = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
const LETRAS = 'ABCDEFGHIJ';

/** Remove espacos, hifens e pontos e deixa em maiusculas. "abc-1d23" -> "ABC1D23" */
export function normalizar(placa) {
  return String(placa ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

/** Retorna "antiga", "mercosul" ou null se a placa for invalida. */
export function tipo(placa) {
  const p = normalizar(placa);
  if (ANTIGA.test(p)) return 'antiga';
  if (MERCOSUL.test(p)) return 'mercosul';
  return null;
}

/** true se a placa for valida em qualquer um dos padroes. */
export function validar(placa) {
  return tipo(placa) !== null;
}

/** Converte placa antiga para Mercosul. "ABC1234" -> "ABC1C34" */
export function paraMercosul(placa) {
  const p = normalizar(placa);
  if (MERCOSUL.test(p)) return p;
  if (!ANTIGA.test(p)) throw new TypeError(`Placa invalida: ${placa}`);
  return p.slice(0, 4) + LETRAS[Number(p[4])] + p.slice(5);
}

/** Converte placa Mercosul para o padrao antigo. "ABC1C34" -> "ABC1234" */
export function paraAntiga(placa) {
  const p = normalizar(placa);
  if (ANTIGA.test(p)) return p;
  if (!MERCOSUL.test(p)) throw new TypeError(`Placa invalida: ${placa}`);
  const idx = LETRAS.indexOf(p[4]);
  if (idx === -1) throw new RangeError(`Placa Mercosul sem equivalente antigo: ${placa}`);
  return p.slice(0, 4) + idx + p.slice(5);
}

/** Formata para exibicao. Antiga: "ABC-1234". Mercosul: "ABC1D23". */
export function formatar(placa) {
  const p = normalizar(placa);
  const t = tipo(p);
  if (t === 'antiga') return `${p.slice(0, 3)}-${p.slice(3)}`;
  if (t === 'mercosul') return p;
  throw new TypeError(`Placa invalida: ${placa}`);
}

/** Encontra todas as placas em um texto livre (OCR, logs, mensagens). */
export function extrair(texto) {
  const re = /\b[A-Z]{3}-?[0-9][A-Z0-9][0-9]{2}\b/gi;
  return [...String(texto ?? '').matchAll(re)]
    .map((m) => normalizar(m[0]))
    .filter(validar);
}

export default { normalizar, tipo, validar, paraMercosul, paraAntiga, formatar, extrair };
