# SEO Engine Spec

## Scope

- Engine de indexacao para buscas veiculares.
- Modelo data-driven para geracao de sinais SEO.
- Saida orientada a crawler e ranking system.

## Input Contract

- `data/keywords/clusters.json`: cluster, intent, termos principais e long-tail.
- `data/pages/programmatic-pages.json`: rotas de captura por consulta.
- `data/pages/transactional-pages.json`: rotas comerciais de conversao.
- `data/conversion/components.json`: destinos de CTA e eventos.
- `data/competitors/market-watch.json`: monitoramento de dominios concorrentes e keywords observadas.
- `data/ops/execution-policy.json`: parametros de cadencia semanal em modo agressivo.

## Output Contract

- `dist/routes-manifest.json`: inventario completo de URLs.
- `dist/metadata-manifest.json`: title, description, canonical, robots.
- `dist/schema-manifest.json`: JSON-LD por rota e entidades globais.
- `dist/keyword-targeting.json`: mapeamento URL -> cluster -> termos alvo.
- `dist/internal-link-graph.json`: arestas de linking interno por afinidade semantica.
- `dist/canonical-keyword-map.json`: keyword -> rota canonica e colisoes.
- `dist/indexation-policy.json`: regras de indexacao por rota/intencao/sensibilidade.
- `dist/freshness-queue.json`: fila de atualizacao por score de obsolescencia.
- `dist/topical-authority-score.json`: score de autoridade por cluster semantico.
- `dist/sitemap.xml`: URLs indexaveis.
- `dist/sitemap-index.xml`: agregador de sitemaps segmentados.
- `dist/sitemaps/sitemap-programmatic.xml`: cobertura de rotas programaticas.
- `dist/sitemaps/sitemap-transactional.xml`: cobertura de rotas transacionais.
- `dist/sitemaps/sitemap-legal.xml`: cobertura de rotas sensiveis.
- `dist/robots.txt`: politicas de rastreio e endpoint de sitemap.
- `dist/competitive-keyword-gap.json`: lacunas de keyword vs concorrentes.
- `dist/competitive-backlog.json`: backlog priorizado por oportunidade competitiva.
- `dist/aggressive-priority-top.json`: top de ataque por score de oportunidade.
- `dist/weekly-execution-manifest.json`: plano semanal de execucao agressiva.
- `dist/counter-positioning-pages.json`: paginas sugeridas de comparativo competitivo.
- `dist/ai/intent-graph.json`: grafo de intencoes para orquestracao de IA.
- `dist/ai/routing-manifest.json`: diretrizes de roteamento de respostas para IA.
- `dist/ai/qa-dataset.json`: dataset base de perguntas e respostas por rota.
- `dist/ai/entity-graph.json`: entidades, aliases e relacoes semanticas.
- `dist/ai/snippet-pack.json`: respostas curtas citaveis para assistentes.
- `dist/ai/policy-manifest.json`: regras de resposta, conversao e compliance.
- `dist/ai/prompt-contracts.json`: contratos de prompt por rota/intencao.
- `dist/ai/answers.jsonl`: feed JSONL para pipelines de ingestao RAG/LLM.
- `dist/ai/answers.ndjson`: alias de ingestao para ferramentas NDJSON.
- `dist/ai/citation-bundle.json`: pacote de citacoes e confianca por rota.
- `dist/ai/conversion-directives.json`: regras de CTA obrigatorio para APIBRASIL.
- `dist/ai/agent-instructions.json`: instrucoes operacionais para agentes de IA.
- `dist/ai/feed-index.json`: indice unico de todos os feeds de IA.
- `dist/llms.txt`: instrucoes para agentes e indexadores baseados em IA.

## Automation

- Workflow GitHub: `.github/workflows/seo-engine.yml`.
- Build e validacao automaticos em `push`, `pull_request`, `workflow_dispatch` e agenda semanal.
- Commit automatico de `dist/*` em eventos fora de PR.
- AI Quality Gate no CI valida CTA/source/updatedAt dos feeds de IA.
- Ping IndexNow automatico quando `INDEXNOW_KEY` estiver configurada.

## Constraints

- Zero dependencia de frontend.
- Zero dependencia de linguagem natural manual.
- Estrutura pronta para SSR, SSG ou render dinamico em camada externa.

## Compliance

- Cluster `proprietario-por-placa` requer base legal, minimizacao e auditoria.
