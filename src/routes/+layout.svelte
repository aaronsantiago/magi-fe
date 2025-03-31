<script>
  import Settings from '$lib/components/Settings.svelte'
	import '../app.css';
	import { rivetFilename, magiFilename, api } from '$lib/logic/magi';
	import { get } from 'svelte/store';

	console.log(get(api));

	let { children } = $props();

  let modalNode;
  // let timeout2 = setTimeout(() => {
  //   api.apiKey = 'test';
  // }, 2000);

  // $effect(() => {
  //   console.log(api.apiKey);
  // })

  $effect(() => {
    for (const key in api) {
      console.log(key, api[key]);
    }
  })
</script>

<div class="navbar bg-base-100 p-4 w-full box-border">
  <div class="flex-1 flex flex-col items-start">
    <div>Rivet Project: {$rivetFilename}</div>
    <div>Magi Project: {$magiFilename}</div>
  </div>
  <button class="btn" onclick={()=>modalNode.showModal()}>settings</button>
  <dialog bind:this={modalNode} class="modal">
    <div class="modal-box">
      <Settings {rivetFilename} {magiFilename} {api} />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
  <!-- <button class="btn" on:click={updateGraphs}>Run Graphs</button> -->
</div>
{@render children()}
