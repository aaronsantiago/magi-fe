<script>
  import CodeMirror from 'svelte-codemirror-editor'
  import { StreamLanguage, defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language'
  import { lua } from '@codemirror/legacy-modes/mode/lua'
  import { oneDark } from "@codemirror/theme-one-dark";
  // import "codemirror-mode-luau";

  export let scripts
  export let status

  let extensions = [
    StreamLanguage.define(lua),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true })
  ]

  let newScriptNameEl;

  function addScript() {
    let scriptName = newScriptNameEl.value;
    if (!(scriptName in scripts)) {
      scripts[scriptName] = {
        type: "input",
        script: ""
      };
      newScriptNameEl.value = "";
    }
    scripts = scripts;
  }

  let scriptNodes = {};

  function setScriptContent(node, content) {
    scriptNodes[node] = content;
  }

  function setScriptType(script, type) {
    scripts[script].type = type
    scripts = scripts
  }

  $: for (let script in scripts) {
    setScriptContent(script, scripts[script].script)
  }

  function updateScript(script) {
    console.log(scriptNodes, script, scriptNodes[script])
    scripts[script].script = scriptNodes[script]
    scripts = scripts
  }

  function deleteScript(script) {
    delete scripts[script]
    scripts = scripts;
  }
  console.log(scripts)
</script>

<div class="grid gap-4 py-4 grid-cols-2 w-full h-64">
  {#each Object.keys(scripts) as script}
    <div class={"card shadow-xl h-full " + (status?.scripts.indexOf(script) > -1 ? "bg-lime-900" : "bg-base-100")}>
      <div class="card-body h-full">
        <h2 class="card-title">{script}
          <button class="btn" on:click={()=>deleteScript(script)}>delete</button>
          <div class="dropdown absolute top-0 right-0">
          <div tabindex="0" role="button" class="btn m-1"> {scripts[script].type}</div>
          <ul
            tabindex="0"
            class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li><a on:click={() => setScriptType(script, "input")}>input</a></li>
            <li><a on:click={() => setScriptType(script, "output")}>output</a></li>
          </ul>
        </div></h2>
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
    <input class="input" bind:this={newScriptNameEl}/>
    <button class="btn" on:click={addScript}> add</button>
  </div>
</div>
