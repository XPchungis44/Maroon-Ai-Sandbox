# maroon v1.1

A personal, unrestricted AI assistant — powered by Ollama on your own machine. No API key, no credits, no limits.

## Quick start
1. Install Ollama: https://ollama.com/download
2. Pull a model: `ollama pull llama3.2`
3. Start Ollama: `ollama serve` (or just open the desktop app)
4. Run maroon: `npm install && npm start`
5. Chat in your terminal. Type `/exit` to quit.

## Configuration (`.env`)
- `OLLAMA_URL` — where Ollama listens (default `http://localhost:11434`)
- `OLLAMA_MODEL` — the model maroon uses (default `llama3.2`)

## Structure
- `system_prompt.md` — editable behavior prompt (maroon's personality)
- `src/index.js` — terminal chat entry point
- `src/model.js` — model interface wired to Ollama
- `src/config.js` — runtime config
- `src/prompt.js` — prompt loader
- `src/server.js` — local API server for bots (Discord, etc.)

## API server (for Discord bots)
1. Generate a key in the maroon app (Code menu → API keys) and copy it
2. Paste it into `keys.json` — e.g. `["mrn_ab12cd34…"]`
3. Start the server: `npm run server`
4. From your bot, call `POST http://localhost:3000/v1/chat` with header `Authorization: Bearer <your key>` and JSON body `{"message": "hello"}` — the reply arrives as `{"reply": "…"}`

## How it works
maroon sends your chat plus the system prompt to Ollama's local API and prints the reply. Everything runs on your machine — nothing leaves it.