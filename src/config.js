// maroon v1.1 — runtime configuration
export const config = {
  name: "maroon",
  version: "v1.1",
  // Ollama runs locally on your machine — free, unrestricted, no API key
  ollamaUrl: process.env.OLLAMA_URL || "http://localhost:11434",
  model: process.env.OLLAMA_MODEL || "llama3.2",
  maxTokens: 4096,
  temperature: 0.7,
  unrestricted: true,
  apiKey: null // personal model — no key required
};