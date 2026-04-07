# Appdex Marketing Plan

## Product Summary

**Appdex** is an AI-powered app gallery that automatically generates interactive app prototypes daily. OpenAI creates unique app ideas, Claude builds full React prototypes with design systems, and they're auto-deployed to a browsable gallery. Currently 90+ prototypes across 10+ categories, growing by 6/day.

**Key differentiators:**
- Fully autonomous AI pipeline (idea -> design -> code -> deploy)
- Interactive, runnable prototypes (not just mockups)
- Complete design systems with exportable code
- New content daily without manual effort

---

## Target Audiences

| Audience | Why They Care | Channel |
|----------|--------------|---------|
| Indie hackers / solo founders | Inspiration for app ideas, skip the wireframe phase | Twitter/X, Indie Hackers, Product Hunt |
| Designers | Explore AI-generated design systems, export to Figma | Dribbble, Behance, Twitter/X, Threads |
| Developers | Browse React prototypes, learn patterns, fork code | GitHub, Hacker News, Dev.to, Reddit |
| AI enthusiasts | See what AI can build autonomously | Twitter/X, Reddit r/artificial, YouTube |
| Product managers | Rapid concept validation, stakeholder demos | LinkedIn, Product Hunt |

---

## Phase 1: Foundation (Week 1-2)

### 1.1 Polish the Landing Experience
- Ensure landing page loads fast, mobile-friendly
- Add clear CTA: "Join the waitlist" or "Get daily prototypes in your inbox"
- Add Open Graph / Twitter Card meta tags for rich link previews
- Create a 15-second demo GIF/video showing the gallery in action

### 1.2 Content Assets
- **README / GitHub repo**: Make it public-friendly with screenshots, demo link, and "How it works" section
- **One-pager**: "What is Appdex?" — shareable PDF/image for social
- **Demo video** (60s): Screen recording showing browse -> click -> interactive prototype -> design spec -> export

### 1.3 SEO Basics
- Add meta descriptions, titles, and structured data to all pages
- Create a sitemap.xml
- Target keywords: "AI app prototypes", "AI-generated app ideas", "app design gallery", "AI prototype generator"

---

## Phase 2: Launch (Week 3-4)

### 2.1 Product Hunt Launch
- **Tagline**: "An AI gallery that generates 6 new interactive app prototypes every day"
- **Maker comment**: Explain the OpenAI + Claude pipeline, share stats
- **Assets**: 5 gallery screenshots, 1 demo video, animated thumbnail
- **Timing**: Tuesday-Thursday, 12:01 AM PT
- Rally early supporters (friends, community) to upvote and comment

### 2.2 Hacker News
- "Show HN: Appdex - AI generates 6 new interactive app prototypes daily"
- Focus on the technical pipeline (OpenAI ideation -> Claude code gen -> headless Chrome validation -> auto-deploy)
- Be ready to answer technical questions in comments

### 2.3 Reddit
- r/SideProject, r/webdev, r/reactjs, r/artificial, r/design
- Tailor each post to the subreddit audience
- Share as "I built this" with behind-the-scenes details

### 2.4 Twitter/X Thread
- Thread: "I built an AI that generates a new app every 4 hours. Here's how it works."
- Include screenshots, the pipeline diagram, and a link
- Tag relevant AI/dev accounts for retweets

---

## Phase 3: Growth (Week 5-8)

### 3.1 Content Marketing
- **Weekly "Best of Appdex"** newsletter (use waitlist emails)
  - Top 5 prototypes of the week with screenshots
  - Behind-the-scenes: interesting AI decisions, unusual app ideas
- **Blog posts / Dev.to articles**:
  - "How I built an autonomous AI prototype factory"
  - "What happens when AI designs 100 apps — patterns and surprises"
  - "The tech stack behind Appdex: Bun + React + Claude + OpenAI"
- **Twitter/X content cadence**: 3-5 posts/week
  - Daily prototype highlights
  - Before/after comparisons
  - "AI built this app in 30 seconds" clips

### 3.2 Community Building
- Add comments/reactions to prototypes (already have auth via Supabase)
- Let users vote on their favorite prototypes
- "Prototype of the Week" featured section

### 3.3 Partnerships & Cross-promotion
- Reach out to AI newsletter authors (Ben's Bites, The Neuron, TLDR AI)
- Guest posts on dev blogs
- Collaborate with design YouTubers for "reacting to AI-designed apps" content

### 3.4 GitHub Strategy
- Open-source the generation pipeline (not the full app)
- Add GitHub stars badge to landing page
- Write detailed technical docs for contributors

---

## Phase 4: Monetization Tease (Week 9+)

### 4.1 "Create Your Own" Waitlist
- The "Create" tab already shows "Coming Soon" — promote this heavily
- "Describe your app, AI builds the prototype" — this is the viral hook
- Collect emails specifically for this feature
- Consider early access / paid tier messaging

### 4.2 Email Drip Sequence
Once someone joins the waitlist:
1. **Day 0**: Welcome + link to gallery + top 5 prototypes
2. **Day 3**: "How Appdex works" (the AI pipeline story)
3. **Day 7**: "This week's best prototypes" + invite to share
4. **Day 14**: "Create your own is coming" + early access offer

---

## Quick Wins (Can Do Today)

1. Add OG/Twitter meta tags for rich social previews
2. Create a short screen-recording GIF for sharing
3. Post on Twitter/X with the "I built this" angle
4. Submit to Indie Hackers and r/SideProject
5. Share GitHub repo link (if public) on relevant communities

---

## Key Metrics to Track

| Metric | Tool | Target (Month 1) |
|--------|------|-------------------|
| Waitlist signups | Supabase | 500+ |
| Unique visitors | Vercel/Plausible | 5,000+ |
| Product Hunt upvotes | Product Hunt | 200+ |
| GitHub stars | GitHub | 100+ |
| Twitter impressions | Twitter Analytics | 50,000+ |
| Newsletter subscribers | Email tool | 300+ |

---

## Budget Estimate

| Item | Cost | Notes |
|------|------|-------|
| Product Hunt launch | Free | Organic |
| Social media posts | Free | Organic |
| Demo video production | Free | Screen recording + editing |
| Newsletter tool | Free tier | Resend / Loops / Buttondown |
| Custom domain email | ~$5/mo | For newsletter sender |
| Optional: Promoted tweet | $50-100 | For launch day boost |
| **Total Month 1** | **~$5-100** | |
