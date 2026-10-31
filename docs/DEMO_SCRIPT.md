# Demo video script (≤3 min) · narrator: Israel

**Full click-by-click + Atlassian login + local fallback:** [DEMO_WALKTHROUGH.md](./DEMO_WALKTHROUGH.md)

| Time | Screen (what to click) | Voiceover |
|---|---|---|
| 0:00–0:15 | Title card "Postmortem Pilot · Forge + Rovo" over Jira | "Every incident ends the same way: a long Jira thread nobody turns into a postmortem. Postmortem Pilot fixes that inside Jira." |
| 0:15–0:40 | Open issue OPS-7 "Checkout returns 500 after release". Scroll the messy comments and status history | "Here's a real-looking incident: a deploy, customer reports, a rollback, and the root cause buried in comment four." |
| 0:40–1:15 | Click **Apps → Postmortem Pilot**. Panel loads: severity, 38 min to resolve, summary, root cause, timeline table | "One click. It reads the description, every comment and the status changelog through the Jira API and builds a sorted timeline, impact, and root cause. No data leaves Atlassian, because it all runs on Forge." |
| 1:15–1:40 | Point to action items with prevent/detect/mitigate lozenges; untick one | "It suggests action items tagged prevent, detect and mitigate. I keep the ones that matter." |
| 1:40–2:00 | Click **Publish postmortem** → success message → scroll to new comment and linked tasks | "Publish posts a blameless postmortem comment and creates linked tasks with a postmortem-action label, so follow-ups are tracked, not forgotten." |
| 2:00–2:40 | Open Rovo Chat → Postmortem Pilot agent → type "Draft a postmortem for OPS-7" → agent replies → "Yes, create the first two" → shows created keys | "It's also a Rovo agent. Ask in plain English and it pulls the same incident context, writes the narrative, and only creates tasks after I confirm." |
| 2:40–3:00 | Back on panel + linked task (not a slide deck) | "Built on Forge with a Jira issue panel, a Rovo agent and two Rovo actions. Postmortem Pilot: from messy incident to accountable follow-up in under a minute." |

Recording tips: 1080p, hide personal tabs, use a dev site with sample issue from docs/JUDGES.md. **Record a real walkthrough of the working app** (Path A in DEMO_WALKTHROUGH.md). Upload as **Public** on YouTube and paste the link into Devpost. If Forge is not installed yet, use Path B (`npm test` + `docs/preview/panel.html`) only as a stopgap — Devpost still needs the live Forge path.
