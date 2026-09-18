// maroon v1.1 — core model interface, wired to Ollama
import { config } from "./config.js";
import { loadSystemPrompt } from "./prompt.js";

export class Maroon {
  constructor() {
    this.systemPrompt = loadSystemPrompt();
    this.history = [];
  }

  async chat(userMessage) {
    this.history.push({ role: "user", content: userMessage });
    const reply = await this.callOllama();
    this.history.push({ role: "assistant", content: reply });
    return reply;
  }

  // Everything runs on your own machine through Ollama — no API key, no credits, no limits.
  async callOllama() {
    const res = await fetch(`${config.ollamaUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: config.model,
        messages: [{ role: "system", content: this.systemPrompt }, ...this.history],
        stream: false,
        options: { temperature: config.temperature, num_predict: config.maxTokens },
      }),
    });
    if (!res.ok) {
      throw new Error(`Ollama returned ${res.status} — is Ollama running? Start it with: ollama serve`);
    }
    const data = await res.json();
    return data.message?.content ?? "";
  }
}