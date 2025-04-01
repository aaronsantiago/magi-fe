<script>
	import { get } from 'svelte/store';
	import { saveMagiFile } from '$lib/logic/magi';
	import * as magiApi from 'magi-lib';

	const { dialog, getCurrentWindow } = require('@electron/remote');

	export let rivetFilename;
	export let magiFilename;
	export let runtime;

	if (!runtime.api) {
	  runtime.api = {};
	}

	const pickRivetFile = async () => {
		let filePick = await dialog.showOpenDialog(getCurrentWindow(), {
			properties: ['openFile'],
			filters: [{ name: 'Rivet Project', extensions: ['rivet-project'] }]
		});
		let filename = filePick.filePaths[0];
		rivetFilename.set(filename);
	};

	const pickMagiFile = async () => {
		let filePick = await dialog.showOpenDialog(getCurrentWindow(), {
			properties: ['openFile'],
			filters: [{ name: 'Magi Project', extensions: ['magi'] }]
		});
		let filename = filePick.filePaths[0];
		magiFilename.set(filename);
	};

	const saveMagiFileCallback = async (filename) => {
		if (!filename || typeof filename !== 'string') {
			filename = get(magiFilename);
		}
		console.log('saving magi file', filename);

		saveMagiFile();

		// magiFilename.set(filename);
	};

	const pickSaveMagiFile = async () => {
		let filename = await window.electron.ipcRenderer.invoke('pickSaveMagiFile');
		saveMagiFileCallback(filename);
	};

	$: if ($rivetFilename) {
		console.log('loading rivet project', $rivetFilename);
	}

	$: if ($magiFilename) {
		console.log('loading magi project', $magiFilename);
	}

	$: apiKey = runtime.api.apiKey;
	$: organizationId = runtime.api.organizationId;
	$: endpointUrl = runtime.api.endpointUrl;

	$: {
		console.log("settings updated", apiKey, organizationId, endpointUrl);
		magiApi.updateRuntime(runtime, { api:{apiKey, organizationId, endpointUrl }});
	}

</script>

<div>
	<button class="btn" on:click={pickRivetFile}>Load Rivet</button>
	<button class="btn" on:click={pickMagiFile}>Load Magi</button>
	<button class="btn" on:click={saveMagiFileCallback}>Save Magi</button>
	<button class="btn" on:click={pickSaveMagiFile}>Save Magi As</button>
	<label class="form-control w-full max-w-xs">
		<div class="label">
			<span class="label-text">api key</span>
		</div>
		<input class="input input-bordered input-primary" bind:value={apiKey} />
	</label>
	<label class="form-control w-full max-w-xs">
		<div class="label">
			<span class="label-text">organization id</span>
		</div>
		<input class="input input-bordered input-primary" bind:value={organizationId} />
	</label>
	<label class="form-control w-full max-w-xs">
		<div class="label">
			<span class="label-text">endpoint url</span>
		</div>
		<input class="input input-bordered input-primary" bind:value={endpointUrl} />
	</label>
</div>
