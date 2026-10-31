# Judges: install & try

Postmortem Pilot is a Forge app. Judges need a Jira Cloud site (free developer license is fine) and, for the Rovo path, Rovo enabled on that site.

## Option A: install link (preferred)

Use the distribution / sharing link on the Devpost page (maintainer fills this after first production deploy):

```
https://developer.atlassian.com/console/install/<APP_ID>?signature=...&product=jira
```

**Exact steps**
1. Open the link while logged into Atlassian.  
2. Pick your **Jira Cloud** site → click **Install**.  
3. Accept scopes: `read:jira-work`, `write:jira-work`, `read:jira-user`.  
4. Open any bug/incident issue (or create the sample below).  
5. In the issue, open **Apps → Postmortem Pilot** (issue panel).  
6. Review severity, duration, summary, root cause, timeline, and action items. Untick any action you do not want.  
7. Click **Publish postmortem**. Confirm a Markdown comment on the issue and linked **Task** issues with label `postmortem-action`.  
8. **Rovo:** open **Rovo Chat → Agents → Postmortem Pilot** → type `Draft a postmortem for KEY-123` → when offered, confirm creation of action items.

If the install link is missing or 404, use Option B or ping the submitter — Sharing must be enabled in the Forge developer console (Distribution).

## Sample incident to paste (issue description + comments)

Create a Jira issue (Bug or Task):

| Field | Value |
|---|---|
| Summary | `Checkout returns 500 after Tuesday release` |
| Description | `Customers reported 500s on /checkout starting 14:02 after deploy v2.31.` |
| Priority | Highest (optional) |

Comments (in order):
1. `Customer support pinged us — checkout failing for ~12% of sessions.`
2. `Rolled back at 14:40, errors dropped.`
3. `Root cause: migration added a lock on orders table causing query timeouts.`

Then move status **To Do → In Progress → Done** so the changelog has status events. Expected panel: ~38 min duration if created/resolved timestamps match a short window; root cause line from comment 3; action items for detect/prevent/mitigate (latency, canary/rollback, slow-query).

## Option B: deploy from source

```bash
npm install -g @forge/cli
git clone https://github.com/Esimuda/postmortem-pilot.git
cd postmortem-pilot
npm install
forge login                 # Atlassian email + API token from id.atlassian.com/manage-profile/security/api-tokens
forge register "Postmortem Pilot"   # if app.id is still the placeholder UUID
forge deploy -e development
forge install -e development --product jira --site <your-site>.atlassian.net
```

Rovo must be enabled on the site for the agent to appear in Rovo Chat. Full click script: [DEMO_WALKTHROUGH.md](./DEMO_WALKTHROUGH.md).

## Option C: local builder only (no Jira UI)

Proves the postmortem engine without Atlassian login:

```bash
npm install
npm test
node scripts/demo-local.js
# optional UI layout:
open docs/preview/panel.html   # or xdg-open on Linux
```

This does **not** replace the Forge install for judging; it is a fallback to inspect logic and layout.

## Maintainer: create the share link (one-time)

1. `forge login` (Atlassian email + API token).  
2. `forge register "Postmortem Pilot"` if needed → commit the new `app.id`.  
3. `forge deploy -e production` → `forge install -e production --product jira --site <site>.atlassian.net`.  
4. [developer.atlassian.com/console](https://developer.atlassian.com/console) → app → **Distribution** → enable **Sharing** → fill privacy/security fields → copy install link into Devpost and replace the placeholder at the top of this file.  
5. Record the Path A walkthrough in [DEMO_WALKTHROUGH.md](./DEMO_WALKTHROUGH.md) and paste the YouTube URL into Devpost.

**Forge deploy still needs the maintainer’s Atlassian login: yes.**
