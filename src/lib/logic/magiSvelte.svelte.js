import { initializeMagi, getRuntime, setRuntime } from '$lib/logic/magi';

export let runtime = $state({});

export function reinitializeMagi() {
  // for (let key in runtime) {
  //   delete runtime[key];
  // }
  initializeMagi(runtime);
  setRuntime(runtime);
}

reinitializeMagi();
