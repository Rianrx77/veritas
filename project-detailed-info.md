### Codex
Veritas (Tagline: "See what the world says, what the media reports, and what the future predicts.") is the name of the product and we are going to build it. 
You're now writing a master implementation brief I'll paste directly into
Lovable / Antigravity / CodeX to build the entire product.
Everything we have so far:
- MVP Spec- I
**1. ONE-LINER (max 10 words)**

TruthLens: News, sentiment, and prediction markets in one view.

---

**2. CORE PROMISE (3 lines max)**

Show what happened, what people think happened, and what people believe will happen.

Aggregate news coverage, public sentiment, and prediction market signals into a single topic dashboard.

Reduce information fragmentation and narrative bias.

---

**3. TARGET USER (one specific person archetype, named)**

Arjun, 24 — a journalism student researching AI regulation who spends hours jumping between news sites, Reddit, X, and prediction platforms to understand the full story.

---

**4. MVP FEATURES (max 9, ranked by importance)**

1. Topic Search (company, technology, person, event, policy)
2. Multi-Source News Aggregation
3. AI-Generated Neutral Topic Summary
4. Public Opinion Aggregation (Reddit, X, forums)
5. Prediction Market Signals Dashboard
6. Timeline of Major Developments
7. Source Diversity Analysis (who is covering what)
8. Sentiment Trend Graph (news vs public opinion)
9. Shareable Topic Report Page
	

---

**5. FREE TIER vs PRO TIER (with ₹/month pricing, Indian market)**

### Free (₹0/month)

- 10 topic searches/day
- Latest news aggregation
- Basic AI summary
- Limited sentiment analysis
- 7-day historical timeline
	

### Pro (₹299/month)

- Unlimited searches
- Advanced sentiment analysis
- Prediction market integration
- 1-year historical timeline
- Topic comparison mode
- Export reports (PDF/CSV)
- Personalized watchlists
- Early trend detection
	
---

**6. TECH STACK (one line each: frontend, backend, db, AI, deploy)**

**Frontend:** Next.js + TypeScript + Tailwind CSS
**Backend:** FastAPI (Python)
**DB:** MongoDB Atlas
**AI:** Gemini/OpenAI + Wire APIs + embedding-based topic clustering
**Deploy:** Vercel (frontend) + Railway/Render (backend)

---

**7. TIME-TO-MVP estimate (in weeks)**

**4–6 weeks**

Week 1: Data ingestion & API integrations

Week 2: Search + topic normalization

Week 3: AI summaries + sentiment analysis

Week 4: Dashboard UI

Week 5–6: Timeline, polishing, deployment, testing

---

**8. THE ONE FEATURE we cannot ship without (your verdict)**

**AI-Powered Unified Topic Summary**
Without it, users still need to manually read dozens of articles and opinions. The summary is the feature that converts raw aggregation into actual understanding.

- User Journey -
# TruthLens MVP — Complete User Journey

Think in screens, actions, and outcomes.

The user's job is not to read news.

The user's job is to understand a topic quickly.

Everything should optimize for that.

---

# 1. ENTRY POINT

### User arrives

Sources:

* Google Search
* Shared report link
* Social media post
* Direct URL
* Word of mouth

### Landing Page

User sees:

**Headline**

> Understand any topic from every angle.

**Search Bar (Primary CTA)**

Placeholder:

> Search a company, technology, event, person, or policy...

Examples:

* OpenAI
* AI Regulation
* Nvidia
* Israel-Hamas Conflict
* India's Semiconductor Mission

Below search:

* Trending Topics
* Recently Analyzed Topics

No sign-up required.

---

# 2. FIRST SEARCH

### User types

"AI Regulation"

Presses Enter.

---

# 3. PROCESSING STATE

Display:

### Loading Sequence

Step 1

> Gathering news coverage...

Step 2

> Analyzing public discussions...

Step 3

> Evaluating prediction markets...

Step 4

> Generating neutral summary...

Total:

3–8 seconds

User should understand work is happening.

Never show blank loading.

---

# 4. TOPIC DASHBOARD (MAIN PRODUCT)

This is the core experience.

Everything else supports this screen.

---

## Section 1: AI Summary

Position:

Top of page.

Large card.

Title:

### What You Need To Know

Example output:

* Governments worldwide are proposing AI regulations.
* Debate centers around safety, innovation, and competition.
* Public sentiment is mixed.
* Prediction markets expect stricter regulations within 2 years.

Under summary:

Confidence score.

Sources used.

Refresh timestamp.

---

## Section 2: Story Snapshot

Quick metrics.

4 cards.

### News Coverage

120 articles

### Public Sentiment

62% Positive

### Prediction Confidence

74%

### Coverage Diversity

18 sources

User gets immediate context.

---

# 5. NEWS COVERAGE SECTION

Purpose:

Show what happened.

Layout:

Article cards.

For each article:

* Headline
* Source
* Publication
* Timestamp
* Sentiment
* Bias label (future)

Actions:

* Open source article
* Save article
* Share

Sorting:

* Most Relevant
* Latest
* Most Shared

---

# 6. PUBLIC OPINION SECTION

Purpose:

Show what people think happened.

Sources:

* Reddit
* X
* Forums

Display:

### Key Themes

Example:

Theme 1

"Government overreach"

Theme 2

"Need for AI safety"

Theme 3

"Innovation slowdown"

For each theme:

* Volume
* Sentiment
* Representative comments

User can expand.

---

# 7. PREDICTION MARKET SECTION

Purpose:

Show what people believe will happen.

Display:

### Current Expectations

Example:

Will US pass major AI regulation before 2028?

YES: 71%

NO: 29%

Show:

* Current probability
* Trend
* Market movement

Simple charts only.

Do not overload.

---

# 8. TIMELINE SECTION

Purpose:

Explain how story evolved.

Chronological feed.

Example:

Jan 2025

EU introduces draft regulation.

Mar 2025

US Senate hearing.

Apr 2025

Major AI company testimony.

May 2025

Prediction market shifts.

User sees progression.

---

# 9. SOURCE DIVERSITY VIEW

Purpose:

Prevent narrative tunnel vision.

Display:

Coverage matrix.

Rows:

News Sources

Columns:

Major subtopics

Example:

| Source  | Safety | Competition | Economy |
| ------- | ------ | ----------- | ------- |
| Reuters | ✓      | ✓           | ✓       |
| CNN     | ✓      | -           | ✓       |
| Fox     | ✓      | ✓           | -       |

User immediately sees gaps.

---

# 10. SENTIMENT TRENDS

Purpose:

Compare institutions vs public.

Two lines:

Line 1:

News Sentiment

Line 2:

Public Sentiment

User sees divergence.

Example:

News positive.

Public negative.

Interesting signal.

---

# 11. REPORT GENERATION

Button:

### Generate Shareable Report

Output page includes:

* Summary
* Key themes
* Timeline
* Sentiment
* Sources

Unique URL.

Example:

truthlens.com/report/abc123

Can be shared publicly.

---

# 12. FREE USER LIMIT

After 10 searches:
Modal appears.
### You've reached today's limit.

Upgrade for:

* Unlimited searches
* Prediction markets
* Advanced sentiment
* Longer history

Buttons:

* Upgrade
* Continue Tomorrow

No aggressive blocking.

---

# 13. PRO USER FLOW
Additional actions become visible.

---

### Topic Comparison

Compare:
OpenAI vs Anthropic
or
Bitcoin vs Ethereum

Output:

* News volume
* Sentiment
* Prediction signals

Side-by-side.

---

### Watchlists

User clicks:
Watch Topic
Creates watchlist.
Examples:

* OpenAI
* Nvidia
* India Elections

---

### Alerts

User receives:
> Sentiment shifted significantly.
or
> Prediction market moved 15%.

---

### Export

Buttons:
* Export PDF
* Export CSV

For researchers and journalists.

---

# 14. RETURN USER JOURNEY

User logs in later.
Homepage becomes:

### Your Watchlist

* OpenAI ↑
* Nvidia ↓
* AI Regulation →

### Recent Changes

Important movements since last visit.
One click back into dashboard.

---

# 15. SUCCESS MOMENT

The product succeeds when the user can answer three questions within 60 seconds:
### What happened?
(News)

### What do people think?
(Public opinion)

### What is likely to happen next?
(Prediction markets)

If a user still needs to open 20 tabs after using TruthLens, the MVP failed. The dashboard must collapse the entire research workflow into one screen centered around the AI-generated unified summary.

# TruthLens MVP — Complete Screen List

For an MVP, keep the number of screens small.

A common mistake is building 30–40 screens when only 8–12 are needed.

TruthLens can realistically launch with **11 primary screens**.

---

# PUBLIC SCREENS

## 1. Landing Page

### Purpose

Acquire users and drive search.

### Components

* Logo
* Navigation
* Hero section
* Search bar
* Trending topics
* Example searches
* Features overview
* Pricing preview
* Footer

### Primary CTA

"Search a Topic"

---

## 2. Search Results / Topic Dashboard

### Purpose

Core product.

This is where users spend 90% of their time.

### Sections

* Topic header
* AI Summary
* Story Snapshot
* News Coverage
* Public Opinion
* Prediction Markets
* Timeline
* Source Diversity
* Sentiment Trends
* Share Report

Example URL

```
/topic/ai-regulation
```

---

## 3. Shareable Report Page

### Purpose

Public read-only report.

Generated from a dashboard.

### Components

* Topic title
* Summary
* Key findings
* Timeline
* Charts
* Sources

Example

```
/report/abc123
```

---

## 4. Pricing Page

### Purpose

Convert free users.

### Components

* Free vs Pro comparison
* Monthly pricing
* FAQ
* Upgrade button

Example

```
/pricing
```

---

# AUTHENTICATION

---

## 5. Login Page

### Components

* Google login
* Email login
* Continue as guest

Example

```
/login
```

---

## 6. Sign Up Page

### Components

* Google signup
* Email signup

Example

```
/signup
```

---

# USER SCREENS

---

## 7. Home Dashboard (Logged-In)

### Purpose

Starting point for returning users.

### Components

#### Watchlist

* OpenAI
* Nvidia
* AI Regulation

#### Recent Changes

* Sentiment shifts
* Prediction changes

#### Saved Topics

#### Recommended Topics

Example

```
/dashboard
```

---

## 8. Watchlist Page

### Purpose

Monitor selected topics.

### Components

For each topic:

* Name
* Sentiment trend
* News volume
* Market movement

Actions

* Remove
* Open Topic
* Configure Alert

Example

```
/watchlist
```

---

## 9. Saved Reports Page

### Purpose

Access previously generated reports.

### Components

* Report cards
* Creation date
* Topic
* Open
* Delete

Example

```
/reports
```

---

## 10. Account & Subscription Page

### Purpose

Manage account.

### Components

* Profile
* Subscription status
* Billing
* Search usage
* Upgrade
* Cancel subscription

Example

```
/settings
```

---

# SYSTEM SCREENS

---

## 11. Search Processing State

### Purpose

Intermediate state while data loads.

### Components

Animated progress steps:

```
Gathering news...
Analyzing sentiment...
Checking predictions...
Generating summary...
```

This can be a dedicated screen or full-screen overlay.

---

# OPTIONAL V2 SCREENS

Do NOT build these for MVP.

---

## Topic Comparison Screen

```
/compare
```

Compare two topics.

Example:

* OpenAI vs Anthropic
* Bitcoin vs Ethereum

---

## Alert Management Screen

```
/alerts
```

Manage notifications.

---

## Trend Explorer

```
/trends
```

Discover emerging stories.

---

## API Access Screen

```
/developers
```

Future B2B offering.

---

## Admin Panel

```
/admin
```

Internal use only.

---

# Minimum Launch Version (Absolute MVP)

If you were building this for a hackathon, startup competition, or first release, you could launch with only:

1. Landing Page
2. Topic Dashboard
3. Login
4. Pricing
5. User Dashboard
6. Settings

Everything else can be added later.

Those **6 screens alone deliver the core value proposition**:

**Search → Understand → Save → Return.**

The most important screen by far is **Topic Dashboard**. If development time is limited, spend 70–80% of design and engineering effort there and keep the remaining screens extremely simple.

- UI Plan -
# SEARCH RESULTS / TOPIC DASHBOARD

PURPOSE:  
Provide a complete multi-perspective understanding of a topic in a single workspace.

---

WHAT IT SHOWS:

## Global Navigation

- Logo
    
- Search bar
    
- Pricing
    
- Dashboard
    
- Watchlist
    
- User menu
    

---

## Topic Header

Displays:

- Topic title
    
- Category badge
    
- Last updated timestamp
    

Buttons:

- Watch Topic
    
- Share Topic
    
- Generate Report
    

---

## AI Summary Card

Header:

"What You Need To Know"

Displays:

- Summary text
    
- Confidence score
    
- Source count
    
- Generated timestamp
    
- Model name
    

Buttons:

- Refresh Summary
    

---

## Story Snapshot Metrics

4 KPI cards:

### News Coverage

Article count

### Public Sentiment

Positive / Neutral / Negative %

### Prediction Confidence

Probability %

### Coverage Diversity

Number of sources

---

## News Coverage Section

Controls:

- Search articles
    
- Sort dropdown
    
- Filter dropdown
    

Article card:

- Headline
    
- Source
    
- Publish date
    
- Sentiment badge
    
- Excerpt
    
- Read Original CTA
    
- Save Article CTA
    

Pagination:

- Load More button
    

---

## Public Opinion Section

Theme cards:

- Theme name
    
- Mention count
    
- Sentiment
    
- Trend
    

Discussion cards:

- Platform
    
- Discussion snippet
    
- Sentiment
    
- Engagement
    

Platforms:

- Reddit
    
- X
    
- Forums
    

---

## Prediction Markets Section

Market card:

- Question
    
- YES %
    
- NO %
    
- Trend indicator
    
- Updated timestamp
    

Chart:

- Historical probability chart
    

Metrics:

- Volume
    
- Open interest
    

---

## Timeline Section

Timeline cards:

- Date
    
- Event title
    
- Description
    
- Source count
    

Expandable details

---

## Source Diversity Section

Table:

- Source
    
- Coverage count
    
- Sentiment
    
- Bias label
    
- Last updated
    

---

## Sentiment Trends Section

Line chart:

- News sentiment
    
- Public sentiment
    

Controls:

- 7D
    
- 30D
    
- 90D
    
- 1Y
    

---

## Related Topics Section

Cards:

- Topic name
    
- Category
    
- Sentiment
    
- Open CTA
    

---

## Footer

Standard footer.

---

WHAT THE USER CAN DO:

- Search topic
    
- Watch topic
    
- Unwatch topic
    
- Share topic
    
- Generate report
    
- Refresh summary
    
- Search articles
    
- Sort articles
    
- Filter articles
    
- Open article
    
- Save article
    
- Load more articles
    
- Expand discussion
    
- Collapse discussion
    
- Open discussion source
    
- Change chart range
    
- Expand timeline event
    
- Collapse timeline event
    
- Open related topic
    

---

EDGE STATES:

## Initial Loading

Skeletons for:

- Summary
    
- KPI cards
    
- Articles
    
- Charts
    
- Timeline
    

Message:

```text
Building topic view...
```

---

## No Topic Found

Display:

```text
Topic not found.
```

Buttons:

- Search Again
    
- Return Home
    

---

## No News Data

Display:

```text
No news coverage available.
```

---

## No Discussion Data

Display:

```text
No public discussion data available.
```

---

## No Prediction Data

Display:

```text
No prediction signals available.
```

---

## No Timeline Data

Display:

```text
Timeline unavailable.
```

---

## Partial Data Available

Render available sections.

Unavailable sections show placeholders.

Never block page rendering.

---

## API Error

Banner:

```text
Unable to load topic data.
```

Actions:

- Retry
    
- Return Home
    

---

## Search Limit Reached

Modal:

Title:

```text
Daily search limit reached.
```

Buttons:

- Upgrade
    
- Return Tomorrow
    

---

## Watchlist Success

Toast:

```text
Added to watchlist.
```

---

## Report Success

Toast:

```text
Report generated successfully.
```

Action:

- Open Report

# PRICING PAGE

PURPOSE:  
Convert free users into paid subscribers by clearly communicating feature differences, usage limits, and value.

---

WHAT IT SHOWS:

## Global Navigation

- Veritas logo
    
- Search button
    
- Dashboard link (authenticated users)
    
- Login button (unauthenticated users)
    
- User avatar menu (authenticated users)
    

---

## Pricing Hero Section

### Headline

```text
Choose the plan that fits your research workflow
```

### Supporting Text

Short explanation of Free vs Pro.

---

## Pricing Toggle

Options:

- Monthly
    
- Yearly (future V2)
    

For MVP:

- Monthly active
    
- Yearly disabled with "Coming Soon"
    

---

## Pricing Cards

### Free Plan

Displays:

- ₹0/month
    
- 10 searches/day
    
- Basic AI summary
    
- Latest news aggregation
    
- Limited sentiment analysis
    
- 7-day timeline
    
- Public reports
    

CTA:

```text
Get Started Free
```

---

### Pro Plan

Displays:

- ₹299/month
    
- Unlimited searches
    
- Advanced sentiment analysis
    
- Prediction market integration
    
- 1-year timeline
    
- Watchlists
    
- Alerts
    
- PDF exports
    
- Topic comparison (future)
    

CTA:

```text
Upgrade to Pro
```

Highlighted card.

---

## Feature Comparison Table

Columns:

- Feature
    
- Free
    
- Pro
    

Rows:

- Searches
    
- Summaries
    
- Sentiment Analysis
    
- Prediction Signals
    
- Historical Timeline
    
- Reports
    
- Watchlists
    
- Alerts
    
- PDF Export
    

---

## FAQ Section

Accordion items:

- What happens after free limit?
    
- Can I cancel anytime?
    
- How does billing work?
    
- What payment methods are supported?
    
- Do you store card information?
    

---

## Payment Methods Section

Displays:

- Razorpay logo
    
- UPI
    
- Credit Card
    
- Debit Card
    
- Net Banking
    

---

## Footer

Standard footer.

---

WHAT THE USER CAN DO:

- View plan details
    
- Compare plans
    
- Open Razorpay checkout
    
- Start free plan
    
- Upgrade to Pro
    
- Read FAQs
    
- Navigate to login
    
- Navigate to dashboard
    

---

EDGE STATES:

## Loading

Skeleton pricing cards.

Message:

```text
Loading pricing...
```

---

## Checkout Loading

Disable CTA.

Show spinner.

Message:

```text
Redirecting to payment...
```

---

## Payment Success

Success page/modal.

Message:

```text
Subscription activated successfully.
```

Buttons:

- Go to Dashboard
    
- Start Exploring
    

---

## Payment Failed

Error banner.

Message:

```text
Payment failed.
Please try again.
```

Buttons:

- Retry
    
- Contact Support
    

---

## Already Pro User

Display:

```text
You are currently on the Pro plan.
```

Hide upgrade button.

---

## Razorpay Unavailable

Display:

```text
Payments are temporarily unavailable.
```

Disable checkout.

# LOGIN PAGE

PURPOSE:  
Authenticate users and provide the fastest possible path into Veritas.

---

WHAT IT SHOWS:

## Authentication Card

Centered container.

---

## Logo Section

Displays:

- Veritas logo
    
- Tagline
    

---

## Welcome Header

```text
Welcome Back
```

Supporting text:

```text
Sign in to continue your research.
```

---

## Google Authentication

Primary button:

```text
Continue with Google
```

Includes Google icon.

---

## Divider

```text
OR
```

---

## Email Login Form

Fields:

### Email

- Email input
    
- Validation
    

### Password

- Password input
    
- Show/hide toggle
    

---

## Login Button

```text
Sign In
```

---

## Magic Link Option

Link:

```text
Sign in with Magic Link
```

---

## OTP Login Option

Link:

```text
Sign in with OTP
```

---

## Forgot Password Link

```text
Forgot Password?
```

---

## Sign Up Redirect

```text
Don't have an account?
Create one.
```

---

## Continue as Guest

Secondary CTA.

```text
Continue as Guest
```

Guest users have limited functionality.

---

WHAT THE USER CAN DO:

- Login with Google
    
- Login with email/password
    
- Login with OTP
    
- Request magic link
    
- Reset password
    
- Continue as guest
    
- Navigate to signup
    
- Show password
    
- Hide password
    

---

EDGE STATES:

## Initial Loading

Show auth skeleton.

---

## Google Authentication Loading

Disable button.

Show spinner.

Message:

```text
Connecting to Google...
```

---

## Email Validation Error

Display:

```text
Please enter a valid email.
```

Field turns red.

---

## Password Validation Error

Display:

```text
Password is required.
```

---

## Incorrect Credentials

Banner:

```text
Invalid email or password.
```

---

## OTP Sent

Toast:

```text
Verification code sent.
```

Redirect to OTP verification.

---

## Magic Link Sent

Toast:

```text
Check your email for the login link.
```

---

## Login Success

Toast:

```text
Welcome back.
```

Redirect:

```text
/dashboard
```

---

## Account Locked

Banner:

```text
Too many attempts.
Please try again later.
```

---

## Network Error

Toast:

```text
Unable to sign in.
Check your connection.
```

# SIGN UP PAGE

PURPOSE:  
Create new user accounts with the lowest possible friction while ensuring identity verification.

---

WHAT IT SHOWS:

## Authentication Card

Centered container.

---

## Logo Section

- Veritas logo
    
- Tagline
    

---

## Header

```text
Create Your Account
```

Supporting text:

```text
Start understanding topics faster.
```

---

## Google Signup

Primary CTA:

```text
Continue with Google
```

---

## Divider

```text
OR
```

---

## Signup Form

### Full Name

Input field

---

### Email

Input field

---

### Password

Input field

Show/hide toggle.

---

### Confirm Password

Input field

Show/hide toggle.

---

## Terms Checkbox

```text
I agree to the Terms and Privacy Policy
```

Required.

---

## Create Account Button

```text
Create Account
```

---

## OTP Verification Notice

Explains:

```text
A verification code will be sent after signup.
```

---

## Login Redirect

```text
Already have an account?
Sign In.
```

---

WHAT THE USER CAN DO:

- Sign up with Google
    
- Sign up with email
    
- Show password
    
- Hide password
    
- Accept terms
    
- Submit registration
    
- Navigate to login
    
- Verify OTP
    

---

EDGE STATES:

## Loading

Show auth skeleton.

---

## Missing Required Fields

Inline errors:

```text
This field is required.
```

---

## Invalid Email

Inline error:

```text
Enter a valid email address.
```

---

## Weak Password

Inline error:

```text
Password must contain at least 8 characters.
```

---

## Password Mismatch

Inline error:

```text
Passwords do not match.
```

---

## Terms Not Accepted

Inline error:

```text
You must accept the terms.
```

---

## Email Already Exists

Banner:

```text
An account already exists with this email.
```

Action:

```text
Sign In Instead
```

---

## Account Creation Loading

Disable form.

Spinner shown.

Message:

```text
Creating account...
```

---

## OTP Verification Pending

Redirect to verification step.

Message:

```text
Enter the verification code sent to your email.
```

---

## Signup Success

Toast:

```text
Account created successfully.
```

Redirect:

```text
/dashboard
```

---

## OTP Failure

Banner:

```text
Invalid verification code.
```

Button:

```text
Resend Code
```

---

## Network Error

Toast:

```text
Unable to create account.
Please try again.
```

These three screens complete the **acquisition and conversion funnel**:

**Landing → Login/Signup → Pricing → Dashboard**

The next three screens to define are:

1. **Home Dashboard (Logged-In)**
    
2. **Watchlist Page**
    
3. **Saved Reports Page**
    

These represent the retention layer of Veritas.

# SAVED REPORTS PAGE

PURPOSE:  
Provide users with a central library of generated reports for future reference, sharing, and export.

---

WHAT IT SHOWS:

## Global Navigation

- Logo
    
- Search bar
    
- Dashboard
    
- Watchlist
    
- Reports (active)
    
- User menu
    

---

## Page Header

Displays:

```text
Saved Reports
```

Subheading:

```text
Access and manage your generated research reports.
```

---

## Report Metrics

Summary cards:

### Total Reports

Count

### Public Reports

Count

### Private Reports

Count

### Generated This Month

Count

---

## Search Reports

Input field.

Placeholder:

```text
Search reports...
```

---

## Filter Controls

Filter by:

- Public
    
- Private
    
- Topic Category
    
- Date Range
    

---

## Sort Controls

Sort by:

- Newest
    
- Oldest
    
- Most Viewed
    
- Most Shared
    

---

## Report Cards

Each report displays:

### Report Information

- Report title
    
- Topic name
    
- Topic category
    
- Created date
    

---

### Visibility Status

Badge:

- Public
    
- Private
    

---

### Report Statistics

- Views
    
- Shares
    

---

### Actions

Buttons:

- Open Report
    
- Copy Link
    
- Share
    
- Delete
    

Pro users:

- Export PDF
    

---

## Pagination

Displays:

- Previous
    
- Next
    
- Page number
    

---

## Empty State

Illustration.

Message:

```text
No reports generated yet.
```

CTA:

```text
Generate Your First Report
```

---

WHAT THE USER CAN DO:

- Search reports
    
- Filter reports
    
- Sort reports
    
- Open report
    
- Copy report link
    
- Share report
    
- Delete report
    
- Export PDF
    
- Navigate pages
    

---

EDGE STATES:

## Loading

Skeleton report cards.

Message:

```text
Loading reports...
```

---

## Empty Reports

Display:

```text
You haven't generated any reports.
```

CTA:

```text
Create a Report
```

---

## No Search Results

Display:

```text
No reports match your search.
```

Button:

```text
Clear Search
```

---

## Delete Confirmation

Modal:

Title:

```text
Delete Report?
```

Body:

```text
This action cannot be undone.
```

Buttons:

- Delete
    
- Cancel
    

---

## Delete Success

Toast:

```text
Report deleted successfully.
```

---

## Share Success

Toast:

```text
Link copied to clipboard.
```

---

## Export PDF Loading

Spinner.

Message:

```text
Preparing PDF...
```

---

## Export PDF Success

Toast:

```text
PDF ready.
```

---

## Export PDF Restricted

Modal:

```text
PDF exports require Pro.
```

Buttons:

- Upgrade
    
- Cancel
    

---

## API Error

Banner:

```text
Unable to load reports.
```

Button:

```text
Retry
```

# ACCOUNT & SUBSCRIPTION PAGE

PURPOSE:  
Allow users to manage their profile, authentication methods, subscription status, billing information, usage limits, and account preferences.

---

WHAT IT SHOWS:

## Global Navigation

- Veritas logo
    
- Search bar
    
- Dashboard
    
- Watchlist
    
- Reports
    
- Settings (active)
    
- User avatar menu
    

---

## Page Header

Displays:

```text
Account Settings
```

Subheading:

```text
Manage your profile, subscription, and preferences.
```

---

## Profile Section

Card Title:

```text
Profile Information
```

Displays:

- Profile picture
    
- Full name
    
- Email address
    
- Account creation date
    
- Authentication provider
    

Authentication provider examples:

- Google
    
- Email + Password
    
- OTP
    

Buttons:

- Edit Profile
    
- Upload Avatar
    
- Remove Avatar
    

---

## Account Security Section

Card Title:

```text
Security
```

Displays:

### Email Status

- Verified
    
- Unverified
    

### Password Status

- Password set
    
- Google-only account
    

Buttons:

- Change Password
    
- Reset Password
    
- Verify Email
    

---

## Subscription Section

Card Title:

```text
Current Plan
```

Displays:

### Plan Name

- Free
    
- Pro
    

### Billing Status

- Active
    
- Cancelled
    
- Expired
    

### Renewal Date

```text
Renews on Aug 12, 2026
```

### Plan Benefits

List of included features.

Buttons:

- Upgrade to Pro
    
- Manage Subscription
    
- Cancel Subscription
    

---

## Usage Section

Card Title:

```text
Usage
```

Displays:

### Daily Searches Used

Progress bar:

```text
7 / 10 Searches Used
```

### Reports Generated

Count

### Topics Tracked

Count

### Alerts Active

Count

---

## Notifications Section

Card Title:

```text
Notifications
```

Toggles:

- Topic updates
    
- Sentiment changes
    
- Prediction changes
    
- Weekly digest
    
- Product updates
    

---

## Data & Privacy Section

Card Title:

```text
Data & Privacy
```

Buttons:

- Export My Data
    
- Download Reports
    
- Delete Account
    

---

## Connected Accounts Section

Card Title:

```text
Connected Accounts
```

Displays:

- Google connected status
    

Future:

- GitHub
    
- LinkedIn
    

---

## Billing History Section (Pro Users)

Card Title:

```text
Billing History
```

Table Columns:

- Invoice ID
    
- Date
    
- Amount
    
- Status
    

Actions:

- Download Invoice
    

---

## Footer

Standard footer.

---

WHAT THE USER CAN DO:

- Update profile
    
- Upload avatar
    
- Remove avatar
    
- Change password
    
- Reset password
    
- Verify email
    
- Upgrade plan
    
- Cancel subscription
    
- View usage
    
- Toggle notifications
    
- Export data
    
- Download reports
    
- Delete account
    
- Download invoices
    

---

EDGE STATES:

## Loading

Skeleton cards.

Message:

```text
Loading account settings...
```

---

## Profile Update Success

Toast:

```text
Profile updated successfully.
```

---

## Avatar Upload Success

Toast:

```text
Avatar uploaded.
```

---

## Password Changed

Toast:

```text
Password updated successfully.
```

---

## Email Verification Sent

Toast:

```text
Verification email sent.
```

---

## Subscription Upgrade Success

Toast:

```text
Subscription activated.
```

---

## Subscription Cancellation Success

Toast:

```text
Subscription cancelled.
```

Shows:

```text
Access remains active until current billing period ends.
```

---

## Data Export Processing

Display:

```text
Preparing your data export...
```

---

## Data Export Ready

Toast:

```text
Your export is ready.
```

Button:

```text
Download
```

---

## Delete Account Confirmation

Modal:

Title:

```text
Delete Account?
```

Body:

```text
This permanently removes your account, reports, watchlists, and settings.
```

Buttons:

- Delete Permanently
    
- Cancel
    

---

## Delete Account Success

Redirect:

```text
/
```

Toast:

```text
Account deleted successfully.
```

---

## API Error

Banner:

```text
Unable to load account settings.
```

Button:

```text
Retry
```

# SEARCH PROCESSING STATE

PURPOSE:  
Provide immediate feedback while Veritas gathers data, runs AI analysis, and prepares the Topic Dashboard.

---

WHAT IT SHOWS:

## Full-Screen Overlay

Entire viewport covered.

Background:

- Darkened overlay
    
- Veritas logo centered
    

---

## Topic Being Analyzed

Displays:

```text
Analyzing: AI Regulation
```

Dynamic based on user search.

---

## Progress Indicator

Animated progress bar.

Displays overall completion percentage.

Example:

```text
63% Complete
```

---

## Processing Steps

Vertical checklist.

Step 1:

```text
Gathering news coverage...
```

Status:

- Pending
    
- Active
    
- Completed
    

---

Step 2:

```text
Collecting public discussions...
```

Status:

- Pending
    
- Active
    
- Completed
    

---

Step 3:

```text
Retrieving prediction signals...
```

Status:

- Pending
    
- Active
    
- Completed
    

---

Step 4:

```text
Analyzing sentiment...
```

Status:

- Pending
    
- Active
    
- Completed
    

---

Step 5:

```text
Generating AI summary...
```

Status:

- Pending
    
- Active
    
- Completed
    

---

Step 6:

```text
Building timeline...
```

Status:

- Pending
    
- Active
    
- Completed
    

---

Step 7:

```text
Preparing dashboard...
```

Status:

- Pending
    
- Active
    
- Completed
    

---

## Fun Facts / Status Messages

Rotating messages:

```text
Analyzing source diversity...
```

```text
Finding key discussion themes...
```

```text
Identifying major events...
```

```text
Comparing sentiment trends...
```

---

## Cancel Search Button

Optional MVP feature.

Button:

```text
Cancel
```

Returns user to previous page.

---

WHAT THE USER CAN DO:

- Wait
    
- View progress
    
- Cancel search
    
- Retry if failure occurs
    

---

EDGE STATES:

## Initial State

Display:

```text
Preparing analysis...
```

Progress:

0%

---

## Active Processing

Display:

Current active step highlighted.

Progress bar updates in real-time.

---

## Slow Response Warning

After 10 seconds.

Display:

```text
This topic is taking longer than usual.
```

Continue processing.

---

## Partial Data Mode

If one source fails.

Display:

```text
Some sources are unavailable.
Continuing with available data.
```

Processing continues.

---

## News Source Failure

Display:

```text
Unable to retrieve some news sources.
```

Continue processing.

---

## Discussion Source Failure

Display:

```text
Unable to retrieve some discussion sources.
```

Continue processing.

---

## Prediction Source Failure

Display:

```text
Prediction data unavailable.
```

Continue processing.

---

## AI Summary Failure

Display:

```text
Summary generation failed.
Using fallback summary.
```

Continue processing.

---

## Processing Success

Display:

```text
Analysis complete.
```

Progress:

100%

Automatic redirect:

```text
/topic/{slug}
```

after 1 second.

---

## Processing Cancelled

Display:

```text
Search cancelled.
```

Redirect:

Previous screen.

---

## Fatal Error

Display:

```text
Unable to analyze this topic.
```

Buttons:

- Retry
    
- Return Home
    

---

## Network Error

Display:

```text
Connection lost.
```

Buttons:

- Retry
    
- Return Home
    

# COMPLETE MVP SCREEN COVERAGE

You now have detailed UI specifications for all 11 MVP screens:

### Public Screens

1. Landing Page
    
2. Topic Dashboard
    
3. Shareable Report Page
    
4. Pricing Page
    

### Authentication

5. Login Page
    
6. Sign Up Page
    

### User Screens

7. Home Dashboard
    
8. Watchlist Page
    
9. Saved Reports Page
    
10. Account & Subscription Page
    

### System Screen

11. Search Processing State
    

These specifications are detailed enough to feed into Lovable, Claude Code, Cursor, Windsurf, Codex, Antigravity, or a frontend team and generate a consistent production-ready UI architecture.

- Database Schema -
For TruthLens, don't design the database around screens.

Design it around the **research object model**:

**Topic → Sources → Analysis → User Actions**

A common MVP mistake is storing AI summaries, news, sentiment, and predictions inside one giant JSON column. That becomes impossible to query later.

The schema below is normalized enough for production, but still startup-friendly.

---

# 1. TABLE DEFINITIONS

## Extensions

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

---

# USER PROFILES

Supabase Auth manages authentication.

Create a profile table linked to auth.users.

```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

    full_name TEXT,
    avatar_url TEXT,

    plan TEXT NOT NULL DEFAULT 'free'
        CHECK (plan IN ('free', 'pro')),

    daily_search_count INTEGER NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

# TOPICS

Core entity.

Everything revolves around a topic.

```sql
CREATE TABLE topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    slug TEXT UNIQUE NOT NULL,

    title TEXT NOT NULL,

    category TEXT NOT NULL
        CHECK (
            category IN (
                'company',
                'technology',
                'person',
                'event',
                'policy'
            )
        ),

    description TEXT,

    search_count INTEGER NOT NULL DEFAULT 0,

    last_refreshed_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

# TOPIC SUMMARIES

AI-generated output.

Versioned for future regeneration.

```sql
CREATE TABLE topic_summaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    topic_id UUID NOT NULL
        REFERENCES topics(id)
        ON DELETE CASCADE,

    summary TEXT NOT NULL,

    confidence_score NUMERIC(5,2),

    sources_used INTEGER,

    model_name TEXT,

    generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

# NEWS SOURCES

Master list.

```sql
CREATE TABLE news_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL,

    domain TEXT UNIQUE,

    country TEXT,

    bias_label TEXT,

    reliability_score NUMERIC(5,2),

    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# NEWS ARTICLES

```sql
CREATE TABLE news_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    topic_id UUID NOT NULL
        REFERENCES topics(id)
        ON DELETE CASCADE,

    source_id UUID NOT NULL
        REFERENCES news_sources(id)
        ON DELETE RESTRICT,

    headline TEXT NOT NULL,

    url TEXT NOT NULL,

    author TEXT,

    article_text TEXT,

    excerpt TEXT,

    sentiment_score NUMERIC(5,2),

    published_at TIMESTAMPTZ,

    fetched_at TIMESTAMPTZ DEFAULT NOW(),

    metadata JSONB DEFAULT '{}'
);
```

---

# PUBLIC DISCUSSIONS

Reddit, X, forums.

```sql
CREATE TABLE public_discussions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    topic_id UUID NOT NULL
        REFERENCES topics(id)
        ON DELETE CASCADE,

    platform TEXT NOT NULL,

    content TEXT NOT NULL,

    author_name TEXT,

    sentiment_score NUMERIC(5,2),

    engagement_count INTEGER DEFAULT 0,

    source_url TEXT,

    posted_at TIMESTAMPTZ,

    metadata JSONB DEFAULT '{}'
);
```

---

# DISCUSSION THEMES

AI extracted.

```sql
CREATE TABLE discussion_themes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    topic_id UUID NOT NULL
        REFERENCES topics(id)
        ON DELETE CASCADE,

    theme_name TEXT NOT NULL,

    mention_count INTEGER DEFAULT 0,

    sentiment_score NUMERIC(5,2),

    trend_direction TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# PREDICTION MARKETS

```sql
CREATE TABLE prediction_markets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    topic_id UUID NOT NULL
        REFERENCES topics(id)
        ON DELETE CASCADE,

    market_name TEXT NOT NULL,

    question TEXT NOT NULL,

    yes_probability NUMERIC(5,2),

    no_probability NUMERIC(5,2),

    volume NUMERIC(20,2),

    open_interest NUMERIC(20,2),

    market_url TEXT,

    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# PREDICTION HISTORY

For charts.

```sql
CREATE TABLE prediction_market_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    market_id UUID NOT NULL
        REFERENCES prediction_markets(id)
        ON DELETE CASCADE,

    yes_probability NUMERIC(5,2),

    no_probability NUMERIC(5,2),

    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

# TIMELINE EVENTS

```sql
CREATE TABLE timeline_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    topic_id UUID NOT NULL
        REFERENCES topics(id)
        ON DELETE CASCADE,

    event_date TIMESTAMPTZ NOT NULL,

    title TEXT NOT NULL,

    description TEXT,

    source_count INTEGER DEFAULT 0,

    metadata JSONB DEFAULT '{}'
);
```

---

# TOPIC SENTIMENT HISTORY

For trend charts.

```sql
CREATE TABLE topic_sentiment_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    topic_id UUID NOT NULL
        REFERENCES topics(id)
        ON DELETE CASCADE,

    news_sentiment NUMERIC(5,2),

    public_sentiment NUMERIC(5,2),

    calculated_at TIMESTAMPTZ NOT NULL
);
```

---

# WATCHLISTS

```sql
CREATE TABLE watchlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    topic_id UUID NOT NULL
        REFERENCES topics(id)
        ON DELETE CASCADE,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(user_id, topic_id)
);
```

---

# SAVED REPORTS

```sql
CREATE TABLE saved_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    topic_id UUID NOT NULL
        REFERENCES topics(id)
        ON DELETE CASCADE,

    report_slug TEXT UNIQUE NOT NULL,

    report_data JSONB NOT NULL,

    is_public BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# USER SEARCH HISTORY

```sql
CREATE TABLE user_searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    topic_id UUID
        REFERENCES topics(id)
        ON DELETE SET NULL,

    query TEXT NOT NULL,

    searched_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# ALERTS (PRO FEATURE)

```sql
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES profiles(id)
        ON DELETE CASCADE,

    topic_id UUID NOT NULL
        REFERENCES topics(id)
        ON DELETE CASCADE,

    alert_type TEXT NOT NULL,

    threshold JSONB DEFAULT '{}',

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 2. RELATIONSHIPS

|FK|Meaning|
|---|---|
|topic_summaries.topic_id → topics.id|Summary belongs to a topic|
|news_articles.topic_id → topics.id|Article belongs to topic|
|news_articles.source_id → news_sources.id|Article comes from source|
|public_discussions.topic_id → topics.id|Discussion belongs to topic|
|discussion_themes.topic_id → topics.id|Theme belongs to topic|
|prediction_markets.topic_id → topics.id|Market belongs to topic|
|prediction_market_history.market_id → prediction_markets.id|Historical point belongs to market|
|timeline_events.topic_id → topics.id|Event belongs to topic|
|topic_sentiment_history.topic_id → topics.id|Sentiment snapshot belongs to topic|
|watchlists.user_id → profiles.id|Watchlist belongs to user|
|watchlists.topic_id → topics.id|Watching specific topic|
|saved_reports.user_id → profiles.id|Report owner|
|saved_reports.topic_id → topics.id|Report topic|
|alerts.user_id → profiles.id|Alert owner|
|alerts.topic_id → topics.id|Alert topic|

---

# 3. INDEXES

## Search

```sql
CREATE INDEX idx_topics_slug
ON topics(slug);

CREATE INDEX idx_topics_title
ON topics(title);
```

Reason:  
Topic search is your highest traffic operation.

---

## Articles

```sql
CREATE INDEX idx_articles_topic
ON news_articles(topic_id);

CREATE INDEX idx_articles_published
ON news_articles(published_at DESC);
```

Reason:  
Dashboard article loading.

---

## Discussions

```sql
CREATE INDEX idx_discussions_topic
ON public_discussions(topic_id);

CREATE INDEX idx_discussions_platform
ON public_discussions(platform);
```

---

## Markets

```sql
CREATE INDEX idx_markets_topic
ON prediction_markets(topic_id);

CREATE INDEX idx_market_history_market
ON prediction_market_history(market_id);
```

---

## Timeline

```sql
CREATE INDEX idx_timeline_topic
ON timeline_events(topic_id);

CREATE INDEX idx_timeline_date
ON timeline_events(event_date DESC);
```

---

## Watchlists

```sql
CREATE INDEX idx_watchlist_user
ON watchlists(user_id);
```

---

## Reports

```sql
CREATE INDEX idx_reports_user
ON saved_reports(user_id);

CREATE INDEX idx_reports_slug
ON saved_reports(report_slug);
```

---

## Full Text Search

Critical.

```sql
CREATE INDEX idx_article_fts
ON news_articles
USING GIN (
    to_tsvector(
        'english',
        coalesce(headline,'') || ' ' ||
        coalesce(article_text,'')
    )
);
```

---

# 4. ROW LEVEL SECURITY POLICIES

Enable:

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_searches ENABLE ROW LEVEL SECURITY;
```

---

## Profiles

```sql
auth.uid() = id
```

User sees only own profile.

---

## Watchlists

```sql
auth.uid() = user_id
```

User sees only own watchlist.

---

## Saved Reports

Owner:

```sql
auth.uid() = user_id
```

OR

```sql
is_public = true
```

for public report URLs.

---

## Alerts

```sql
auth.uid() = user_id
```

---

## Search History

```sql
auth.uid() = user_id
```

---

# PUBLIC READ TABLES

No RLS restrictions:

```text
topics
topic_summaries
news_sources
news_articles
public_discussions
discussion_themes
prediction_markets
prediction_market_history
timeline_events
topic_sentiment_history
```

These power public topic pages.

---

# 5. EDGE FUNCTIONS NEEDED

## search-topic

Receives user query.  
Finds or creates topic.

---

## ingest-news

Fetches news articles from Wire APIs.  
Stores normalized articles.

---

## ingest-public-opinion

Fetches Reddit/X/forum content.  
Stores discussions.

---

## ingest-predictions

Fetches prediction market data.  
Updates probabilities.

---

## generate-summary

Uses Gemini/OpenAI.  
Creates neutral topic summary.

---

## generate-discussion-themes

Clusters discussions into themes.

---

## calculate-sentiment

Computes aggregate sentiment scores.

---

## build-timeline

Extracts major events from articles.

---

## generate-report

Creates report JSON for sharing.

---

## refresh-topic

Master orchestration function.

Pipeline:

```text
Fetch News
→ Fetch Discussions
→ Fetch Markets
→ Generate Summary
→ Generate Themes
→ Build Timeline
→ Update Sentiment
```

---

## daily-search-reset

Scheduled cron.

Resets free-tier search counts.

---

## watchlist-alert-worker

Runs every few minutes.

Checks:

- sentiment spikes
    
- market movement
    
- unusual activity
    

Creates notifications.

---

## cleanup-stale-data

Deletes expired cache and unused temporary records.

---

This schema is sufficient for a real MVP launch, supports all screens you listed, supports free/pro plans, public shareable reports, watchlists, alerts, historical charts, AI summaries, and can scale to hundreds of thousands of topics before requiring major redesign.

Generate the master brief with this exact structure:
1. PROJECT OVERVIEW
- Product name, one-liner, target user
2. TECH STACK (locked)
- React + Vite + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (auth + db + storage + edge functions)
- Razorpay (payments - India first)
- Vercel (deploy)
- [Specify Al APIs based on the product]
3. FILE STRUCTURE
- The folder tree the Al should generate
4. BUILD ORDER (Day 1> Day 14)
- Sequential tasks. Each finishes before the next starts.
-Day 1= auth + landing. Day 14 = first paying user.
5. NON-NEGOTIABLES
- Mobile-responsive from Day 1
- Razorpay (India) first, Stripe later
- Loading states on every async action
- Error toasts that don't suck
- RLS on every user-data table
6. THE FIRST PROMPT TO PASTE INTO CLAUDE CODE
- A ready-to-go prompt that kicks off Day 1 generation
- Specific enough the Al cannot hallucinate
Output as markdown I can save as project-brief.md and feed to my Al builder.
make sure to add google auth and also email and password as fallback so 2
options ... with OTP 

# VERITAS — MASTER IMPLEMENTATION BRIEF

## Version 1.0

## Hackathon Build Specification

---

# PROJECT OVERVIEW

## Product Name

**Veritas**

### Tagline

> See what the world says, what the media reports, and what the future predicts.

---

## One-Line Description

Veritas is an AI-powered research platform that aggregates news coverage, public opinion, and prediction market signals into a single dashboard so users can understand any topic from multiple perspectives.

---

## Problem Statement

Today, understanding a topic requires jumping across:

- News websites
    
- Reddit
    
- X/Twitter
    
- Forums
    
- Prediction markets
    
- Search engines
    

Users must manually piece together:

- What happened
    
- What people think
    
- What might happen next
    

This creates:

- Information overload
    
- Narrative bias
    
- Fragmented research workflows
    
- Significant time waste
    

---

## Solution

Veritas collapses this entire workflow into one search.

A user enters:

- OpenAI
    
- Nvidia
    
- AI Regulation
    
- India Elections
    
- Climate Change
    
- Bitcoin
    

Veritas automatically gathers:

### Layer 1

What happened

(News coverage)

### Layer 2

What people think happened

(Public opinion)

### Layer 3

What people think will happen

(Prediction market signals)

### Layer 4

What matters most

(AI-generated neutral summary)

---

# CORE PROMISE

Within 60 seconds, a user should be able to answer:

### Question 1

What happened?

### Question 2

What do people think happened?

### Question 3

What is likely to happen next?

If the user still needs to open 20 browser tabs after using Veritas, the product has failed.

---

# TARGET USER

## Primary User

Arjun, 24

Journalism student researching AI regulation.

Current workflow:

- Opens Google
    
- Opens Reuters
    
- Opens CNN
    
- Opens Reddit
    
- Opens X
    
- Opens prediction markets
    

Spends 30–60 minutes building context.

Veritas should reduce this to under 5 minutes.

---

# MVP FEATURES

Priority order:

1. Topic Search
    
2. Multi-Source News Aggregation
    
3. AI Unified Summary
    
4. Public Opinion Aggregation
    
5. Prediction Market Signals
    
6. Timeline View
    
7. Source Diversity Analysis
    
8. Sentiment Trends
    
9. Shareable Reports
    

---

# TECH STACK (LOCKED)

## Frontend

- React 19
    
- Vite
    
- TypeScript
    
- React Router
    
- TanStack Query
    

---

## UI

- Tailwind CSS
    
- shadcn/ui
    
- Lucide Icons
    
- Recharts
    

---

## Backend

Supabase

Using:

- PostgreSQL
    
- Authentication
    
- Storage
    
- Edge Functions
    
- Realtime
    

---

## Authentication

Required methods:

### Method 1 (Primary)

Google OAuth

### Method 2 (Fallback)

Email Authentication

Features:

- Email + Password
    
- OTP Verification
    
- Magic Link
    
- Password Reset
    

---

## Payments

### Razorpay

India-first

Plans:

- Free
    
- Pro
    

Future:

- Stripe
    

DO NOT BUILD STRIPE.

---

# DATA SOURCES (IMPORTANT)

ALL EXTERNAL DATA MUST COME THROUGH:

## Wire by Anakin

This is the project's primary data provider.

All integrations should be architected assuming Wire APIs are available.

Use Wire APIs for:

### News Aggregation

Retrieve:

- Headlines
    
- Articles
    
- Sources
    
- Metadata
    

---

### Public Opinion Aggregation

Retrieve:

- Reddit discussions
    
- X/Twitter discussions
    
- Forum discussions
    

---

### Prediction Signals

Retrieve:

- Prediction market data
    
- Probability data
    
- Historical probability data
    

---

## IMPORTANT RULE

Do NOT build direct integrations for:

- Reddit API
    
- X API
    
- Polymarket API
    
- NewsAPI
    

Instead:

Abstract all external integrations behind Wire.

The rest of the application should only communicate with internal services.

---

# AI ARCHITECTURE

IMPORTANT:

This is a hackathon project.

There are NO paid AI APIs available.

---

## AI Strategy

Use LOCAL AI MODELS.

Examples:

- Llama 3
    
- Gemma
    
- Qwen
    
- Mistral
    
- DeepSeek
    
- Any Ollama-compatible model
    

---

## AI Tasks

### Unified Summary Generation

Input:

- News articles
    
- Public discussions
    
- Prediction data
    

Output:

Neutral summary

---

### Theme Extraction

Input:

Discussion content

Output:

Themes

Example:

- Government Overreach
    
- AI Safety
    
- Innovation Concerns
    

---

### Timeline Generation

Input:

Articles

Output:

Chronological events

---

### Report Generation

Input:

Entire dashboard

Output:

Shareable report

---

## AI Service Layer

Create:

```text
services/ai/
```

Never call models directly from components.

All AI operations must pass through a dedicated service layer.

This allows future migration to:

- OpenAI
    
- Gemini
    
- Claude
    

Without frontend changes.

---

# SCREENS

The application contains the following screens.

---

## 1. Landing Page

Route:

```text
/
```

Purpose:

Acquire users and drive topic searches.

Contains:

- Hero section
    
- Search bar
    
- Trending topics
    
- Features
    
- Pricing preview
    
- Footer
    

---

## 2. Login Page

Route:

```text
/login
```

Contains:

- Google Login
    
- Email Login
    
- OTP Login
    

---

## 3. Signup Page

Route:

```text
/signup
```

Contains:

- Google Signup
    
- Email Signup
    
- OTP Verification
    

---

## 4. Topic Dashboard

Route:

```text
/topic/:slug
```

MOST IMPORTANT SCREEN.

Contains:

### Topic Header

### AI Summary

### Story Snapshot

### News Coverage

### Public Opinion

### Prediction Markets

### Timeline

### Source Diversity

### Sentiment Trends

### Related Topics

### Share Report

---

## 5. Public Report Page

Route:

```text
/report/:slug
```

Read-only report.

---

## 6. Pricing Page

Route:

```text
/pricing
```

---

## 7. User Dashboard

Route:

```text
/dashboard
```

Contains:

- Watchlist
    
- Recent Activity
    
- Saved Topics
    
- Recommendations
    

---

## 8. Watchlist Page

Route:

```text
/watchlist
```

---

## 9. Saved Reports

Route:

```text
/reports
```

---

## 10. Settings Page

Route:

```text
/settings
```

---

# USER JOURNEY

## Step 1

User lands on homepage.

---

## Step 2

User searches:

```text
AI Regulation
```

---

## Step 3

Processing Screen appears.

Display:

- Gathering news
    
- Analyzing discussions
    
- Collecting predictions
    
- Generating summary
    

---

## Step 4

Dashboard appears.

User sees:

- What happened
    
- What people think
    
- What might happen next
    

---

## Step 5

User saves topic.

---

## Step 6

User returns later.

Sees updated watchlist.

---

# DATABASE

Use Supabase PostgreSQL.

Implement the schema exactly as defined previously.

Core tables include:

- profiles
    
- topics
    
- topic_summaries
    
- news_sources
    
- news_articles
    
- public_discussions
    
- discussion_themes
    
- prediction_markets
    
- prediction_market_history
    
- timeline_events
    
- topic_sentiment_history
    
- watchlists
    
- saved_reports
    
- user_searches
    
- alerts
    

Implement:

- Foreign keys
    
- Indexes
    
- RLS
    
- Constraints
    

Exactly as specified.

---

# EDGE FUNCTIONS

Implement:

## search-topic

Creates or finds topics.

---

## ingest-news

Fetches Wire news.

---

## ingest-public-opinion

Fetches Wire discussions.

---

## ingest-predictions

Fetches Wire prediction signals.

---

## generate-summary

Uses local AI.

---

## generate-discussion-themes

Uses local AI.

---

## build-timeline

Uses local AI.

---

## generate-report

Uses local AI.

---

## refresh-topic

Master orchestration function.

Pipeline:

News  
→ Discussions  
→ Predictions  
→ Summary  
→ Themes  
→ Timeline  
→ Sentiment

---

## daily-search-reset

Free-tier reset.

---

## watchlist-alert-worker

Alert processing.

---

# BUILD PLAN

## Day 1

Landing Page

Project Setup

---

## Day 2

Authentication

Google + Email + OTP

---

## Day 3

Database

Supabase

RLS

---

## Day 4

Search Infrastructure

---

## Day 5

Topic Dashboard Layout

---

## Day 6

Wire News Integration

---

## Day 7

Local AI Summaries

---

## Day 8

Public Opinion Layer

---

## Day 9

Prediction Layer

---

## Day 10

Timeline Layer

---

## Day 11

Reports

---

## Day 12

Watchlists

---

## Day 13

Razorpay

---

## Day 14

Polish

Deployment

Testing

---

# NON-NEGOTIABLES

## Mobile First

Required.

---

## Responsive

Required.

---

## TypeScript Strict Mode

Required.

---

## No "any"

Allowed nowhere.

---

## RLS

Enabled on all user-owned tables.

---

## Loading States

Every async action.

No exceptions.

---

## Error States

Every API call.

No exceptions.

---

## Skeleton Loaders

Topic dashboard.

Required.

---

## Toasts

Human-readable.

---

## Accessibility

Keyboard navigation.

Focus states.

Semantic HTML.

---

## Performance

Lighthouse 90+

Target.

---

## Architecture Rule

Components must NEVER directly:

- Call AI
    
- Call Wire
    
- Access database logic
    

All communication must pass through service layers.

---

# SUCCESS CONDITION

A user searches a topic.

Within 60 seconds they understand:

1. What happened
    
2. What people think
    
3. What is likely to happen next
    

Without opening multiple browser tabs.

That is the core mission of Veritas.

Build everything around that outcome.