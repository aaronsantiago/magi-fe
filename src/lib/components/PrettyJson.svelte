<script>
  export let data
</script>

<div>
  {#if data instanceof Array}
    <div class="grid w-full grid-cols-4 p-4">
      {#each data as item}
        <svelte:self data={item}/>
      {/each}
    </div>
  {:else if typeof data === 'object'}
    {#if Object.keys(data).length === 1}
      <svelte:self data={data[Object.keys(data)[0]]}/>
    {:else}
      <div class="grid w-full grid-cols-1 p-4">
        {#each Object.keys(data) as key}
          <div class="">
            <div class="font-bold">{key}</div>
            <svelte:self data={data[key]}/>
          </div>
        {/each}
      </div>
    {/if}
  {:else}
    {data}
  {/if}
</div>
