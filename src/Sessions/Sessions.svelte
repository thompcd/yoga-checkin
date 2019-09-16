<script>
    import SessionItem from './SessionItem.svelte';
    import { db } from '../firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';
    import { primaryAColor } from '../style-constants';
    import Datepicker from '../Calendar/Datepicker.svelte';
    import { createEventDispatcher } from 'svelte';

    let threeDaysInPast;
	$: {
	  const date = new Date(today);
	  date.setDate(date.getDate() - 3);
	  threeDaysInPast = date;
	}

	let tomorrow;
	$: {
	  const date = new Date(today);
	  date.setDate(date.getDate() + 1);
	  tomorrow = date;
	}

	let inThirtyDays;
	$: {
	  const date = new Date(start);
	  date.setDate(date.getDate() + 365);
	  inThirtyDays = date;
	}
    
    // User ID passed from parent
    export let lowerDateRange = threeDaysInPast;
    export let upperDateRange = tomorrow;

    const today = new Date();
    const dispatch = createEventDispatcher();
	let start = new Date();
	let dateFormat = '#{l}, #{F} #{j}, #{Y}';
	let noWeekendsSelectableCallback = (date) => date.getDay() !== 0 && date.getDay() !== 6;
	let formattedSelected;
    let dateChosen = false;
	let exampleFormatted = false;
    let exampleChosen = false;
    let selected = new Date();
    let studentList = [];
	
	$: end = new Date(start.getTime() + 1000 * 3600 * 24 * 720);

    // Query requires an index, see screenshot below
    const query = db.collection('sessions')
        .where('start', '<=', toUpperDate(upperDateRange))
        .where('start', '>=', toLowerDate(lowerDateRange))
        .orderBy('start');

    // use for finding all classes with student
    //citiesRef.where("regions", "array-contains", "west_coast")

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

     function updateStatus(event) {
         const { id, newStatus } = event.detail;
         db.collection('sessions').doc(id).update({ isEnrollmentOpen: newStatus });
     }

     function removeItem(event) {
         const { id } = event.detail;
         db.collection('sessions').doc(id).delete();
         notify('Successfully removed session');
     }

     function addStudent(event) {
        const { id, newStudent } = event.detail;
        console.log("existing list:", studentList);
        console.log("adding student", id, newStudent);
        db.collection('sessions').doc(id).update({studentList: [...studentList, newStudent]});
        console.log("new list:", studentList);
        notify('Successfully added student', 'is-bottom');
    }

    function notify(status, position) {
		dispatch('notify', { status, position });
	}

</script>
<div class="inline" >
    <Datepicker bind:dateChosen 
        bind:selected
        format="{dateFormat}"
        start={threeDaysInPast}
        end={inThirtyDays}
        selectableCallback={noWeekendsSelectableCallback}
    />
</div>
<ul class="session-entry">
	{#each $sessions as session}
        <div class="session-item-wrapper">
            <SessionItem class="session-item" {...session} 
            on:remove={removeItem} 
            on:toggle={updateStatus} 
            on:addStudent={addStudent} />
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

    .session-entry{
        list-style: none;
    }

    .inline{
        display:inline-flex;
        align-items: end;
    }

</style>