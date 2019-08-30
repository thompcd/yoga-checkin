<script>
    import SessionItem from './SessionItem.svelte';
    import { db } from './firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';
    import { primaryAColor } from './style-constants';

    // User ID passed from parent
    export let creatorUid;

    // Form Text
    let isEnrollmentOpen = true;
    let sessionName = '';
    let start = new Date();
    let temp = new Date(start);
    let tomorrow = new Date().setDate(temp.getDate() + 1);
    let yesterday = new Date().setDate(temp.getDate() - 1);
    let durationMinutes;
    let studentList = '';
    let instructorList = '';
    let type = '';

    // Query requires an index, see screenshot below
    const query = db.collection('sessions')
        .where('start', '<', start)
        //.where('start', '>', yesterday)
        .orderBy('start');

    // use for finding all classes with student
    //citiesRef.where("regions", "array-contains", "west_coast")

    const sessions = collectionData(query, 'id').pipe(startWith([]));

    function add() {
        console.log("db write: ", {isEnrollmentOpen, creatorUid, sessionName, start, durationMinutes, studentList, instructorList, type});
        db.collection('sessions').add({isEnrollmentOpen, creatorUid, sessionName, start, durationMinutes, studentList, instructorList, type});
        sessionName = '';
        start = new Date();
        durationMinutes = '';
        instructorList = '';
        type = ''
        isEnrollmentOpen = true;
    }

     function updateStatus(event) {
         const { id, newStatus } = event.detail;
         db.collection('sessions').doc(id).update({ isEnrollmentOpen: newStatus });
     }

     function removeItem(event) {
         const { id } = event.detail;
         db.collection('sessions').doc(id).delete();
     }

     function addStudent(event) {
        const { id, newStudent } = event.detail;
        console.log("adding student", id, newStudent);
        db.collection('sessions').doc(id).update({studentList: [...studentList, newStudent]});
    }

    function displaySuccess(){

    }

</script>

<form id="add-session" style="background-color:{primaryAColor};">
    <label>Class Name </label>
    <input required placeholder="e.g. Rebel Flow" bind:value={sessionName}>
    <label>Class Type</label>
    <input required placeholder="e.g. Meditation" bind:value={type}>
    <label>Class Duration</label>
    <input required type=number min=0 placeholder="Minutes" bind:value={durationMinutes}>
    <label>Class Instructor</label>
    <input required placeholder="Name" bind:value={instructorList}>

    <div class="check-label">
        <input class="checkbox" type="checkbox" bind:checked={isEnrollmentOpen}>
        {#if isEnrollmentOpen}
        <p>Open for enrollment</p>
        {:else}
        <p class="is-closed">Open for enrollment</p>
        {/if}
    </div>

    <div>        
        <button on:click={add}>Add Session</button>
        <div class="success-msg"></div>
    </div>

</form>

<ul class="session-entry">
	{#each $sessions as session}
        <div class="session-item-wrapper">
            <SessionItem class="session-item" {...session} on:remove={removeItem} on:toggle={updateStatus} on:addStudent={addStudent} />
        </div>
	{/each}
</ul>

<style>

    ul{
        padding:0px;
    }

    .session-item-wrapper{
        width: 100%;
    }

    #add-session{
        display: inline;
        padding: 16px;
        border-radius: 8px;
    }

    input { display: flex }

    .session-entry{
        list-style: none;
    }

    .is-closed{
        text-decoration: line-through;
    }

    .check-label{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;
        padding-bottom: 8px;
    }
    .check-label p{
        padding-left: 8px;
    }
    .check-label .checkbox{
        align-content: middle;
    }
</style>