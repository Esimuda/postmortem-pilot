# Demo walkthrough · Postmortem Pilot (Codegeist 2026)

**Narrator voice:** Israel  
**Target length:** ≤3 minutes (judges need not watch past 3; hard cap 5)  
**Goal:** a *real* click-through of the working app — not slides. Show the Jira issue panel and the Rovo agent end-to-end.

This file is the recording bible. Use **Path A** (live Forge on a Jira Cloud site) for the YouTube video. Use **Path B** (local) only when Atlassian login is not yet available — Path B proves the builder and UI layout; it does **not** replace the live Forge demo for Devpost.

---

## Before you record (operator checklist)

1. Atlassian Cloud developer site ready (free): https://developer.atlassian.com/cloud/
2. App installed on that site (see [One-time Atlassian login & deploy](#one-time-atlassian-login--deploy) below).
3. Sample incident **OPS-7** (or any key) created from [docs/JUDGES.md](./JUDGES.md) — description + 3 comments + status To Do → In Progress → Done.
4. Rovo enabled on the site (Rovo Chat visible in the top bar).
5. Browser: Chrome, 1080p, zoom 100%, hide bookmarks bar and personal tabs. Use a clean window / guest profile if needed.
6. Mic: Israel speaking; room quiet; peak around −12 dB.

---

## One-time Atlassian login & deploy

Full live Forge UI **requires** the operator’s Atlassian account. Cloud agents cannot complete this. Do it once on your machine:

### 1. API token
1. Open https://id.atlassian.com/manage-profile/security/api-tokens  
2. **Create API token** → label `forge-cli` → copy the token (shown once).  
3. Keep the token out of git; paste only into the Forge CLI prompt.

### 2. Forge CLI login
```bash
npm install -g @forge/cli
cd /path/to/postmortem-pilot
npm install
forge login
# Email: <your Atlassian email>
# API token: <paste token>
```

### 3. Register, deploy, install
```bash
forge register "Postmortem Pilot"
# This rewrites app.id in manifest.yml — commit that change after it succeeds.
forge deploy -e development
forge install -e development --product jira --site <your-site>.atlassian.net
# Accept scopes: read:jira-work, write:jira-work, read:jira-user
```

### 4. Production share link (for judges / Devpost)
```bash
forge deploy -e production
forge install -e production --product jira --site <your-site>.atlassian.net
```
Then: [developer.atlassian.com/console](https://developer.atlassian.com/console) → your app → **Distribution** → enable **Sharing** → fill privacy/security → copy the install URL  
`https://developer.atlassian.com/console/install/<APP_ID>?signature=...&product=jira`  
Paste that into Devpost and into [docs/JUDGES.md](./JUDGES.md).

**Forge deploy still needs user Atlassian login: YES.**

---

## Path A — Live Forge walkthrough (record this)

| Time | Click / screen (exact) | Israel voiceover |
|---|---|---|
| 0:00–0:12 | Title: Jira issue list or board visible. Cut to issue **OPS-7** “Checkout returns 500 after Tuesday release”. | “Every incident ends the same way: a long Jira thread nobody turns into a postmortem. Postmortem Pilot fixes that — inside Jira, on Forge.” |
| 0:12–0:35 | On OPS-7: scroll **Description**, then **Activity → Comments** (support ping, rollback, root-cause comment). Briefly show **History** status To Do → In Progress → Done. | “Here’s a real-looking incident. Deploy went out, customers hit 500s on checkout, we rolled back, and the root cause is buried in comment three.” |
| 0:35–0:50 | Top of the issue → **Apps** (or the issue panel apps menu) → click **Postmortem Pilot**. Wait for the spinner to clear. | “One click opens the panel. No copy-paste into a doc. No leaving Jira.” |
| 0:50–1:20 | Panel loaded. Point (cursor hover, no rapid clicking) at: **Highest** lozenge, **Done**, **38 min to resolve**, Summary card, Root cause card, Timeline table rows. | “It reads the description, every comment, and the status changelog through the Jira API. Sorted timeline, impact, and root cause — all on Forge, so the data never leaves Atlassian.” |
| 1:20–1:40 | Action items list: show the three lozenges **detect / prevent / mitigate**. **Untick** one checkbox (e.g. leave detect + prevent checked). | “It suggests action items tagged prevent, detect, and mitigate. I keep the ones that matter and drop the rest.” |
| 1:40–2:05 | Click **Publish postmortem**. Wait for the green success message with created task keys. Scroll the issue to the new **comment** (markdown postmortem). Open one linked **Task** (label `postmortem-action`). | “Publish posts a blameless postmortem comment and creates linked tasks with a postmortem-action label — so follow-ups are tracked, not forgotten.” |
| 2:05–2:45 | Open **Rovo Chat** → Agents → **Postmortem Pilot**. Type: `Draft a postmortem for OPS-7` → send. Wait for the agent reply (calls get-incident-context). Then type: `Yes, create the first two action items` → send. Show created keys in the reply. | “It’s also a Rovo agent. Ask in plain English. It pulls the same incident context, writes the narrative, and only creates tasks after I confirm.” |
| 2:45–3:00 | Brief cut back to the issue panel + one linked task. End card: repo URL. | “Postmortem Pilot: from messy incident to accountable follow-up in under a minute. Built on Forge with a Jira issue panel, a Rovo agent, and two Rovo actions.” |

### Recording tips
- 1080p, 30 fps, public YouTube unlisted→public before Devpost paste.
- Do **not** show API tokens, email passwords, or unrelated tickets with PII.
- If Rovo is slow, leave the spinner on camera — that is the real product.
- Prefer one continuous take for the panel publish; cut only between panel and Rovo if needed.

---

## Path B — Fallback local walkthrough (no Atlassian login)

Use this when you cannot yet `forge login`. It exercises the same pure builder the panel and Rovo actions call, plus a static UI preview that mirrors the issue panel layout.

### B1. Run the builder (same logic as the panel)
```bash
cd /path/to/postmortem-pilot
npm install
npm test
node scripts/demo-local.js
```
Expected: tests pass; `demo-local.js` prints the OPS-7 postmortem (severity, 38 min, root cause, timeline, action items) and the markdown the panel would publish as a comment.

**Screen for a stopgap clip:** terminal with `npm test` + `node scripts/demo-local.js` output scrolling, then open the HTML preview below. Narrate the same beats as Path A, but say clearly: “This is the local builder and a static preview of the panel — the production path is the Forge install judges get from the distribution link.”

### B2. Static UI Kit–style panel preview
```bash
# after demo-local.js (or open directly)
open docs/preview/panel.html   # macOS
xdg-open docs/preview/panel.html  # Linux
```
File: [docs/preview/panel.html](./preview/panel.html)

Click-through on the static page:
1. Page loads with Highest / Done / 38 min, Summary, Root cause, Timeline, three action items checked.
2. Untick one checkbox.
3. Click **Publish postmortem** → success banner with fake keys `OPS-8`, `OPS-9` (client-side only — no Jira write).
4. Click **Regenerate** → checkboxes reset to all selected.

This is layout fidelity for recording / screenshots when Forge is unavailable. It is **not** a substitute for the live Forge install link on Devpost.

### B3. What local cannot show
- Real `jira:issuePanel` inside Jira Chrome UI  
- Real comment + linked Task creation via Jira REST  
- Live Rovo Chat calling `get-incident-context` / `create-action-items`  

Those require Path A after `forge deploy` + `forge install`.

---

## After the recording

1. Upload YouTube → **Public** (or Unlisted only if Devpost accepts; prefer Public per rules).  
2. Paste URL into Devpost (see [DEVPOST_FIELDS.md](./DEVPOST_FIELDS.md)).  
3. Confirm install link in JUDGES.md matches Distribution.  
4. Keep this walkthrough and DEMO_SCRIPT.md in sync if the UI changes.
