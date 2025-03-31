<script>
  export let runtimeData
  export let pinnedData

  function handleChange(event) {
    const { name, value } = event.target
    runtimeData[name] = value
  }

  let newFieldName, newFieldValue

  function addField() {
    runtimeData[newFieldName.value] = newFieldValue.value
    newFieldName.value = ''
    newFieldValue.value = ''
  }

  function removeField(fieldName) {
    delete runtimeData[fieldName]
    runtimeData = { ...runtimeData }
  }

  function togglePin(data) {
    if (pinnedData.indexOf(data) > -1) {
      pinnedData.splice(pinnedData.indexOf(data),1)
    }
    else {
      pinnedData.push(data);
    }

    pinnedData = pinnedData;
  }
</script>

<div class="p-4">
  <table class="table table-xs">
    <thead>
      <tr class="w-full flex justify-between">
        <th>Field</th>
        <th class="flex-end">Value</th >
      </tr >
    </thead>
    {#each Object.keys(runtimeData) as data}
      <tr class="w-full flex">
        <td>
          <button class="btn" on:click={() => removeField(data)}>Remove</button>
          <button class="btn" on:click={() => togglePin(data)}>Pin</button>
          {data}
        </td>
        <td class="flex-grow"
          ><input
            type="text"
            value={runtimeData[data]}
            name={data}
            on:change={handleChange}
            class="input w-full"
          /></td
        >
      </tr >
    {/each}
  </table>
  <div class="flex flex-row gap-4 w-full">
      <input
        bind:this={newFieldName}
        type="text"
        class="input shrink w-1/3"
        placeholder="new field name"
      />
      <input
        bind:this={newFieldValue}
        type="text"
        class="input shrink w-1/3"
        placeholder="new field value"
      />
      <button class="btn" on:click={addField}>Add</button>
  </div>
</div>
