import { initializeMagi, getRuntime, setRuntime } from '$lib/logic/magi';
import * as magi from 'magi-lib';

export let runtime = $state(initializeMagi());

// $inspect(runtime).with(console.trace);
setRuntime(runtime);

// let pinnedData = [];
// export let graphData = $derived(runtime.graphData);
// export let runtimeData = $derived(runtime.runtimeData);
// export let scripts = $derived(runtime.scripts);
// export let graphScripts = $derived(runtime.graphScripts);
// export let status = $derived(runtime.status);
// export let api = $derived(runtime.api);
