import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizar, tipo, validar, paraMercosul, paraAntiga, formatar, extrair } from './placa.mjs';

test('normalizar', () => {
  assert.equal(normalizar(' abc-1d23 '), 'ABC1D23');
});

test('tipo e validar', () => {
  assert.equal(tipo('ABC-1234'), 'antiga');
  assert.equal(tipo('ABC1D23'), 'mercosul');
  assert.equal(tipo('AB12345'), null);
  assert.equal(validar('ABC1D23'), true);
  assert.equal(validar(''), false);
});

test('conversao ida e volta', () => {
  assert.equal(paraMercosul('ABC-1234'), 'ABC1C34');
  assert.equal(paraMercosul('XYZ9099'), 'XYZ9A99');
  assert.equal(paraAntiga('ABC1C34'), 'ABC1234');
  for (let d = 0; d <= 9; d++) {
    const p = `QWE1${d}23`;
    assert.equal(paraAntiga(paraMercosul(p)), p);
  }
  assert.throws(() => paraAntiga('ABC1K23'), RangeError);
  assert.throws(() => paraMercosul('invalida'), TypeError);
});

test('formatar', () => {
  assert.equal(formatar('abc1234'), 'ABC-1234');
  assert.equal(formatar('abc1d23'), 'ABC1D23');
});

test('extrair de texto livre', () => {
  assert.deepEqual(extrair('Carro ABC-1234 e moto BRA2E19, codigo 12345'), ['ABC1234', 'BRA2E19']);
});
