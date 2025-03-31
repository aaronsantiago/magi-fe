<script>
  // import { ipcCacheSend } from "../logic/ipcCacheSend"
  import { get } from 'svelte/store'

  export let rivetFilename;
  export let magiFilename;
  export let api;

  const pickRivetFile = async () => {
    let filename = await window.electron.ipcRenderer.invoke('pickRivetFile');
    rivetFilename.set(filename)
  }

  const pickMagiFile = async () => {
    let filename = await window.electron.ipcRenderer.invoke('pickMagiFile');
    magiFilename.set(filename)
  }

  const saveMagiFile = async (filename) => {
    if (!filename || typeof filename !== 'string') {
      filename = get(magiFilename);
    }
    console.log('saving magi file', filename)
    // await ipcCacheSend('saveMagiFile', filename);
    magiFilename.set(filename)
  }

  const pickSaveMagiFile = async () => {
    let filename = await window.electron.ipcRenderer.invoke('pickSaveMagiFile');
    saveMagiFile(filename);
  }

  $: if ($rivetFilename) {
    // ipcCacheSend('loadRivetFile', $rivetFilename)
    console.log('loading rivet project',  $rivetFilename)
  }

  $: if ($magiFilename) {
    // ipcCacheSend('loadMagiFile', $magiFilename)
    console.log('loading magi project',  $magiFilename)
  }
</script>

<div>
  <button class="btn" on:click={pickRivetFile}>Load Rivet</button>
  <button class="btn" on:click={pickMagiFile}>Load Magi</button>
  <button class="btn" on:click={saveMagiFile}>Save Magi</button>
  <button class="btn" on:click={pickSaveMagiFile}>Save Magi As</button>
  <label class="form-control w-full max-w-xs">
    <div class="label">
      <span class="label-text">api key</span>
    </div>
    <input class="input input-bordered input-primary" bind:value={api.apiKey} />
  </label>
  <label class="form-control w-full max-w-xs">
    <div class="label">
      <span class="label-text">organization id</span>
    </div>
    <input class="input input-bordered input-primary" bind:value={api.organizationId} />
  </label>
  <label class="form-control w-full max-w-xs">
    <div class="label">
      <span class="label-text">endpoint url</span>
    </div>
    <input class="input input-bordered input-primary" bind:value={api.endpointUrl} />
  </label>
</div>
