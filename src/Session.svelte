<script>

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    
    function remove() {
		dispatch('remove', { id });
	}

	function toggleStatus() {
        let newStatus = !complete;
		dispatch('toggle', {
            id,
            newStatus
        });
    }
    

    export let id; // document ID
    export let isEnrollmentOpen = true;
    
    export let sessionName = 'Random Class';
    export let start = new Date();
    export let duration = 45;
    export let studentList = ['Corey','Johnny'];
    export let instructorList = ['Confucious'];
    export let type = 'Rebel Flow';


</script>

<style>
    .is-open {
        text-decoration: line-through;
        color: green;
    }
</style>


<li>

{#if isEnrollmentOpen}
    <span class="is-open">{ sessionName }</span>
    <button on:click={toggleStatus}> ✔️ </button>
{:else}
    <span>{ sessionName }</span>
    <button on:click={toggleStatus}> ❌ </button>
{/if}

<button on:click={remove}> 🗑 </button>

</li>