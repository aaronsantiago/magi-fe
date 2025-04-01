import * as magi from 'magi-lib';
import { persisted } from 'svelte-persisted-store';
import { get } from 'svelte/store';

let fs = require('fs');
const chokidar = require('chokidar');

export const magiFilename = persisted('magiFilename', '');
export const rivetFilename = persisted('rivetFilename', '');

let currentRuntime;

magiFilename.subscribe((value) => {
	fs.readFile(value, 'utf8', (err, data) => {
		if (err) {
			console.log('Error reading magi file:', err);
			return;
		}

		magi.loadMagiProject(currentRuntime, data);
	});
});

export function saveMagiFile(filename) {
	let fileContent = JSON.stringify(magi.makeSerializeable(currentRuntime), null, 2);
	console.log('saving magi file', fileContent);
	fs.writeFile(filename, fileContent, (err) => {
		if (err) throw err;
		console.log('magi file saved');
	});
}

let rivetWatcher;
rivetFilename.subscribe((filename) => {
	console.log('rivetWatcher', filename);
	if (rivetWatcher) {
		rivetWatcher.close();
	}
	function readRivetProject() {
		fs.readFile(filename, 'utf8', (err, data) => {
			if (err) {
				console.log(err);
				return;
			}
			console.log('rivetWatcher load', data);
			magi.loadRivetProject(currentRuntime, data);
		});
	}
	rivetWatcher = chokidar.watch(filename, {
		persistent: true
	});
	rivetWatcher.on('change', async () => {
		readRivetProject();
	});
	readRivetProject();
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
