<script>
  export let graphData
  export let graphScripts
  export let runtimeData
  export let scripts
  export let status

  console.log('graphScripts', graphScripts)

  $: scriptNames = Object.keys(scripts)

  function addScript(graph, script) {
    if (!graphScripts[graph] || !(graphScripts[graph].indexOf(script) > -1)) {
      graphScripts[graph] = graphScripts[graph] || []
      graphScripts[graph].push(script)

      graphScripts = graphScripts
    }
  }

  function removeScript(graph, script) {
    let scripts = graphScripts[graph]

    if (scripts.indexOf(script) > -1) {
      scripts.splice(scripts.indexOf(script))
    }

    graphScripts = graphScripts
  }
  $: console.log(status);
</script>

<div class="grid grid-cols-1 gap-4 py-4 w-1/3">
  {#each Object.keys(graphData).filter((name) => !name.startsWith('_')) as graph}
    <div class={"card w-full shadow-xl " + (status?.graphs.indexOf(graph) > -1 ? "bg-lime-900" : "bg-base-100")}>
      <div class="card-body relative">
        <div class="dropdown absolute top-0 right-0">
          <div tabindex="0" role="button" class="btn m-1">scripts</div>
          <ul
            tabindex="0"
            class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            {#each scriptNames as script}
              <li><a on:click={() => addScript(graph, script)}>{script}</a></li>
            {/each}
          </ul>
        </div>
        <h2 class="card-title">{graph}</h2>
        <p>
          inputs:
          {#if graphData[graph].inputs}
            {#each Object.keys(graphData[graph].inputs) as input}
              {#if runtimeData[input]}
                <div class="badge badge-primary">{input}</div>
              {:else}
                <div class="badge badge-secondary">{input}</div>
              {/if}
            {/each}
          {/if}
        </p>
        <p>
          outputs:
          {#if graphData[graph].inputs}
            {#each Object.keys(graphData[graph].outputs) as output}
              {#if runtimeData[output]}
                <div class="badge badge-primary">{output}</div>
              {:else}
                <div class="badge badge-secondary">{output}</div>
              {/if}
            {/each}
          {/if}
        </p>
        {#if graphScripts[graph] && graphScripts[graph].length > 0}
          <p>
            graphScripts:
            {#each graphScripts[graph] as script}
              <button class="btn" on:click={() => removeScript(graph, script)}>{script}</button>
            {/each}
          </p>
        {/if}
      </div>
    </div>
  {/each}
</div>
