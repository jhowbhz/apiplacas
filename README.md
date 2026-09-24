<div align="center">

# 🚗 apiplacas

**Valide, converta e extraia placas de veículos brasileiras — antiga e Mercosul — em uma linha de código.**

Zero dependências · Node, Bun, Deno e navegador · 100% testado

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Zero deps](https://img.shields.io/badge/dependencies-0-blue.svg)](lib/placa.mjs)
[![GitHub stars](https://img.shields.io/github/stars/jhowbhz/apiplacas?style=social)](https://github.com/jhowbhz/apiplacas/stargazers)

[Uso rápido](#-uso-rápido) · [API](#-api) · [Consultar dados do veículo](#-precisa-dos-dados-do-veículo) · [Contribuir](#-contribuindo)

</div>

---

```js
import { validar, paraMercosul, extrair } from './lib/placa.mjs';

validar('ABC-1234');        // true
paraMercosul('ABC-1234');   // 'ABC1C34'
extrair('Vi o carro BRA2E19 e o ABC-1234 no estacionamento');
// ['BRA2E19', 'ABC1234']
```

## ✨ Por que usar

- **Os dois padrões**: placa antiga (`ABC-1234`) e Mercosul (`ABC1D23`).
- **Conversão ida e volta** seguindo a regra oficial (0→A, 1→B … 9→J no 5º caractere).
- **Extração de texto livre**: ideal para OCR, logs, WhatsApp e formulários bagunçados.
- **Zero dependências** e um único arquivo: copie `lib/placa.mjs` para o seu projeto e pronto.

## ⚡ Uso rápido

```bash
git clone https://github.com/jhowbhz/apiplacas
cd apiplacas && npm test
```

Ou apenas copie [`lib/placa.mjs`](lib/placa.mjs) para o seu projeto.

## 📖 API

| Função | Exemplo | Retorno |
|---|---|---|
| `normalizar(placa)` | `normalizar(' abc-1d23 ')` | `'ABC1D23'` |
| `tipo(placa)` | `tipo('ABC1D23')` | `'mercosul'` \| `'antiga'` \| `null` |
| `validar(placa)` | `validar('ABC-1234')` | `true` |
| `paraMercosul(placa)` | `paraMercosul('ABC1234')` | `'ABC1C34'` |
| `paraAntiga(placa)` | `paraAntiga('ABC1C34')` | `'ABC1234'` |
| `formatar(placa)` | `formatar('abc1234')` | `'ABC-1234'` |
| `extrair(texto)` | `extrair('placa ABC-1234')` | `['ABC1234']` |

Entradas inválidas geram `TypeError`; placas Mercosul sem equivalente antigo (5º caractere após `J`) geram `RangeError`.

## 🔎 Precisa dos dados do veículo?

Validar o formato é só o começo. Para descobrir **modelo, ano, cor, FIPE, RENAVAM, débitos, gravame, sinistro, leilão e restrição de roubo/furto** a partir da placa, use a API de consultas veiculares da **[APIBrasil](https://apibrasil.com.br)**.

```js
import { validar, normalizar } from './lib/placa.mjs';

const placa = normalizar(input);
if (!validar(placa)) throw new Error('Placa inválida');
// Só chama a API com placas válidas e economiza requisições.
// Documentação e chave de acesso: https://apibrasil.com.br
```

> Consultas de dados veiculares devem respeitar a LGPD e os termos de uso do provedor.

## 🤝 Contribuindo

PRs são bem-vindos! Ideias abertas:

- [ ] Placas especiais (diplomáticas, coleção, oficiais)
- [ ] Identificar o estado de emplacamento pelas letras (padrão antigo)
- [ ] Pacote no npm e versão TypeScript com tipos
- [ ] Portes para Python, PHP e Go

Rode `npm test` antes de abrir o PR.

## ⭐ Gostou?

Deixe uma estrela — isso ajuda outros devs brasileiros a encontrarem o projeto.

---

<sub>Mantido por [@jhowbhz](https://github.com/jhowbhz) · A engine de SEO que também vive neste repositório está documentada em [docs/seo-engine.md](docs/seo-engine.md). · Licença [MIT](LICENSE)</sub>
