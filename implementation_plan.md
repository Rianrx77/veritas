# Implementation Plan - Veritas MVP

Veritas is a premium research dashboard designed for a hackathon. It aggregates media coverage, public sentiment, and prediction market data for a given topic. This plan details the creation of the application using React 19 + Vite + TypeScript + Tailwind CSS v4, focusing on the four screens requested by the user, high-end aesthetics, and the integration of Anakin's Wire query layer.

## User Review Required

> [!IMPORTANT]
> **Key Decisions & Strategies:**
> 1. **Scoped MVP:** We are building exactly the 4 requested screens: Landing Page, Search Processing State, Topic Dashboard, and Report Page. Pricing, Razorpay, Watchlists, Alerts, Saved Reports, and settings are postponed to maximize quality.
> 2. **Tailwind CSS v4:** We are using Tailwind v4, which operates directly through `@tailwindcss/vite` in `vite.config.ts` without requiring a `tailwind.config.js` or `postcss.config.js`.
> 3. **Dual-Mode Backend Architecture (Mock + Live AI):**
>    - **Mock Data Engine:** Pre-built, high-fidelity research data for key demo topics (`OpenAI`, `AI Regulation`, `Nvidia`, `India's Semiconductor Mission`) to ensure a flawless out-of-the-box demo.
>    - **Developer API Key Drawer:** A settings UI enabling the user to input a Gemini API Key. If provided, the app will execute actual local client-side LLM summaries of the aggregated data, showing real-time AI in action.
> 4. **Aesthetics & Premium Polish:** A cohesive, immersive dark mode using glassmorphism (translucent blurs), smooth gradients, animated progress states, and micro-interactions.

---

## Proposed Changes

### Project Setup and Infrastructure

#### [NEW] [package.json](file:///d:/Rian/hackathons/build-a-thon/package.json)
Initial configuration with React 19, TypeScript, React Router v6, Tailwind CSS v4, Lucide React, and Recharts.

#### [NEW] [vite.config.ts](file:///d:/Rian/hackathons/build-a-thon/vite.config.ts)
Vite config integrating the `@tailwindcss/vite` plugin and resolving standard paths.

#### [NEW] [src/index.css](file:///d:/Rian/hackathons/build-a-thon/src/index.css)
Main stylesheet importing Tailwind CSS v4 and setting up global styles (gradients, custom keyframes for progress animations, scrollbars, etc.).

---

### Service Layer

#### [NEW] [src/services/mockData.ts](file:///d:/Rian/hackathons/build-a-thon/src/services/mockData.ts)
Contains static high-fidelity research datasets for:
- `OpenAI`
- `AI Regulation`
- `Nvidia`
- `India's Semiconductor Mission`

Also implements a dynamic context-aware mock generator for custom searches that outputs realistic news articles, Reddit threads, Twitter sentiment, prediction market charts, and chronological timelines.

#### [NEW] [src/services/wireService.ts](file:///d:/Rian/hackathons/build-a-thon/src/services/wireService.ts)
Defines interfaces and fetches structured data for news, social sentiment, and prediction markets. Simulates Anakin Wire API request structure, allowing developers to see where real API calls would plug in.

#### [NEW] [src/services/aiService.ts](file:///d:/Rian/hackathons/build-a-thon/src/services/aiService.ts)
Orchestrates AI summary, theme extraction, and report compilation. Supports:
1. Fallback mock-generation if no API key is set.
2. Direct client-side Gemini AI calls via the `@google/generative-ai` package when a key is provided by the user.

---

### Pages and Layouts

#### [NEW] [src/pages/LandingPage.tsx](file:///d:/Rian/hackathons/build-a-thon/src/pages/LandingPage.tsx)
Premium landing page with a hero section, responsive centered search bar, list of trending/recent searches, and a "Data Sources Used" section showcasing Anakin Wire integrations.

#### [NEW] [src/pages/SearchProcessing.tsx](file:///d:/Rian/hackathons/build-a-thon/src/pages/SearchProcessing.tsx)
A dedicated, immersive loading dashboard simulating the research ingestion steps:
1. "Gathering media coverage from Wire..." (News)
2. "Analyzing public discussions via Wire..." (Reddit, X)
3. "Evaluating prediction markets via Wire..." (Polymarket, etc.)
4. "Calculating Perspective Divergence Score..."
5. "Generating neutral summary..." (AI synthesis)

#### [NEW] [src/pages/TopicDashboard.tsx](file:///d:/Rian/hackathons/build-a-thon/src/pages/TopicDashboard.tsx)
The primary layout comprising:
- **Topic Header:** Title, category, sharing options, and metadata.
- **AI Summary Card:** "What You Need To Know" with bulleted items, source count, and confidence rating.
- **Story Snapshot Metrics:** 4 quick-metric cards (News coverage, Public sentiment, Prediction probability, Source diversity).
- **Perspective Divergence Card:** Sentiment rating comparison between Media (+72) vs Public (-15), calculating the Divergence Score and summarizing the conflict.
- **Data Sections:** Tabbed/grid layout showing News Coverage, Public Opinion (Reddit/X themes and snippet cards), Prediction Markets (charts + outcomes), Timeline (developments), and Source Diversity.
- **Developer Settings Drawer:** An overlay to toggle Mock Mode vs Live AI Mode and save a Gemini API Key.

#### [NEW] [src/pages/ReportPage.tsx](file:///d:/Rian/hackathons/build-a-thon/src/pages/ReportPage.tsx)
A shareable, clean, print-friendly report page that can be shared via a unique URL.

#### [NEW] [src/App.tsx](file:///d:/Rian/hackathons/build-a-thon/src/App.tsx)
Handles routing (Landing, Processing, Dashboard, Report) and houses the API Key configuration context.

---

## Verification Plan

### Automated Build & Lint Verification
- Build check: Run `npm run build` to confirm zero compilation or TypeScript errors.
- Run the dev server `npm run dev` to confirm startup.

### Manual UI/UX Walkthrough
We will test:
1. **Search Flow:** Search "OpenAI" on the landing page -> verify progress states -> check redirection to dashboard.
2. **Dashboard Visuals:** Verify the grid layout, glassmorphic cards, Recharts chart render, and the "Perspective Divergence Score".
3. **Responsive Checks:** Test UI scaling on mobile, tablet, and desktop dimensions.
4. **Developer Mode:** Add a Gemini API Key, perform a search, and verify that the AI summary is generated live from Google's models based on the Wire search results.
