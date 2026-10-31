# Postmortem Pilot — demo assets (Codegeist 2026)

## Path B walkthrough video (this folder)

| File | Notes |
|---|---|
| [`postmortem-pilot-walkthrough.mp4`](./postmortem-pilot-walkthrough.mp4) | Path B local walkthrough — **1280×720**, ~68s. Real `docs/preview/panel.html` screenshots + `npm test` / `npm run demo` terminal proof. |
| [`npm-test.log`](./npm-test.log) | Captured `npm test` output (5/5 pass). |
| [`npm-demo.log`](./npm-demo.log) | Captured `npm run demo` OPS-7 builder output. |
| [`frames/`](./frames/) | Source stills used to compose the MP4. |

### What’s in the video
1. Title card — **Postmortem Pilot — Codegeist 2026** / Israel (~3.5s)
2. Builder proof label + `npm test` / `npm run demo` terminal frames
3. Real panel.html Path B click-through: loaded → untick mitigate → Publish (OPS-8, OPS-9 simulated) → Regenerate
4. End card — `github.com/Esimuda/postmortem-pilot`

### What this is **not**
Path B proves the **builder** and **static panel layout**. It does **not** replace the live Forge Jira issue panel + Rovo Chat demo judges expect on Devpost.

## Path A still required for final YouTube

**Yes — YouTube upload is still needed** (parent / operator uploads after Path A recording).

1. Operator completes Atlassian login + `forge deploy` / `forge install` (see [`../DEMO_WALKTHROUGH.md`](../DEMO_WALKTHROUGH.md)).
2. Record Path A (live Jira panel + Rovo) ≤3 minutes.
3. Upload that Path A video to YouTube (Public).
4. Paste the YouTube URL into Devpost ([`../DEVPOST_FIELDS.md`](../DEVPOST_FIELDS.md)).

Until Path A exists, this Path B MP4 is the stopgap demo artifact in-repo only — do not treat it as the final Devpost demo URL.

## Rebuild locally

```bash
cd postmortem-pilot
npm test && npm run demo
# Serve docs/preview/panel.html, screenshot Path B states with headless Chrome,
# then ffmpeg-concat frames → docs/demo/postmortem-pilot-walkthrough.mp4
```
