import { initializeMagi, getRuntime, setRuntime } from '$lib/logic/magi';

export let runtime = $state(initializeMagi());

setRuntime(runtime);

export function reinitializeMagi() {
  let newRuntime = initializeMagi();
  for (let key in newRuntime) {
    runtime[key] = newRuntime[key];
  }
  console.log(newRuntime);
  setRuntime(runtime);
}
