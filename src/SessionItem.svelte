<script>
    import { slide } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    
    function toggleDetailView() {
        detailView = !detailView;
    }

    function remove() {
		dispatch('remove', { id });
	}

    function addStudent() {
		dispatch('addStudent', {
            id,
            newStudent });
        newStudent = '';
    }

        function removeStudent() {
		dispatch('removeStudent', {
            id,
            studentId });
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
    export let newStudent = '';
    export let detailView = false;

</script>

<style>

    ul{
        padding-left: 8px;
    }

    li{
        list-style: none;
    }

    .item-wrapper{
        display: flex;
        justify-content: center;
        align-content: center;
        width: 100%;
        padding: 8px 0;
    }

    .session-item{
        display: flex;
        flex-direction: column;
        padding: 32px;
        width: 200px;
        background-color: pink;
        border-radius: 8px;
    }

    .row{
        display: inline;
    }

    input{
        width: 150px;
    }
</style>


<div class="item-wrapper">
    <li class="session-item">
        <div class="row">
            <button on:click={toggleDetailView}> 👉 </button>
            <span class="session-text">{ sessionName }</span>
        </div>
        {#if detailView}
        <div transition:slide>
            <div class="row">
                <button on:click={remove}> 🗑️ </button>
                <button on:click={toggleStatus}> 🚫 </button>
            </div>
            <br>Students:
            <ul class="students detail-view">
                {#each studentList as student}
                <div class="row">
                    <button on:click={removeStudent}> ➖ </button>{student}
                </div>
                {/each}
            </ul>
            <div class="row detail-view">
                <input required placeholder="New student" bind:value={newStudent}>
                <button on:click={addStudent}> ➕ </button>
            </div>
        </div>
        {/if}
    </li>
</div>