import * as magi from 'magi-lib';
import { persisted } from 'svelte-persisted-store';
import { get } from 'svelte/store';

let fs = require('fs');
const chokidar = require('chokidar');

export const hostMagi = persisted('hostMagi', true);
export const useSocketIO = persisted('useSocket', false);
export const socketIOUrl = persisted('socketIOUrl', '');
export const socketIOBase = persisted('socketIOBase', 'magi');

export const loadLocalMagiFile = persisted('loadLocalMagiFile', false);
export const loadLocalRivetFile = persisted('loadLocalMagiFile', false);

export const magiFilename = persisted('magiFilename', '');
export const rivetFilename = persisted('rivetFilename', '');

let currentRuntime;

function _loadMagiFile(filename) {
  fs.readFile(filename, 'utf8', (err, data) => {
		if (err) {
			console.log('Error reading magi file:', err);
			return;
		}

		magi.loadMagiProject(currentRuntime, data);
	});
}

magiFilename.subscribe((filename) => {
  _loadMagiFile(filename);
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
function _loadRivetFile(filename) {
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
}
rivetFilename.subscribe((filename) => {
  _loadRivetFile(filename);
});

export function initializeMagi(options) {
	if (!options) {
		options = {
			remote: !get(hostMagi)
		};
		if (get(useSocketIO)) {
			options.socketAddress = get(socketIOUrl);
      options.socketPrefix = get(socketIOBase);
		}
	}

	currentRuntime = magi.createRuntime({}, options);

  let _magiFilename = get(magiFilename);
  let _rivetFilename = get(rivetFilename);

  if (_magiFilename) {
    _loadMagiFile(_magiFilename);
  }
  if (_rivetFilename) {
    _loadRivetFile(_rivetFilename);
  }

	return currentRuntime;
}

export function setRuntime(runtime) {
	currentRuntime = runtime;
}

export function getRuntime() {
	return currentRuntime;
}
