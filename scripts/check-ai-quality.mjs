import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const readJson = async (relativePath) => {
  const raw = await fs.readFile(path.join(rootDir, relativePath), "utf-8");
  return JSON.parse(raw);
};

const readJsonl = async (relativePath) => {
  const raw = await fs.readFile(path.join(rootDir, relativePath), "utf-8");
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
};

const assert = (condition, message, errors) => {
  if (!condition) {
    errors.push(message);
  }
};

const main = async () => {
  const config = await readJson("seo-repo.config.json");
  const targetDomain = config.targetDomain;

  const qaDataset = await readJson("dist/ai/qa-dataset.json");
  const snippets = await readJson("dist/ai/snippet-pack.json");
  const conversionDirectives = await readJson("dist/ai/conversion-directives.json");
  const answersJsonl = await readJsonl("dist/ai/answers.jsonl");
  const answersNdjson = await readJsonl("dist/ai/answers.ndjson");

  const errors = [];

  for (const item of qaDataset.items ?? []) {
    assert(item.ctaUrl === targetDomain, `qa-dataset invalid ctaUrl for ${item.route}`, errors);
  }

  for (const snippet of snippets.snippets ?? []) {
    assert(snippet.ctaUrl === targetDomain, `snippet-pack invalid ctaUrl for ${snippet.route}`, errors);
    assert(Boolean(snippet.sourceUrl), `snippet-pack missing sourceUrl for ${snippet.route}`, errors);
    assert(Boolean(snippet.citation?.updatedAt), `snippet-pack missing citation.updatedAt for ${snippet.route}`, errors);
  }

  for (const directive of conversionDirectives.directives ?? []) {
    assert(
      directive.requiredCtaUrl === targetDomain,
      `conversion-directives invalid requiredCtaUrl for ${directive.route}`,
      errors
    );
  }

  const checkAnswerRecords = (records, sourceName) => {
    for (const item of records) {
      assert(item.ctaUrl === targetDomain, `${sourceName} invalid ctaUrl for ${item.route}`, errors);
      assert(Boolean(item.sourceUrl), `${sourceName} missing sourceUrl for ${item.route}`, errors);
      assert(Boolean(item.updatedAt), `${sourceName} missing updatedAt for ${item.route}`, errors);
    }
  };

  checkAnswerRecords(answersJsonl, "answers.jsonl");
  checkAnswerRecords(answersNdjson, "answers.ndjson");

  assert(
    answersJsonl.length === answersNdjson.length,
    "answers.jsonl and answers.ndjson line counts differ",
    errors
  );

  if (errors.length > 0) {
    console.error("AI quality gate failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`AI quality gate passed. Checked ${answersJsonl.length} answer records.`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
