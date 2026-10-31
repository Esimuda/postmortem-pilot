# Postmortem Pilot

**Turn a messy Jira incident into a clean, blameless postmortem with owned action items, without leaving Jira.**

Codegeist 2026 entry · Category: **Apps for Software Teams** · Bonus: **Best Agents (Rovo)**

Repo: https://github.com/Esimuda/postmortem-pilot

## What it does
- **Jira issue panel** (Forge UI Kit): reads the issue, comments and status changelog, then builds severity, time to resolve, summary, root cause, a sorted timeline, and suggested action items tagged prevent / detect / mitigate.
- **Publish**: posts the postmortem as a Markdown comment and creates linked `Task`s (label `postmortem-action`) for the selected action items.
- **Rovo agent "Postmortem Pilot"**: ask `Draft a postmortem for OPS-123` in chat. It calls `get-incident-context`, writes the blameless narrative, and calls `create-action-items` only after you confirm.

## How it meets the technical requirement
| Requirement | Implementation |
|---|---|
| Built on Forge | `manifest.yml`, `nodejs22.x` runtime, `@forge/api`, `@forge/resolver`, `@forge/react` |
| Integrates Jira | `jira:issuePanel` + Jira REST v3 (issue, comment, changelog, issue create, issueLink) |
| Rovo | `rovo:agent` with two reusable `action` modules (GET + CREATE) |
| Runs on Atlassian | No external egress, no stored secrets. Data stays in Forge / Jira |

## Quick start (judges)
Prefer the **Distribution install link** on the Devpost page — full steps in [docs/JUDGES.md](./docs/JUDGES.md).

## Setup / deploy (from source)
```bash
npm install -g @forge/cli
npm install
forge login                 # Atlassian account + API token (id.atlassian.com → API tokens)
forge register "Postmortem Pilot"   # replaces placeholder app.id — commit the change
forge deploy
forge install --product jira --site <your-site>.atlassian.net
```
Rovo must be enabled on the site for the agent to appear in Rovo Chat.

**Note:** Live Forge UI requires your Atlassian login. Cloud/CI cannot complete `forge login` for you. Exact one-time steps: [docs/DEMO_WALKTHROUGH.md](./docs/DEMO_WALKTHROUGH.md#one-time-atlassian-login--deploy).

## Local demo (no Atlassian login)
```bash
npm install
npm test
npm run demo          # prints OPS-7 postmortem from the same builder the panel uses
# open docs/preview/panel.html  — static UI Kit–style click-through
```
This exercises `src/lib/postmortem.js` and a layout preview. It does **not** replace a Forge install for Codegeist judging.

## Test
`npm test` runs the pure postmortem builder against synthetic incidents.

## Demo / submission docs
| Doc | Purpose |
|---|---|
| [docs/DEMO_WALKTHROUGH.md](./docs/DEMO_WALKTHROUGH.md) | Click-by-click screen recording script (Israel voiceover) + local fallback |
| [docs/DEMO_SCRIPT.md](./docs/DEMO_SCRIPT.md) | Short ≤3 min timing table |
| [docs/JUDGES.md](./docs/JUDGES.md) | Install link steps + sample OPS-7 incident |
| [docs/DEVPOST_FIELDS.md](./docs/DEVPOST_FIELDS.md) | Paste-ready Devpost fields (do not auto-submit) |
| [docs/preview/panel.html](./docs/preview/panel.html) | Static panel preview for local walkthrough |

## Structure
```
manifest.yml                 Forge modules (issue panel, Rovo agent, actions)
src/index.js                 Resolver + Rovo action handlers (Jira REST)
src/lib/postmortem.js        Deterministic timeline / root-cause / action-item builder
src/frontend/index.jsx       UI Kit issue panel
scripts/demo-local.js        Local OPS-7 walkthrough (no Forge)
docs/                        Judges, demo, Devpost prep, static preview
```

## License
MIT
