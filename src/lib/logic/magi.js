import * as magi from 'magi-lib';
import { persisted } from 'svelte-persisted-store';

let fs = require('fs');

export const magiFilename = persisted('magiFilename', '');
export const rivetFilename = persisted('rivetFilename', '');
export const api = persisted('api', {
	apiKey: '',
	organizationId: '',
	endpointUrl: ''
});

let currentRuntime;

magiFilename.subscribe((value) => {
	fs.readFile(value, 'utf8', (err, data) => {
		if (err) throw err;

		magi.loadMagiProject(currentRuntime, data);
	});
});

rivetFilename.subscribe((value) => {
	fs.readFile(value, 'utf8', (err, data) => {
		if (err) throw err;

		magi.loadRivetProject(currentRuntime, data);
	});
});

export function initializeMagi(options) {
	if (!options)
		options = {
			local: true
		};
	if (options.local) {
		currentRuntime = magi.createRuntime({}, {});
	} else {
		currentRuntime = magi.createRuntime(
			{},
			{
				...options,
				remote: true
			}
		);
	}

	return currentRuntime;
}

export function setRuntime(runtime) {
	currentRuntime = runtime;
}

export function getRuntime() {
	return currentRuntime;
}
