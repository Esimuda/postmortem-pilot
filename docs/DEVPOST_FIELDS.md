# Devpost submission fields · Codegeist 2026

**Hackathon:** https://codegeist2026.devpost.com/  
**Submit page:** after Join Hackathon → Enter a Submission  
**Do not submit from automation** — needs Olabowale’s Devpost + Atlassian browser login. Paste the blocks below.

Deadline (official): **22 Dec 2026, 12:00 PT** · Owner hard stop for this entry: **before 3 Nov 2026 WAT**.

---

## Project name
```
Postmortem Pilot
```

## Tagline (≤ lim)
```
Turn a messy Jira incident into a blameless postmortem with owned action items — without leaving Jira.
```

## Category (required)
```
Apps for Software Teams
```

## Bonus prizes (check / select)
- [x] **Best Agents — Rovo / Assignable agents** (`rovo:agent` + reusable `action` modules)
- [ ] Best app with Atlassian MCP — *not claimed*
- [ ] Best apps with Teamwork Graph — *not claimed*
- [ ] Best Marketplace published app — *claim later if listed*

### Bonus write-up (Rovo) — paste into bonus field
```
Postmortem Pilot ships a Forge rovo:agent named "Postmortem Pilot" with two reusable action modules:

1) get-incident-context (GET) — reads the Jira issue, comments, and status changelog via asUser Jira REST, then returns a structured postmortem (timeline, root cause, suggested prevent/detect/mitigate actions) plus Markdown.
2) create-action-items (CREATE) — only after the user confirms in chat, creates linked Task issues labeled postmortem-action and Relates-links them to the incident.

Conversation starters include "Draft a postmortem for INC-42". The agent prompt is blameless, refuses to invent facts, and never creates tasks until the human confirms. The same builder powers the jira:issuePanel so panel and Rovo stay consistent.
```

---

## Built with (tags)
```
Atlassian Forge, Jira Cloud, Rovo, Forge UI Kit, @forge/api, @forge/resolver, @forge/react, Node.js 22, JavaScript, React
```

## Repo / website
```
https://github.com/Esimuda/postmortem-pilot
```

## Demo video URL
```
<PASTE public YouTube URL after recording — see docs/DEMO_WALKTHROUGH.md Path A>
```
Requirements: under 5 minutes (aim ≤3), shows the Project functioning, public on YouTube, English.

## Installation / access for judges (required)
```
<PASTE Distribution install link after forge deploy -e production + Sharing enabled>
https://developer.atlassian.com/console/install/<APP_ID>?signature=...&product=jira
```
Setup instructions for judges: **docs/JUDGES.md** in the repo (also paste a short version below).

### Short install instructions (paste into Devpost “how to test”)
```
1. Open the installation link above → choose your Jira Cloud site → Install → accept scopes (read:jira-work, write:jira-work, read:jira-user).
2. Create a sample incident (summary "Checkout returns 500 after Tuesday release") with a description mentioning deploy + 500s, add comments for rollback and root cause (DB lock), move status To Do → In Progress → Done. Full sample text: docs/JUDGES.md in the repo.
3. Open the issue → Apps → Postmortem Pilot. Review timeline / root cause / action items. Untick any you do not want. Click Publish postmortem. Confirm a Markdown comment and linked Tasks (label postmortem-action).
4. Rovo (site must have Rovo enabled): Rovo Chat → Agents → Postmortem Pilot → "Draft a postmortem for KEY-123" → confirm to create action items.
5. Source / fallback local builder (no Jira): clone https://github.com/Esimuda/postmortem-pilot → npm install → npm test → node scripts/demo-local.js → open docs/preview/panel.html.
```

---

## Text description (About the project)
```
Postmortem Pilot is a Forge app for software teams who close incidents in Jira but never finish the postmortem.

From any bug or incident issue, the Postmortem Pilot issue panel reads the description, comments, and status changelog through the Jira API (as the current user). It builds severity, time-to-resolve, a sorted timeline, a root-cause line when present, and suggested action items tagged prevent, detect, or mitigate. Publish posts a blameless Markdown postmortem as a comment and creates linked Tasks labeled postmortem-action so follow-ups are tracked in Jira — not a forgotten doc.

The same logic is exposed as a Rovo agent. Ask "Draft a postmortem for OPS-7" in Rovo Chat; the agent calls get-incident-context, writes the narrative, and calls create-action-items only after you confirm.

Everything runs on Atlassian Forge (nodejs22.x). No external egress, no stored secrets — incident data stays in your Jira Cloud site.
```

## How it meets the main technology requirement (Explanation)
```
Built entirely on Atlassian Forge with a committed manifest.yml.

• Platform: Forge runtime nodejs22.x, @forge/api, @forge/resolver, @forge/react (UI Kit native render).
• Jira integration: jira:issuePanel module; Jira REST v3 for issue fields, comments, changelog, issue create, and issueLink (Relates). Scopes: read:jira-work, write:jira-work, read:jira-user.
• Rovo: rovo:agent "Postmortem Pilot" plus two action modules (get-incident-context GET, create-action-items CREATE) that other agents can reuse as tools — qualifying for the Best Agents (Rovo) bonus.
• No third-party backends: the deterministic postmortem builder (src/lib/postmortem.js) runs inside Forge; the Rovo agent adds natural-language narrative on top of that structured context.
```

## Cover image / gallery
- Prefer a screenshot of the issue panel on OPS-7 (Path A), or the static preview `docs/preview/panel.html` until live deploy exists.
- Optional second image: Rovo Chat reply for OPS-7.

## Team
```
Olabowale Babalola (solo)
```

## Checklist before clicking Submit
- [ ] Joined Codegeist 2026 on Devpost  
- [ ] Category = Apps for Software Teams  
- [ ] Rovo bonus selected + write-up pasted  
- [ ] Public GitHub repo linked  
- [ ] YouTube demo public + URL pasted (real walkthrough, Path A)  
- [ ] Distribution install link live + pasted  
- [ ] JUDGES.md / how-to-test instructions pasted  
- [ ] Technology explanation pasted  
- [ ] app.id in manifest.yml is the registered Forge app (not the zero UUID placeholder) after `forge register`

---

## Notes for parent agent
- Do **not** submit Devpost from automation; user must be logged in.  
- Forge deploy / Distribution link still needs user Atlassian login (`forge login`).  
- Owner hard stop: submit before **3 Nov 2026 WAT** even though the official deadline is later.
