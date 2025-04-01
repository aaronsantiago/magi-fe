<script>
	import { getRuntime } from '$lib/logic/magi';
	import * as magi from 'magi-lib';

	export let runtime;

	function handleChange(event) {
		const { name, value } = event.target;
		runtime.runtimeData[name] = value;
		magi.updateRuntimeData(getRuntime(), {
			[name]: value
		});
	}

	let newFieldName, newFieldValue;

	function addField() {
		runtime.runtimeData[newFieldName.value] = newFieldValue.value;
		newFieldName.value = '';
		newFieldValue.value = '';
	}

	function removeField(fieldName) {
		delete runtime.runtimeData[fieldName];
		runtime.runtimeData = { ...runtime.runtimeData };
	}

	function togglePin(data) {
		if (runtime.pinnedData.indexOf(data) > -1) {
		runtime.pinnedData.splice(runtime.pinnedData.indexOf(data), 1);
		} else {
			runtime.pinnedData.push(data);
		}

		runtime.pinnedData = runtime.pinnedData;
	}
</script>

<div class="p-4">
	<table class="table table-xs">
		<thead>
			<tr class="w-full flex justify-between">
				<th>Field</th>
				<th class="flex-end">Value</th>
			</tr>
		</thead>
		{#each Object.keys(runtime.runtimeData) as data}
			<tr class="w-full flex">
				<td>
					<button class="btn" on:click={() => removeField(data)}>Remove</button>
					<button class="btn" on:click={() => togglePin(data)}>Pin</button>
					{data}
				</td>
				<td class="flex-grow"
					><input
						type="text"
						value={runtime.runtimeData[data]}
						name={data}
						on:change={handleChange}
						class="input w-full"
					/></td
				>
			</tr>
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
