// maroon v1.1 — local API server for bots (Discord, etc.)
// Start: npm run server  →  POST http://localhost:3000/v1/chat
// Auth header: Authorization: Bearer <a key from keys.json>
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Maroon } from "./model.js";

const here = dirname(fileURLToPath(import.meta.url));
let keys = [];
try {
  keys = JSON.parse(readFileSync(join(here, "..", "keys.json"), "utf-8"));
} catch {
  // keys.json not readable yet — create it and paste your keys in
}

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (req.method !== "POST" || req.url !== "/v1/chat") {
    res.writeHead(404);
    return res.end(JSON.stringify({ error: "Not found. Use POST /v1/chat" }));
  }
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!keys.includes(token)) {
    res.writeHead(401);
    return res.end(JSON.stringify({ error: "Invalid API key" }));
  }
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    try {
      const { message } = JSON.parse(body || "{}");
      if (!message) {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: "Missing 'message' in request body" }));
      }
      const maroon = new Maroon();
      const reply = await maroon.chat(message);
      res.end(JSON.stringify({ reply }));
    } catch (e) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: e.message }));
    }
  });
});

server.listen(PORT, () => console.log("maroon API listening on http://localhost:" + PORT + "/v1/chat"));