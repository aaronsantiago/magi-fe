<script>
  import GraphData from '$lib/components/GraphData.svelte'
  import RuntimeDataEntry from '$lib/components/RuntimeDataEntry.svelte'
  import Scripts from '$lib/components/Scripts.svelte'
  // import {ipcCacheSend} from './logic/ipcCacheSend'
  import { get } from 'svelte/store'
  import PinnedData from '$lib/components/PinnedData.svelte'
	import { onDestroy } from 'svelte';
	import { initializeMagi, getRuntime, setRuntime } from '$lib/logic/magi'
	import * as magi from 'magi-lib'

	let runtime = $state(initializeMagi());

	$inspect(runtime).with(console.trace);
	setRuntime(runtime);

	let pinnedData = []
	let graphData = $derived(runtime.graphData);
	let runtimeData = $derived(runtime.runtimeData);
	let scripts = $derived(runtime.scripts);
	let graphScripts = $derived(runtime.graphScripts);
	let status = $derived(runtime.status);

</script>

<div class="bg-base-300 w-[100vw] h-[100vh] overflow-y-auto p-4 overflow-x-hidden">

  <div>
    <PinnedData bind:runtimeData {pinnedData} />
  </div>
  <div class="flex w-full">
    {#if graphData && runtimeData}
      <GraphData {graphData} {runtimeData} {status} bind:graphScripts bind:scripts />
    {/if}
    {#if runtimeData}
      <div class="flex-grow">
        <RuntimeDataEntry bind:runtimeData bind:pinnedData />
      </div>
    {/if}
  </div>
  {#if scripts}
    <Scripts {status} bind:scripts/>
  {/if}
</div>
