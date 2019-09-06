<script>
    import SessionItem from './SessionItem.svelte';
    import { db } from '../firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';
    import { primaryAColor } from '../style-constants';

    // User ID passed from parent
    export let creatorUid;
    export let lowerDateRange;
    export let upperDateRange;
    let start;
        // Form Text
    let isEnrollmentOpen = true;
    let sessionName = '';
    let durationMinutes;
    let studentList = '';
    let instructorList = '';
    let type = '';

    // Query requires an index, see screenshot below
    const query = db.collection('sessions')
        .where('start', '<=', toUpperDate(upperDateRange))
        .where('start', '>=', toLowerDate(lowerDateRange))
        .orderBy('start');

    const sessions = collectionData(query, 'id').pipe(startWith([]));

    function toUpperDate(date) {
        var result = new Date(date);
        result.setHours(24,0,0,0);
        return new Date(result);
    }

    function toLowerDate(date) {
        var result = new Date(date);
        result.setHours(0,0,0,0);
        return new Date(result);
    }

    function test() {
        console.log("db write: ", {isEnrollmentOpen, sessionName, start, durationMinutes, studentList, instructorList, type});
        console.log("Yesterday", toLowerDate(lowerDateRange))
        console.log("tomorrow", toUpperDate(upperDateRange))
    }

    function add() {
        start = new Date();
        console.log("db write: ", {isEnrollmentOpen, creatorUid, sessionName, start, durationMinutes, studentList, instructorList, type});
        db.collection('sessions').add({isEnrollmentOpen, creatorUid, sessionName, start, durationMinutes, studentList, instructorList, type});
        sessionName = '';
        durationMinutes = '';
        instructorList = '';
        type = ''
        isEnrollmentOpen = true;
    }

</script>

<form id="add-session" class="box">
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

<style>

    form{
        background-color: white;
    }
    #add-session{
        padding: 16px;
        border-radius: 8px;
    }

    .box{
        -webkit-box-shadow: 16px 16px 10px -19px rgba(0,0,0,1);
        -moz-box-shadow: 16px 16px 10px -19px rgba(0,0,0,1);
        box-shadow: 16px 16px 10px -19px rgba(0,0,0,1);
    }
    input { display: flex }

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

    button{
    border-radius: 24px;
    background-color: #c93756;
    border-color: #c93756;
    color: white;
    transition: background-color 0.4s ease,
              border-color 0.3s ease;
    }
    button:hover{
        background-color: white;
        color: black;
        border-color: #c93756;
    }

</style>