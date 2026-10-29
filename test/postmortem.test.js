const test = require('node:test');
const assert = require('node:assert');
const { buildPostmortem, toMarkdown } = require('../src/lib/postmortem');
const doc = (t) => ({ type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: t }] }] });
test('builds postmortem from messy incident', () => {
  const pm = buildPostmortem(
    { key: 'OPS-7', fields: { summary: 'Checkout 500s', description: doc('Customers saw 500s after deploy.'), priority: { name: 'Highest' }, status: { name: 'Done' }, created: '2026-10-01T10:00:00Z', resolutiondate: '2026-10-01T11:30:00Z', reporter: { displayName: 'Ada' } } },
    [{ created: '2026-10-01T10:20:00Z', author: { displayName: 'Ife' }, body: doc('Root cause: DB migration took a table lock.') }],
    [{ created: '2026-10-01T11:30:00Z', author: { displayName: 'Ife' }, items: [{ field: 'status', fromString: 'In Progress', toString: 'Done' }] }]);
  assert.equal(pm.durationMin, 90);
  assert.match(pm.rootCause, /table lock/);
  assert.ok(pm.actions.some((a) => /rollback/.test(a.text)));
  assert.equal(pm.timeline.length, 3);
  assert.match(toMarkdown(pm), /## Action items/);
});
