<script>
  import PrettyJson from "./PrettyJson.svelte"

  export let runtimeData
  export let pinnedData

  $: modes = {}
  function toggleMode(data) {
    modes[data] = modes[data] === 'json' ? 'input' : 'json'

    modes = modes
  }

  $: console.log(modes)
</script>

<div class="p-4">
  {#each pinnedData as data}
    <div class="card shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{data}
          <button class="btn" on:click={() => toggleMode(data)}>ToggleJSON</button>
        </h2>
        {#if modes[data] === 'json'}
          <PrettyJson data={JSON.parse(runtimeData[data])}/>
        {:else}
          <textarea bind:value={runtimeData[data]}></textarea>
        {/if}
      </div>
    </div>
  {/each}
</div>
