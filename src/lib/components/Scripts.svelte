<script>
	import CodeMirror from 'svelte-codemirror-editor';
	import { StreamLanguage, defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language';
	import { lua } from '@codemirror/legacy-modes/mode/lua';
	import { oneDark } from '@codemirror/theme-one-dark';
	import * as magi from 'magi-lib';
	import { getRuntime } from '$lib/logic/magi';

	export let runtime;

	let extensions = [
		StreamLanguage.define(lua),
		syntaxHighlighting(defaultHighlightStyle, { fallback: true })
	];

	let newScriptNameEl;

	function addScript() {
		let scriptName = newScriptNameEl.value;
		if (!(scriptName in runtime.scripts)) {
			runtime.scripts[scriptName] = {
				type: 'input',
				script: ''
			};
			newScriptNameEl.value = '';
		}
		runtime.scripts = runtime.scripts;
	}

	let scriptNodes = {};

	function setScriptContent(node, content) {
		scriptNodes[node] = content;
	}

	$: for (let script in runtime.scripts) {
		setScriptContent(script, runtime.scripts[script].script);
	}

	function updateScript(script) {
		runtime.scripts[script].script = scriptNodes[script];
		runtime.scripts = runtime.scripts;
	}

	function deleteScript(script) {
		delete runtime.scripts[script];
		runtime.scripts = runtime.scripts;
	}

	function executeScript(script) {
		magi.runScript(runtime, script);
	}
</script>

<div class="grid gap-4 py-4 grid-cols-2 w-full h-64">
  {#if runtime.scripts}
  	{#each Object.keys(runtime.scripts) as script}
  		<div
  			class={'card shadow-xl h-full ' +
  				(runtime.status?.scripts.indexOf(script) > -1 ? 'bg-lime-900' : 'bg-base-100')}
  		>
  			<div class="card-body h-full">
  				<button
  					class="btn btn-primary absolute top-0 right-0"
  					on:click={() => executeScript(script)}>Run</button
  				>
  				<h2 class="card-title">
  					{script}
  					<button class="btn" on:click={() => deleteScript(script)}>delete</button>
  				</h2>
  				<CodeMirror
  					class="w-full h-full"
  					value={runtime.scripts[script].script}
  					theme={oneDark}
  					on:change={(e) => setScriptContent(script, e.detail)}
  					{extensions}
  				></CodeMirror>
  				<button class="btn" on:click={() => updateScript(script)}>save</button>
  			</div>
  		</div>
  	{/each}
  {/if}
	<div>
		<input class="input" bind:this={newScriptNameEl} />
		<button class="btn" on:click={addScript}> add</button>
	</div>
</div>
