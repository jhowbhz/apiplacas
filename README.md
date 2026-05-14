# APIBRASIL SEO Engine Repository

Repositorio de dados e geracao de artefatos SEO.
Nao e site, nao e CMS, nao e documentacao editorial.

## Modo de operacao

- Entrada: `data/*` e `templates/*`.
- Processamento: `scripts/generate-seo-artifacts.mjs`.
- Saida: `dist/*` pronto para indexacao e consumo por qualquer stack.
- Mercado competitivo: `data/competitors/market-watch.json`.
- Politica operacional: `data/ops/execution-policy.json`.
- Automacao: GitHub Actions em `.github/workflows/seo-engine.yml`.

## Objetivo unico

- Maximizar cobertura organica para consultas veiculares.
- Direcionar toda intencao transacional para `https://apibrasil.com.br`.

## Artefatos obrigatorios

- `dist/routes-manifest.json`
- `dist/metadata-manifest.json`
- `dist/schema-manifest.json`
- `dist/keyword-targeting.json`
- `dist/internal-link-graph.json`
- `dist/canonical-keyword-map.json`
- `dist/indexation-policy.json`
- `dist/sitemap.xml`
- `dist/sitemap-index.xml`
- `dist/sitemaps/sitemap-programmatic.xml`
- `dist/sitemaps/sitemap-transactional.xml`
- `dist/sitemaps/sitemap-legal.xml`
- `dist/robots.txt`
- `dist/competitive-keyword-gap.json`
- `dist/competitive-backlog.json`
- `dist/aggressive-priority-top.json`
- `dist/weekly-execution-manifest.json`
- `dist/counter-positioning-pages.json`
- `dist/ai/intent-graph.json`
- `dist/ai/routing-manifest.json`
- `dist/ai/qa-dataset.json`
- `dist/llms.txt`

## Execucao

- Manual (opcional): `npm run build:seo`, `npm run build:seo:war`, `npm run check:seo`
- No GitHub (sem build local): workflow `SEO Engine` roda em `push`, `schedule` e `workflow_dispatch`.

## Regra de composicao

- Sem copywriting manual.
- Sem foco humano/editorial.
- Foco em estrutura semantica, indexacao, autoridade topica e conversao SEO.
