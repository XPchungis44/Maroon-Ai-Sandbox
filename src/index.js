// maroon v1.1 — entry point (terminal chat, powered by Ollama)
import readline from "node:readline";
import { Maroon } from "./model.js";
import { config } from "./config.js";

const maroon = new Maroon();
console.log(`maroon ${config.version} online — local model: ${config.model} (${config.ollamaUrl})`);
console.log("Type a message to chat, or /exit to quit.\n");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on("line", async (line) => {
  const text = line.trim();
  if (!text) return;
  if (text === "/exit") { rl.close(); return; }
  try {
    console.log(await maroon.chat(text));
  } catch (e) {
    console.log(`[error] ${e.message}`);
  }
});
rl.on("close", () => process.exit(0));