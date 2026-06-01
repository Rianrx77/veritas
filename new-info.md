This is the magic of **Wire by Anakin**—and why it’s perfect for a hackathon.

You **do not** have to manage 20 different APIs, read 20 different documentations, or manage 20 different API keys.

Wire is a **single, unified general API**. You make the exact same HTTP request to one endpoint every time. The only thing you change is a parameter called `action_id` in the body of your request to tell Wire which website to pull from.

Here is exactly how you implement this architecture from start to finish.

### 1. How to actually use the Wire API

All you need is your one Wire API Key. To get data from any site in their catalog, you make a simple `POST` request.

For example, to search Google News, your code looks like this:

```javascript
// A simple fetch request from your backend
const response = await fetch('https://api.anakin.io/v1/wire/task', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_WIRE_API_KEY', // One key rules them all
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "action_id": "google_news.search", // You just change this ID to change the site
    "params": { 
      "query": "RBI Rate Cut" 
    }
  })
});
const data = await response.json();

```

If you want to pull Reddit data instead, you use the exact same code, but you change `"action_id"` to `"reddit.search"`. It is that simple.

### 2. How the architecture decides which sources to use

Since you don't want to query 50 sites for every single search (it would be slow and expensive), you need a **Router**. Since you are using Local AI (like Ollama) for this hackathon, your Local AI will act as the router.

Here is the step-by-step logic you need to write in your backend function (`orchestrate-search-query`):

**Step 1: The User Searches**
Rahul types: *"Anthropic Claude 3.5 Sonnet"* into the Veritas search bar.

**Step 2: Local AI Intent Classification (The Router)**
Before you fetch any data, your backend sends a fast, hidden prompt to your Local AI asking it to categorize the user's query.

*Prompt to Local AI:*

> "Categorize the following search query into one of these types: [FINANCE, TECH, POLITICS, GENERAL]. Query: 'Anthropic Claude 3.5 Sonnet'. Return ONLY the category word."

*Local AI Returns:* `TECH`

**Step 3: The Dynamic Fetch (Parallel Execution)**
Now that your code knows the category is `TECH`, it sets up an array of `action_id`s to fetch.

* It always adds the **Defaults**: `google_news.search` and `reddit.search`.
* Because the category is `TECH`, your code pushes specialized IDs to the array: `techcrunch.search` and `github.repo`.

Your code then fires off these 4 Wire API calls *at the same time* (using `Promise.all` in JavaScript) so the user doesn't have to wait long.

**Step 4: The Final AI Synthesis**
Once all 4 Wire API responses come back as structured JSON, you combine them into one big text block. You send this block to your Local AI one last time.

*Prompt to Local AI:*

> "You are an expert analyst. Based on this raw JSON data from News, Reddit, and GitHub, write a 3-sentence executive summary about the current sentiment and factual status of 'Anthropic Claude 3.5 Sonnet'."

The Local AI returns the perfect summary, and you send that summary (along with the raw data for the charts) back to the Frontend to display on Screen 3.

### Summary of what to tell your Code Editor:

When you prompt your IDE/AI builder, add this specific instruction regarding the backend:

*"For the `orchestrate-search-query` function, implement a two-step Local AI process. First, prompt the Local AI (at `http://localhost:11434/api/generate`) to classify the user's query into a category (e.g., Finance, Tech, Politics, General). Based on the category, dynamically construct a list of `action_id`s (e.g., `google_news.search`, `techcrunch.search`, etc.). Execute a `Promise.all` batch of `POST` requests to `[https://api.anakin.io/v1/wire/task](https://api.anakin.io/v1/wire/task)` using the `X-API-Key` header. Take the consolidated JSON responses, pass them back to the Local AI to generate the Executive Summary, and return the complete payload to the frontend."*

We need to minimize the number of api calls we make to wire to reduce the latency and cost. So, we first need to figure out which catgeory the user's query falls into. Then, based on the category, we will decide which action_ids to use. We will use `google_news.search` and `reddit.search` by default. Then, based on the category, we will add specialized action_ids to the array. 

Here is the list of action_ids we can use:

| Category | Action IDs |
| --- | --- |
| FINANCE | `google_news.search`, `wallstreetjournal.search`, `cnbc.search` |
| TECH | `google_news.search`, `techcrunch.search`, `github.repo` |
| POLITICS | `google_news.search`, `bbc.news`, `reuters.search` |
| GENERAL | `google_news.search`, `reddit.search` |

This makes the number of API calls efficient and reduces the latency and cost, and also gives the user relevant results. This is just an example, we can add more action_ids as needed. 