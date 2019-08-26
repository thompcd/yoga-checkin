<script>
    import { db } from './firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';

    import Session from 'Session.svelte';

    // User ID passed from parent
    export let uid;

    // Form Text



    // Query requires an index, see screenshot below
    const query = db.collection('sessions').where('uid', '==', uid).orderBy('created');

    const sessions = collectionData(query, 'id').pipe(startWith([]));

    function add() {
        db.collection('sessions').add({ uid, sessionName, start, duration, studentList, instructorList, type});
        sessionName = '';
    }

    // function updateStatus(event) {
    //     const { id, newStatus } = event.detail;
    //     db.collection('todos').doc(id).update({ complete: newStatus });
    // }

    // function removeItem(event) {
    //     const { id } = event.detail;
    //     db.collection('todos').doc(id).delete();
    // }
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
        <TodoItem {...session} on:remove={removeItem} on:toggle={updateStatus} />
        
	{/each}
</ul>

<div id="add-task">
    <input bind:value={Session.sessionName}>

    <button on:click={add}>Add Session</button>
</div>