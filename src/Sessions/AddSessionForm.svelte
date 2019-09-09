<script>
    import SessionItem from './SessionItem.svelte';
    import { db } from '../firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';
    import { primaryAColor } from '../style-constants';
    import { Field, Input, Snackbar, Switch } from 'svelma'

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

    function add() {
        var formIsValid = verifyForm();
        if (formIsValid){
            start = new Date();
            console.log("db write: ", {isEnrollmentOpen, creatorUid, sessionName, start, durationMinutes, studentList, instructorList, type});
            db.collection('sessions').add({isEnrollmentOpen, creatorUid, sessionName, start, durationMinutes, studentList, instructorList, type});
            open("is-success","is-top-right")

        }
    }
    function open(type, position) {
        Snackbar.create({ message: 'I am a snack', type: 'is-success', position: 'is-top-right' })
    }

    function verifyForm(){
        return true;
    }

</script>

<div id="add-session" class="box">
    <Field label="Class Name" type="is-primary" message="">
        <Input type="text" placeholder="e.g. Rebel Flow" bind:value={sessionName}></Input>
    </Field>
    <Field label="Class Type" type="is-primary" message="Class Type is required">
        <Input type="text" required placeholder="e.g. Meditation" bind:value={type}></Input>
    </Field>
    <Field label="Class Duration" type="is-primary" message="Class Duration is required">
        <Input required type="number" min=0 placeholder="Minutes" bind:value={durationMinutes}></Input>
    </Field>
    <Field label="Class Instructor" type="is-primary" message="Class Instructor is required">
        <Input required type="text" placeholder="Name" bind:value={instructorList}></Input>
    </Field>
    <div class="submit-area">
        <Switch bind:checked={isEnrollmentOpen}>Open for enrollment</Switch><br>
        <button style="margin-top: 8px;" on:click={add}>Add Session</button>
    </div>
</div>

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