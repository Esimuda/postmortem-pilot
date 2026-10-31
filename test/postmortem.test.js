const test = require('node:test');
const assert = require('node:assert');
const { buildPostmortem, toMarkdown, adfToText } = require('../src/lib/postmortem');

const doc = (t) => ({ type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: t }] }] });

test('builds postmortem from messy incident', () => {
  const pm = buildPostmortem(
    { key: 'OPS-7', fields: { summary: 'Checkout 500s', description: doc('Customers saw 500s after deploy.'), priority: { name: 'Highest' }, status: { name: 'Done' }, created: '2026-10-01T10:00:00Z', resolutiondate: '2026-10-01T11:30:00Z', reporter: { displayName: 'Ada' } } },
    [{ created: '2026-10-01T10:20:00Z', author: { displayName: 'Ife' }, body: doc('Root cause: DB migration took a table lock.') }],
    [{ created: '2026-10-01T11:30:00Z', author: { displayName: 'Ife' }, items: [{ field: 'status', fromString: 'In Progress', toString: 'Done' }] }]);
  assert.equal(pm.durationMin, 90);
  assert.match(pm.rootCause, /table lock/);
  assert.ok(pm.actions.some((a) => /rollback/.test(a.text)));
  assert.ok(pm.actions.some((a) => a.type === 'prevent'));
  assert.ok(pm.actions.some((a) => /slow-query|index/i.test(a.text)));
  assert.equal(pm.timeline.length, 3);
  assert.match(toMarkdown(pm), /## Action items/);
  assert.match(toMarkdown(pm), /Blameless/);
});

test('OPS-7 sample matches demo walkthrough expectations', () => {
  const pm = buildPostmortem(
    {
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
    },
    [
      { created: '2026-10-28T14:15:00Z', author: { displayName: 'Ife Adebayo' }, body: doc('Customer support pinged us — checkout failing for ~12% of sessions.') },
      { created: '2026-10-28T14:40:00Z', author: { displayName: 'Ife Adebayo' }, body: doc('Rolled back at 14:40, errors dropped.') },
      { created: '2026-10-28T14:55:00Z', author: { displayName: 'Chioma Eze' }, body: doc('Root cause: migration added a lock on orders table causing query timeouts.') },
    ],
    [
      { created: '2026-10-28T14:10:00Z', author: { displayName: 'Ada Okonkwo' }, items: [{ field: 'status', fromString: 'To Do', toString: 'In Progress' }] },
      { created: '2026-10-28T14:40:00Z', author: { displayName: 'Ife Adebayo' }, items: [{ field: 'status', fromString: 'In Progress', toString: 'Done' }] },
    ],
  );
  assert.equal(pm.durationMin, 38);
  assert.equal(pm.severity, 'Highest');
  assert.match(pm.rootCause, /orders table/);
  assert.ok(pm.timeline.length >= 5);
  assert.ok(pm.actions.some((a) => a.type === 'detect'));
  assert.ok(pm.actions.some((a) => a.type === 'prevent'));
  assert.ok(pm.actions.some((a) => a.type === 'mitigate'));
});

test('adfToText flattens paragraphs and ignores unknown nodes safely', () => {
  assert.equal(adfToText(null), '');
  assert.equal(adfToText('plain'), 'plain');
  assert.match(adfToText(doc('hello')), /hello/);
});

test('unknown incident still yields a prevent action and Unknown root cause', () => {
  const pm = buildPostmortem(
    { key: 'OPS-1', fields: { summary: 'Odd blip', description: doc('Something felt off.'), status: { name: 'To Do' }, created: '2026-10-01T10:00:00Z', reporter: { displayName: 'Ada' } } },
    [],
    [],
  );
  assert.equal(pm.rootCause, 'Unknown - needs input');
  assert.equal(pm.durationMin, null);
  assert.ok(pm.actions.length >= 1);
  assert.equal(pm.actions[0].type, 'prevent');
});

test('timeline is sorted chronologically', () => {
  const pm = buildPostmortem(
    { key: 'OPS-2', fields: { summary: 'Out of order', description: doc('deploy caused latency'), created: '2026-10-01T12:00:00Z', reporter: { displayName: 'A' } } },
    [{ created: '2026-10-01T10:00:00Z', author: { displayName: 'B' }, body: doc('earlier comment') }],
    [{ created: '2026-10-01T11:00:00Z', author: { displayName: 'C' }, items: [{ field: 'status', fromString: 'To Do', toString: 'In Progress' }] }],
  );
  const times = pm.timeline.map((t) => new Date(t.at).getTime());
  assert.deepEqual(times, [...times].sort((a, b) => a - b));
});
