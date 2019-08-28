<script>

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    
    function remove() {
		dispatch('remove', { id });
	}

	function toggleStatus() {
        let newStatus = !isEnrollmentOpen;
		dispatch('toggle', {
            id,
            newStatus
        });
    }
    
    export let id; // document ID
    export let creatorUid
    export let sessionName;
    export let type;
    export let isEnrollmentOpen;
    export let durationMinutes;
    export let studentList;
    export let instructorList;
    export let start;

</script>

<style>

</style>


<li>

{#if isEnrollmentOpen}
    <span></span>
    <span class="is-open">{ sessionName }</span>
    <button on:click={toggleStatus}> Disable enrollment 🚫 </button>
{/if}

<button on:click={remove}> ➖ </button>

</li>