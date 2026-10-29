# Judges: install & try

## Option A: install link (preferred)
Use the distribution link on the Devpost page:
`https://developer.atlassian.com/console/install/<APP_ID>?signature=...&product=jira`
1. Open it, pick your Jira Cloud site, click **Install** and accept the scopes (`read:jira-work`, `write:jira-work`, `read:jira-user`).
2. Open any bug/incident issue. Then in the issue, click **Apps → Postmortem Pilot** (issue panel).
3. Review the timeline/root cause/action items, untick any you don't want, then click **Publish postmortem**. A comment and linked tasks are created.
4. Rovo: open Rovo Chat → Agents → **Postmortem Pilot** → "Draft a postmortem for KEY-123".

## Sample incident to paste (issue description + comments)
- Summary: `Checkout returns 500 after Tuesday release`
- Description: `Customers reported 500s on /checkout starting 14:02 after deploy v2.31.`
- Comment 1: `Rolled back at 14:40, errors dropped.`
- Comment 2: `Root cause: migration added a lock on orders table causing query timeouts.`
- Move status To Do → In Progress → Done.

## Option B: deploy from source
See README "Setup / deploy" (`forge login`, `forge register`, `forge deploy`, `forge install`).

## Maintainer step to create the share link (one-time)
1. `forge login` (Atlassian email + API token from id.atlassian.com/manage-profile/security/api-tokens)
2. `forge register "Postmortem Pilot"` → `forge deploy -e production` → `forge install -e production --product jira --site <site>`
3. developer.console → app → **Distribution** → Sharing: enable, fill the privacy/security fields → copy the install link into Devpost and this file.
