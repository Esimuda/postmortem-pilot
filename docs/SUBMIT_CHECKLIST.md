# Codegeist 2026 · Postmortem Pilot — submit checklist

Updated 31 Oct 2026. **Path A (live Forge Jira panel + Rovo) is NOT done.**

## Pinned links
- Hackathon: https://codegeist2026.devpost.com/
- Rules: https://codegeist2026.devpost.com/rules
- Manage submissions: https://devpost.com/submit-to/31572-codegeist-2026-build-with-context-ship-with-confidence/manage/submissions
- Forge sharing docs: https://developer.atlassian.com/platform/forge/distribute-your-apps/
- Repo: https://github.com/Esimuda/postmortem-pilot
- Field paste blocks: docs/DEVPOST_FIELDS.md · Judge setup: docs/JUDGES.md

Official deadline: 22 Dec 2026, 12:00 PT (23 Dec 2026, 21:00 WAT). Owner target: before 3 Nov 2026 WAT.

## Can do NOW (no Atlassian login)
- [ ] Join hackathon on Devpost, create/save draft submission
- [ ] Name, tagline, category (Apps for Software Teams), Rovo bonus write-up
- [ ] About text, tech explanation, built-with tags, team
- [ ] GitHub repo link
- [ ] Gallery: docs/demo/frames/ or docs/preview/panel.html screenshot
- [ ] (Optional) upload Path B MP4 (docs/demo/postmortem-pilot-walkthrough.mp4) to YouTube as a public placeholder — label it "local builder preview", not live Jira

## MUST WAIT for Atlassian login
- [ ] `forge login` → `forge register` (replace zero-UUID app.id) → `forge deploy -e production`
- [ ] Developer Console › Distribution › Sharing → copy install link → paste in Devpost
- [ ] Install on test site, run JUDGES.md flow (panel + Publish + Rovo)
- [ ] Record Path A YouTube (<5 min, public, English) → replace placeholder video URL
- [ ] Final Submit

## Is an early final submit valid without the Forge link?
No. Rules require the project be "capable of being successfully installed in a judge's test environment via an installation link", plus a public YouTube demo (<5 min). A submission without the install link (and with only the Path B local video) would fail those requirements. Saving a Devpost **draft** now is fine; Devpost normally allows editing until the deadline, so the final Submit should wait for the share link + Path A video.
