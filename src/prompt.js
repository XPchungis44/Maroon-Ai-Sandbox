// maroon v1.1 — prompt loader
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const promptPath = join(here, "..", "system_prompt.md");

export function loadSystemPrompt() {
  return readFileSync(promptPath, "utf-8");
}