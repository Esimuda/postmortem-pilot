import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Box, Stack, Inline, Heading, Text, Lozenge, Button, Checkbox, Spinner, SectionMessage, DynamicTable, xcss } from '@forge/react';
import { invoke } from '@forge/bridge';

const card = xcss({ padding: 'space.150', borderColor: 'color.border', borderWidth: 'border.width', borderStyle: 'solid', borderRadius: 'border.radius' });
const TYPE = { prevent: 'success', detect: 'inprogress', mitigate: 'moved' };

const App = () => {
  const [pm, setPm] = useState(null);
  const [sel, setSel] = useState({});
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);

  const load = () => invoke('generate').then((p) => { setPm(p); setSel(Object.fromEntries(p.actions.map((_, i) => [i, true]))); }).catch((e) => setErr(e.message));
  useEffect(() => { load(); }, []);

  if (err) return <SectionMessage appearance="error"><Text>{err}</Text></SectionMessage>;
  if (!pm) return <Spinner label="Reading incident" />;

  const publish = async () => {
    setBusy(true);
    try { setDone(await invoke('publish', { items: pm.actions.filter((_, i) => sel[i]).map((a) => a.text) })); }
    catch (e) { setErr(e.message); } finally { setBusy(false); }
  };

  return (
    <Stack space="space.200">
      <Inline space="space.100" alignBlock="center">
        <Lozenge appearance="removed">{pm.severity}</Lozenge>
        <Lozenge>{pm.status}</Lozenge>
        <Text>{pm.durationMin != null ? `${pm.durationMin} min to resolve` : 'Unresolved'}</Text>
      </Inline>
      <Box xcss={card}><Stack space="space.050"><Heading as="h5">Summary</Heading><Text>{pm.summary}</Text></Stack></Box>
      <Box xcss={card}><Stack space="space.050"><Heading as="h5">Root cause</Heading><Text>{pm.rootCause}</Text></Stack></Box>
      <Heading as="h5">Timeline</Heading>
      <DynamicTable head={{ cells: [{ key: 't', content: 'Time' }, { key: 'e', content: 'Event' }] }}
        rows={pm.timeline.map((t, i) => ({ key: String(i), cells: [{ key: 't', content: new Date(t.at).toISOString().slice(5, 16).replace('T', ' ') }, { key: 'e', content: t.event }] }))} />
      <Heading as="h5">Action items</Heading>
      <Stack space="space.075">
        {pm.actions.map((a, i) => (
          <Inline key={i} space="space.100" alignBlock="center">
            <Checkbox isChecked={!!sel[i]} onChange={() => setSel({ ...sel, [i]: !sel[i] })} label={a.text} />
            <Lozenge appearance={TYPE[a.type]}>{a.type}</Lozenge>
          </Inline>
        ))}
      </Stack>
      {done
        ? <SectionMessage appearance="success"><Text>{`Posted postmortem comment and created ${done.created.length} linked tasks: ${done.created.join(', ')}`}</Text></SectionMessage>
        : <Inline space="space.100"><Button appearance="primary" isDisabled={busy} onClick={publish}>Publish postmortem</Button><Button appearance="subtle" onClick={load}>Regenerate</Button></Inline>}
    </Stack>
  );
};

ForgeReconciler.render(<React.StrictMode><App /></React.StrictMode>);
