# Veritas
**TruthLens: News, sentiment, and prediction markets in one view.**

Veritas is a web intelligence application designed for the Wire Hackathon. It collapses the fragmented internet research workflow into a single search and introduces a **Perspective Divergence Score** to flag narratives that differ between media organizations, public discussions, and prediction markets.

## Features
- **Multi-Source Ingestion**: Pulls data from news sites, forums (Reddit/X), and prediction markets (Polymarket) via the Anakin Wire API.
- **AI Synthesis**: Generates objective summaries using Google Gemini or local LLMs (Ollama/LM Studio).
- **Perspective Divergence Score**: Quantifies the gap between media sentiment and public opinion.

## Running Locally
```bash
npm install
npm run dev
```
