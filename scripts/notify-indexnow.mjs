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

const main = async () => {
  const indexNowKey = process.env.INDEXNOW_KEY;
  if (!indexNowKey) {
    console.log("INDEXNOW_KEY not set, skipping IndexNow notification.");
    return;
  }

  const config = await readJson("seo-repo.config.json");
  const routes = await readJson("dist/routes-manifest.json");
  const hostUrl = new URL(config.canonicalHost);
  const host = hostUrl.hostname;

  const urlList = routes.map((route) => `${config.canonicalHost}${route.route}`);
  urlList.push(
    `${config.canonicalHost}/sitemap.xml`,
    `${config.canonicalHost}/sitemap-index.xml`,
    `${config.canonicalHost}/sitemaps/sitemap-programmatic.xml`,
    `${config.canonicalHost}/sitemaps/sitemap-transactional.xml`,
    `${config.canonicalHost}/sitemaps/sitemap-legal.xml`
  );

  const uniqueUrls = [...new Set(urlList)];
  const payload = {
    host,
    key: indexNowKey,
    urlList: uniqueUrls
  };

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`IndexNow request failed (${response.status}): ${body}`);
  }

  console.log(`IndexNow notified with ${uniqueUrls.length} URLs for host ${host}.`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
