<script>
	import CodeMirror from 'svelte-codemirror-editor';
	import { StreamLanguage, defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language';
	import { lua } from '@codemirror/legacy-modes/mode/lua';
	import { oneDark } from '@codemirror/theme-one-dark';
	import * as magi from 'magi-lib';
	import { getRuntime } from '$lib/logic/magi';

	export let scripts;
	export let status;

	let extensions = [
		StreamLanguage.define(lua),
		syntaxHighlighting(defaultHighlightStyle, { fallback: true })
	];

	let newScriptNameEl;

	function addScript() {
		let scriptName = newScriptNameEl.value;
		if (!(scriptName in scripts)) {
			scripts[scriptName] = {
				type: 'input',
				script: ''
			};
			newScriptNameEl.value = '';
		}
		scripts = scripts;
	}

	let scriptNodes = {};

	function setScriptContent(node, content) {
		scriptNodes[node] = content;
	}

	function setScriptType(script, type) {
		scripts[script].type = type;
		scripts = scripts;
	}

	$: for (let script in scripts) {
		setScriptContent(script, scripts[script].script);
	}

	function updateScript(script) {
		scripts[script].script = scriptNodes[script];
		scripts = scripts;
	}

	function deleteScript(script) {
		delete scripts[script];
		scripts = scripts;
	}

	function executeScript(script) {
		magi.runScript(getRuntime(), script);
	}
</script>

<div class="grid gap-4 py-4 grid-cols-2 w-full h-64">
	{#each Object.keys(scripts) as script}
		<div
			class={'card shadow-xl h-full ' +
				(status?.scripts.indexOf(script) > -1 ? 'bg-lime-900' : 'bg-base-100')}
		>
			<div class="card-body h-full">
				<h2 class="card-title">
					{script}
					<button class="btn" on:click={() => deleteScript(script)}>delete</button>
					<button class="btn" on:click={() => executeScript(script)}>execute</button>
				</h2>
				<CodeMirror
					class="w-full h-full"
					value={scripts[script].script}
					theme={oneDark}
					on:change={(e) => setScriptContent(script, e.detail)}
					{extensions}
				></CodeMirror>
				<button class="btn" on:click={() => updateScript(script)}>save</button>
			</div>
		</div>
	{/each}
	<div>
		<input class="input" bind:this={newScriptNameEl} />
		<button class="btn" on:click={addScript}> add</button>
	</div>
</div>
