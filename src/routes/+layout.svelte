<script>
  import Settings from '$lib/components/Settings.svelte'
	import '../app.css';
	import { rivetFilename, magiFilename } from '$lib/logic/magi';
	import { runtime } from '$lib/logic/magiSvelte.svelte.js';
	import { get } from 'svelte/store';


	let { children } = $props();

  let modalNode;
  // let timeout2 = setTimeout(() => {
  //   api.apiKey = 'test';
  // }, 2000);

  // $effect(() => {
  //   console.log(api.apiKey);
  // })
</script>

<div class="navbar bg-base-100 p-4 w-full box-border">
  <div class="flex-1 flex flex-col items-start">
    <div>Rivet Project: {$rivetFilename}</div>
    <div>Magi Project: {$magiFilename}</div>
  </div>
  <button class="btn" onclick={()=>modalNode.showModal()}>settings</button>
  <dialog bind:this={modalNode} class="modal">
    <div class="modal-box">
      <Settings {magiFilename} {rivetFilename} {runtime} />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</div>
{@render children()}
