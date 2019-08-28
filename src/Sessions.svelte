<script>
    import SessionItem from './SessionItem.svelte';
    import { db } from './firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';

    // User ID passed from parent
    export let creatorUid;

    // Form Text
    let isEnrollmentOpen = true;
    let sessionName = '';
    let start = new Date();
    let durationMinutes = 45;
    let studentList = ['Corey','Johnny'];
    let instructorList = ['Confucious'];
    let type = 'Rebel Flow';


    // Query requires an index, see screenshot below
    const query = db.collection('sessions').where('isEnrollmentOpen', '==', true).orderBy('start');

    const sessions = collectionData(query, 'id').pipe(startWith([]));

    function add() {
        console.log("db write: ", {isEnrollmentOpen, creatorUid, sessionName, start, durationMinutes, studentList, instructorList, type});
        db.collection('sessions').add({isEnrollmentOpen, creatorUid, sessionName, start, durationMinutes, studentList, instructorList, type});
        sessionName = '';
    }

     function updateStatus(event) {
         const { id, newStatus } = event.detail;
         db.collection('sessions').doc(id).update({ isEnrollmentOpen: newStatus });
     }

     function removeItem(event) {
         const { id } = event.detail;
         db.collection('sessions').doc(id).delete();
     }

</script>

<style>
    #add-session{
        display: inline;
        align-self: flex-start
        }
    input { display: flex }
</style>

<ul>
	{#each $sessions as session}
        <SessionItem {...session} on:remove={removeItem} on:toggle={updateStatus} />
        
	{/each}
</ul>

<div id="add-session">
    <input placeholder="Class Name" bind:value={sessionName}>

    <button on:click={add}>Add Session</button>
</div>