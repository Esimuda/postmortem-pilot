# Postmortem Pilot

**Turn a messy Jira incident into a clean, blameless postmortem with owned action items, without leaving Jira.**

Codegeist 2026 entry · Category: **Apps for Software Teams** · Bonus: **Best Rovo Agent**

## What it does
- **Jira issue panel** (Forge UI Kit): reads the issue, comments and status changelog, then builds:
  severity, time to resolve, summary, root cause, a sorted timeline, and suggested action items tagged prevent/detect/mitigate.
- **Publish**: posts the postmortem as a Markdown comment and creates linked `Task`s (label `postmortem-action`) for the selected action items.
- **Rovo agent "Postmortem Pilot"**: ask "Draft a postmortem for OPS-123" in chat. It calls the `get-incident-context` action, writes the blameless narrative, and calls `create-action-items` only after you confirm.

## How it meets the technical requirement
| Requirement | Implementation |
|---|---|
| Built on Forge | `manifest.yml`, `nodejs22.x` runtime, `@forge/api`, `@forge/resolver`, `@forge/react` |
| Integrates Jira | `jira:issuePanel` module + Jira REST v3 (issue, comment, changelog, issue create, issueLink) |
| Rovo | `rovo:agent` with two `action` modules (GET + CREATE) |
| Runs on Atlassian | No external egress, no stored secrets. Data stays in Forge |

## Setup / deploy
```bash
npm install -g @forge/cli
npm install
forge login                 # needs an Atlassian account + API token
forge register              # replaces the placeholder app.id in manifest.yml
forge deploy
forge install --product jira --site <your-site>.atlassian.net
```
Rovo must be enabled on the site for the agent to appear in Rovo Chat.

## Test
`npm test` runs the pure postmortem builder (`src/lib/postmortem.js`) against a synthetic incident.

## Structure
```
manifest.yml            Forge modules (issue panel, Rovo agent, actions)
src/index.js            Resolver + Rovo action handlers (Jira REST)
src/lib/postmortem.js   Deterministic timeline/root-cause/action-item builder
src/frontend/index.jsx  UI Kit panel
docs/JUDGES.md          Install instructions for judges
docs/DEMO_SCRIPT.md     ≤3 min video script
```
MIT licensed.
