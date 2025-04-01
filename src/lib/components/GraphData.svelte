<script>
	import { getRuntime } from '$lib/logic/magi';
	import * as magi from 'magi-lib';

	export let runtime;

	$: scriptNames = Object.keys(runtime.scripts);

	function runGraph(graph) {
		magi.runGraph(runtime, graph);
	}
</script>

<div class="grid grid-cols-1 gap-4 py-4 w-1/3">
	{#if runtime?.graphData}
		{#each Object.keys(runtime.graphData).filter((name) => !name.startsWith('_')) as graph}
			<div
				class={'card w-full shadow-xl ' +
					(runtime.status?.graphs.indexOf(graph) > -1 ? 'bg-lime-900' : 'bg-base-100')}
			>
				<div class="card-body relative">
					<button class="btn btn-primary absolute top-0 right-0" on:click={() => runGraph(graph)}
						>Run</button
					>
					<h2 class="card-title">{graph}</h2>
					<div>
						inputs:
						{#if runtime.graphData[graph].inputs}
							{#each Object.keys(runtime.graphData[graph].inputs) as input}
								{#if runtime.runtimeData[input]}
									<div class="badge badge-primary">{input}</div>
								{:else}
									<div class="badge badge-secondary">{input}</div>
								{/if}
							{/each}
						{/if}
					</div>
					<div>
						outputs:
						{#if runtime.graphData[graph].inputs}
							{#each Object.keys(runtime.graphData[graph].outputs) as output}
								{#if runtime.runtimeData[output]}
									<div class="badge badge-primary">{output}</div>
								{:else}
									<div class="badge badge-secondary">{output}</div>
								{/if}
							{/each}
						{/if}
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>
