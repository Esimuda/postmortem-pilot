const Resolver = require('@forge/resolver').default;
const api = require('@forge/api');
const { route } = api;
const { buildPostmortem, toMarkdown } = require('./lib/postmortem');

const KEY_RE = /^[A-Z][A-Z0-9_]+-\d+$/;

async function jira(path, opts) {
  const res = await api.asUser().requestJira(path, opts);
  if (!res.ok) throw new Error(`Jira ${res.status}: ${await res.text()}`);
  return res.status === 204 ? null : res.json();
}

async function loadPostmortem(issueKey) {
  if (!KEY_RE.test(issueKey || '')) throw new Error('Invalid issue key');
  const [issue, comments, changelog] = await Promise.all([
    jira(route`/rest/api/3/issue/${issueKey}?fields=summary,description,priority,status,created,resolutiondate,reporter,project`),
    jira(route`/rest/api/3/issue/${issueKey}/comment?maxResults=100`),
    jira(route`/rest/api/3/issue/${issueKey}/changelog?maxResults=100`),
  ]);
  const pm = buildPostmortem(issue, comments.comments, changelog.values);
  pm.projectKey = issue.fields.project?.key;
  return pm;
}

async function createTasks(issueKey, projectKey, items) {
  const created = [];
  for (const summary of items.map((s) => s.trim()).filter(Boolean).slice(0, 10)) {
    const t = await jira(route`/rest/api/3/issue`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: { project: { key: projectKey }, summary: `[PM ${issueKey}] ${summary}`.slice(0, 250), issuetype: { name: 'Task' }, labels: ['postmortem-action'] } }),
    });
    await jira(route`/rest/api/3/issueLink`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: { name: 'Relates' }, inwardIssue: { key: t.key }, outwardIssue: { key: issueKey } }),
    });
    created.push(t.key);
  }
  return created;
}

const resolver = new Resolver();
resolver.define('generate', async ({ context }) => loadPostmortem(context.extension.issue.key));
resolver.define('publish', async ({ payload, context }) => {
  const key = context.extension.issue.key;
  const pm = await loadPostmortem(key);
  const created = await createTasks(key, pm.projectKey, payload.items || []);
  await jira(route`/rest/api/3/issue/${key}/comment`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ body: { type: 'doc', version: 1, content: [{ type: 'codeBlock', attrs: { language: 'markdown' }, content: [{ type: 'text', text: toMarkdown(pm) }] }] } }),
  });
  return { created };
});
exports.handler = resolver.getDefinitions();

// Rovo actions
exports.getIncidentContext = async ({ issueKey }) => {
  const pm = await loadPostmortem(issueKey);
  return { markdown: toMarkdown(pm), postmortem: pm };
};
exports.createActionItems = async ({ issueKey, items }) => {
  const pm = await loadPostmortem(issueKey);
  const created = await createTasks(issueKey, pm.projectKey, String(items).split('\n'));
  return `Created ${created.length} action items linked to ${issueKey}: ${created.join(', ')}`;
};
