#!/usr/bin/env node
/**
 * Local walkthrough helper — same builder the Forge panel + Rovo actions use.
 * No Atlassian login required. Pair with docs/preview/panel.html for UI layout.
 */
const path = require('path');
const { buildPostmortem, toMarkdown } = require('../src/lib/postmortem');

const doc = (t) => ({ type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: t }] }] });

const issue = {
  key: 'OPS-7',
  fields: {
    summary: 'Checkout returns 500 after Tuesday release',
    description: doc('Customers reported 500s on /checkout starting 14:02 after deploy v2.31.'),
    priority: { name: 'Highest' },
    status: { name: 'Done' },
    created: '2026-10-28T14:02:00Z',
    resolutiondate: '2026-10-28T14:40:00Z',
    reporter: { displayName: 'Ada Okonkwo' },
  },
};

const comments = [
  { created: '2026-10-28T14:15:00Z', author: { displayName: 'Ife Adebayo' }, body: doc('Customer support pinged us — checkout failing for ~12% of sessions.') },
  { created: '2026-10-28T14:40:00Z', author: { displayName: 'Ife Adebayo' }, body: doc('Rolled back at 14:40, errors dropped.') },
  { created: '2026-10-28T14:55:00Z', author: { displayName: 'Chioma Eze' }, body: doc('Root cause: migration added a lock on orders table causing query timeouts.') },
];

const changelog = [
  { created: '2026-10-28T14:10:00Z', author: { displayName: 'Ada Okonkwo' }, items: [{ field: 'status', fromString: 'To Do', toString: 'In Progress' }] },
  { created: '2026-10-28T14:40:00Z', author: { displayName: 'Ife Adebayo' }, items: [{ field: 'status', fromString: 'In Progress', toString: 'Done' }] },
];

const pm = buildPostmortem(issue, comments, changelog);

console.log('=== Postmortem Pilot · local demo (OPS-7) ===\n');
console.log(`Title:      ${pm.title}`);
console.log(`Severity:   ${pm.severity}`);
console.log(`Status:     ${pm.status}`);
console.log(`Duration:   ${pm.durationMin} min`);
console.log(`Summary:    ${pm.summary}`);
console.log(`Root cause: ${pm.rootCause}`);
console.log('\nTimeline:');
for (const t of pm.timeline) console.log(`  - ${t.at} — ${t.event}`);
console.log('\nAction items:');
for (const a of pm.actions) console.log(`  - [${a.type}] ${a.text}`);
console.log('\n--- Markdown that Publish would post as a comment ---\n');
console.log(toMarkdown(pm));
console.log('\n--- Next ---');
console.log('Open static panel preview:', path.join(__dirname, '..', 'docs', 'preview', 'panel.html'));
console.log('Full click script: docs/DEMO_WALKTHROUGH.md (Path B)');
console.log('Live Forge path still needs: forge login → deploy → install (see DEMO_WALKTHROUGH.md)');
