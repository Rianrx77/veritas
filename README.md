# 🎯 **Veritas** – AI‑Powered Real‑Time News, Sentiment & Divergence Dashboard

![Veritas Banner](https://raw.githubusercontent.com/Rianrx77/veritas/main/assets/banner.png)

> “Seeing the whole story at a glance—media, public opinion, and market sentiment—so you can make decisions with confidence.”

---

## 📚 What is Veritas?
Veritas is a **single‑page intelligence hub** built for the **Wire Hackathon** that aggregates live news, community discussions, and prediction‑market data into a unified, bias‑aware view. It instantly computes a **Perspective Divergence Score** that flags where narratives clash, giving you a clear signal of hidden bias or emerging trends.

---

## ✨ Highlights & Features
| 🚀 Feature | 🎯 Goal |
|---|---|
| **Multi‑Source Ingestion** | Pulls from Google News, Hacker News, Reddit, and Polymarket via the Anakin Wire API |
| **Local‑LLM Orchestration** | 2‑step workflow – intent classification + private synthesis on Ollama/LM Studio (no cloud cost) |
| **Perspective Divergence Score** | Quantifies sentiment gaps between media and public forums |
| **Wire Ingest Payload Inspector** | Transparent JSON viewer for every API call |
| **Dark‑Mode & Glassmorphism UI** | Premium, responsive design with smooth micro‑animations |
| **One‑Click Deploy** | Docker‑ready, Vite dev server, and an easy production build |

---

## 🛠️ Tech Stack
- **Frontend**: React + Vite, TypeScript, Tailwind‑CSS (custom design tokens)
- **Backend‑ish**: Pure client‑side orchestration using **Anakin Wire API**
- **LLM**: Local models via Ollama/LM Studio (Qwen 2.5, Llama‑3) – optional Gemini fallback
- **Styling**: Modern glass‑morphism, vibrant gradients, and animated UI components

---

## 📦 Quick Start
```bash
# Clone the repo
git clone https://github.com/Rianrx77/veritas.git && cd veritas

# Install dependencies
npm install

# Set your Anakin Wire API key (store in .env.local)
echo "VITE_WIRE_API_KEY=your_key_here" > .env.local

# Run the development server
npm run dev
```
Open <http://localhost:5173> and watch the magic happen!

---

## 📊 Architecture Overview
```mermaid
graph TD
    User[User Query] --> Frontend[React UI]
    Frontend --> LocalLLM[Local LLM (Intent + Summary)]
    LocalLLM --> Frontend
    Frontend --> WireAPI[Anakin Wire API]
    WireAPI --> News[Google News / Reuters / AP]
    WireAPI --> Forums[Hacker News / Reddit]
    WireAPI --> Markets[Polymarket]
    News --> Frontend
    Forums --> Frontend
    Markets --> Frontend
    Frontend --> UI[Dashboard with Divergence Score]
```
> **Tip:** The diagram above can be exported as an SVG for the presentation deck.

---

## 🎬 Demo Video
A short walkthrough (3 min) is available on **YouTube**: https://youtu.be/placeholder-demo
> The video covers the data pipeline, UI features, and the Divergence Score calculation.

---

## 📣 Spread the Word
- **X (Twitter)**: <https://x.com/anakinHQ> – tag `@anakinHQ`
- **LinkedIn**: <https://www.linkedin.com/company/anakintech> – tag `@anakintech`
- Use the hashtag **#VeritasAI** and **#Hackathon** when you share.

---

## 🤝 Contributing
We love contributors! Fork the repo, add a feature, and submit a PR. Please follow the **Conventional Commits** format.

---

## 📜 License
MIT © 2026 Rian Mathew & the Veritas Team

Happy hacking! 🚀
