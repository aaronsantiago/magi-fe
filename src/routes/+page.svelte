<script>
  import GraphData from '$lib/components/GraphData.svelte'
  import RuntimeDataEntry from '$lib/components/RuntimeDataEntry.svelte'
  import { persisted } from 'svelte-persisted-store'
  import Scripts from '$lib/components/Scripts.svelte'
  // import {ipcCacheSend} from './logic/ipcCacheSend'
  import { get } from 'svelte/store'
  import Settings from '$lib/components/Settings.svelte'
  import PinnedData from '$lib/components/PinnedData.svelte'

  // const updateGraphs = () => window.electron.ipcRenderer.send('runGraphs')
  const rivetFilename = persisted('rivetFilename', '');
  const magiFilename = persisted('magiFilename', '');

  let modalNode;

  $: pinnedData = []
  $: console.log("pinned data", pinnedData);

  $: graphData = {}
  $: runtimeData = {}
  $: scripts = {}
  $: graphScripts = {}
  $: status = {}
  $: api = {
    apiKey: '',
    organizationId: '',
    endpointUrl: ''
  }

  // window.electron.ipcRenderer.on('runtimeUpdated', (event, data) => {
  //   console.log('projectLoaded', data)
  //   runtimeData = data?.runtimeData
  //   graphData = data?.graphData
  //   scripts = data?.scripts
  //   graphScripts = data?.graphScripts
  //   api = data?.api
  //   status = data?.status
  // })

  $: console.log(status)

  // $: {
  //   ipcCacheSend('updateRuntime', {
  //     runtimeData,
  //     graphData,
  //     scripts,
  //     graphScripts,
  //     api
  //   })
  // }

</script>

<div class="bg-base-300 w-[100vw] h-[100vh] overflow-y-auto p-4 overflow-x-hidden">
  <div class="navbar bg-base-100 p-4 w-full box-border">
    <div class="flex-1 flex flex-col items-start">
      <div>Rivet Project: {$rivetFilename}</div>
      <div>Magi Project: {$magiFilename}</div>
    </div>
    <button class="btn" on:click={()=>modalNode.showModal()}>settings</button>
    <dialog bind:this={modalNode} class="modal">
      <div class="modal-box">
        <Settings {rivetFilename} {magiFilename} bind:api />
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <!-- <button class="btn" on:click={updateGraphs}>Run Graphs</button> -->
  </div>
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
