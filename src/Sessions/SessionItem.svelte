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
        if (isEnrollmentOpen){
            enrollIconURL = './img/lock-deactivate.svg';
        }
        else{
            enrollIconURL = './img/lock-activate.svg';
        }
    }
    
    export let id; // document ID
    export let creatorUid
    export let sessionName;
    export let type;
    export let isEnrollmentOpen = true;
    export let durationMinutes;
    export let studentList = [];
    export let instructorList;
    export let start;
    export let newStudent = '';
    export let detailView = false;
    let enrollIconURL = './img/lock-activate.svg';

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
        width: 220px;
        border-radius: 8px;
        background-color: white;
    }

    #title-row{
        display: flex;
        justify-content: space-between;
    }

    .inline-row{
        display: inline-flex;
        vertical-align: middle;
    }

    .row{
        display: flex;
        flex-direction: row;
    }

    .column{
        display: flex;
        flex-direction: column;
    }

    input{
        width: 150px;
    }

    .icon{
        width: 24px;
        height: 24px;
        -moz-transition: all .3s linear;
        -webkit-transition: all .3s linear;
        transition: all .3s linear;
        user-select: none; /* supported by Chrome and Opera */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
    }

    .icon:hover{
        cursor: pointer;
    }

    .detailView{
        -ms-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }

    .session-text{
        padding: 0;
        margin: 0;
    }

    .remove-student-icon{
        margin-right: 8px;
        width: 16px;
    }

    #add-student-icon{
        margin-left: 4px;
        width: 16px;
        margin-top: 4px;
    }

    .box{
        -webkit-box-shadow: 16px 16px 10px -19px rgba(0,0,0,1);
        -moz-box-shadow: 16px 16px 10px -19px rgba(0,0,0,1);
        box-shadow: 16px 16px 10px -19px rgba(0,0,0,1);
        margin-bottom: 16px;
    }
</style>


<div class="item-wrapper box">
    <li class="session-item">
        <div class="row" id="title-row">
            <h3 class="session-text">{ sessionName }</h3>
            <svg class="icon" class:detailView on:click={toggleDetailView}>
                <path></path>
            </svg>
            <img class="icon" class:detailView src='./img/expand-arrow.svg' alt='expand' on:click={toggleDetailView}>
        </div>
        {#if detailView}
        <div transition:slide>
            <div class="inline-row">
                <img class="icon" src='./img/trash.svg' alt='delete' on:click={remove}>
            </div>
            <div class="inline-row">
                <img class="icon" src={enrollIconURL} class:isEnrollmentOpen  alt='un/lock enrollment' on:click={toggleStatus}>
            </div>
            <br>Students:
            <ul class="students detail-view column">
                {#each studentList as student}
                <div class="inline-row">
                    <img class="icon remove-student-icon" src='./img/delete-circle.svg' alt='delete' on:click={removeStudent}>{student}
                </div>
                {/each}
            </ul>
            <div class="row detail-view">
                <div class="inline-row">
                    <input required placeholder="New student" bind:value={newStudent}>
                    <img class="icon" id="add-student-icon" src='./img/add-circle.svg' alt='add' on:click={addStudent}>
                </div>
            </div>
        </div>
        {/if}
    </li>
</div>