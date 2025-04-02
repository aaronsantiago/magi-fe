<script>
	import { get } from 'svelte/store';
	import { saveMagiFile } from '$lib/logic/magi';
	import * as magi from '$lib/logic/magi';
	import * as magiApi from 'magi-lib';
	import { reinitializeMagi } from '$lib/logic/magiSvelte.svelte';

	const { dialog, getCurrentWindow } = require('@electron/remote');

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
		magi.rivetFilename.set(filename);
	};

	const pickMagiFile = async () => {
		let filePick = await dialog.showOpenDialog(getCurrentWindow(), {
			properties: ['openFile'],
			filters: [{ name: 'Magi Project', extensions: ['magi'] }]
		});
		let filename = filePick.filePaths[0];
		magi.magiFilename.set(filename);
	};

	const saveMagiFileCallback = async (filename) => {
		if (!filename || typeof filename !== 'string') {
			filename = get(magi.magiFilename);
		}
		console.log('saving magi file', filename);

		saveMagiFile(filename);

		magi.magiFilename.set(filename);
	};

	const pickSaveMagiFile = async () => {
		let file = await dialog.showSaveDialog(getCurrentWindow(), {
			properties: ['openFile'],
			filters: [{ name: 'Magi Project', extensions: ['magi'] }]
		});
		console.log('file: ', file);
		if (!file.canceled) {
			saveMagiFileCallback(file.filePath);
		}
	};

	$: apiKey = runtime.api.apiKey;
	$: organizationId = runtime.api.organizationId;
	$: endpointUrl = runtime.api.endpointUrl;

	$: {
		console.log('settings updated', apiKey, organizationId, endpointUrl);
		magiApi.updateRuntime(runtime, { api: { apiKey, organizationId, endpointUrl } });
	}

	let { hostMagi, useSocketIO, socketIOUrl, socketIOBase, loadLocalMagiFile, loadLocalRivetFile } =
		magi;
</script>

<div>
	<button class="btn" on:click={pickRivetFile}>Load Rivet</button>
	<button class="btn" on:click={pickMagiFile}>Load Magi</button>
	<button class="btn" on:click={saveMagiFileCallback}>Save Magi</button>
	<button class="btn" on:click={pickSaveMagiFile}>Save Magi As</button>
	<div class="flex flex-col gap-3 max-h-[50vh] overflow-y-scroll">
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
		<div class="h-5"></div>
		<button class="btn" on:click={reinitializeMagi}>Restart Magi Runtime</button>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">host magi?</span>
			</div>
			<input type="checkbox" class="checkbox" bind:checked={$hostMagi} />
		</label>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">use socket IO</span>
			</div>
			<input type="checkbox" class="checkbox" bind:checked={$useSocketIO} />
		</label>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">socket IO url</span>
			</div>
			<input class="input input-bordered input-primary" bind:value={$socketIOUrl} />
		</label>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">socket IO base</span>
			</div>
			<input class="input input-bordered input-primary" bind:value={$socketIOBase} />
		</label>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">load local magi file? (if not hosting)</span>
			</div>
			<input type="checkbox" class="checkbox" bind:checked={$loadLocalMagiFile} />
		</label>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">load local rivet file? (if not hosting)</span>
			</div>
			<input type="checkbox" class="checkbox" bind:checked={$loadLocalRivetFile} />
		</label>
	</div>
</div>
