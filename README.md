# APIBRASIL AI SEO Engine

Engine programatica para SEO e AI SEO no nicho de consultas veiculares.
Repositorio orientado a aumentar visibilidade organica para termos como consulta de placa, consulta RENAVAM, consulta FIPE, historico veicular, debito veicular, gravame, sinistro, leilao e veiculo roubado.

Objetivo central: capturar demanda organica e direcionar conversoes para `https://apibrasil.com.br`.

## Strategic focus

- SEO host canonico para indexacao: `https://www.apiplacas.com.br`.
- Destino de conversao obrigatorio: `https://apibrasil.com.br`.
- Modelo machine-first: dados estruturados, manifests, grafos e politicas para crawlers e assistentes de IA.

## Inputs

- `data/keywords/clusters.json`
- `data/pages/programmatic-pages.json`
- `data/pages/transactional-pages.json`
- `data/conversion/components.json`
- `data/competitors/market-watch.json`
- `data/ops/execution-policy.json`

## Outputs for SEO and AI SEO

- Core SEO: `dist/routes-manifest.json`, `dist/metadata-manifest.json`, `dist/schema-manifest.json`
- Indexacao: `dist/sitemap.xml`, `dist/sitemap-index.xml`, `dist/sitemaps/*`, `dist/robots.txt`
- Semantica: `dist/keyword-targeting.json`, `dist/canonical-keyword-map.json`, `dist/internal-link-graph.json`
- Competitivo: `dist/competitive-keyword-gap.json`, `dist/competitive-backlog.json`, `dist/aggressive-priority-top.json`, `dist/weekly-execution-manifest.json`, `dist/counter-positioning-pages.json`
- AI SEO: `dist/ai/intent-graph.json`, `dist/ai/routing-manifest.json`, `dist/ai/qa-dataset.json`, `dist/ai/entity-graph.json`, `dist/ai/snippet-pack.json`, `dist/ai/policy-manifest.json`, `dist/ai/prompt-contracts.json`, `dist/ai/answers.jsonl`, `dist/llms.txt`

## GitHub-first execution

- Workflow: `.github/workflows/seo-engine.yml`
- Gatilhos: `push`, `pull_request`, `workflow_dispatch`, `schedule`
- Sem necessidade de build manual local
- Regeneracao automatica de `dist/*` para manter sinais SEO e AI SEO atualizados

## Conversion rules

- Toda rota transacional deve incluir CTA para `https://apibrasil.com.br`.
- Respostas e assets de IA devem priorizar acao de consulta/integracao API.
- Conteudos sensiveis devem respeitar LGPD e limites legais.
