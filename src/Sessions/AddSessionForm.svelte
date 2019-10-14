<script>
    import SessionItem from './SessionItem.svelte';
    import { db } from '../firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';
    import { primaryAColor } from '../style-constants';
    import { createEventDispatcher } from 'svelte';
    import Button from '@smui/button';
    import Switch from '@smui/switch';
    import FormField from '@smui/form-field';
    import Textfield, {Input, Textarea} from '@smui/textfield';
    import Icon from '@smui/textfield/icon';
    import HelperText from '@smui/textfield/helper-text';

    const dispatch = createEventDispatcher();
    let actionStatus = "success";

    // User ID passed from parent
    export let creatorUid;
    export let lowerDateRange;
    export let upperDateRange;
    let start;
        // Form Text
    let isEnrollmentOpen = true;
    let sessionName = '';
    let durationMinutes = '';
    let studentList = '';
    let instructorList = [''];
    let type = '';
    let mySnackbar;
    let status = 'default';
    let position = 'is-top-right';

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
            status = "Successfully created session"; 
        }
        else{
            status = "An error occurred";
        }
        notify(status, position);

    }

    function notify(status, position) {
		dispatch('notify', { status, position });
	}

    function verifyForm(){
        return true;
    }

</script>
<div id="add-session" class="box form">
    <Textfield variant="outlined" bind:value={sessionName} label="Name" input$aria-controls="helper-text-outlined-c" input$aria-describedby="helper-text-outlined-c"></Textfield>
    <HelperText id="helper-text-outlined-c">e.g. Rebel Flow</HelperText>
    <!-- withTrailingIcon={valueClickable !== ''} bind:dirty={dirtyClickable} bind:invalid={invalidClickable} updateInvalid bind:value={valueClickable} -->

    <Textfield variant="outlined" bind:value={type} label="Type" input$aria-controls="helper-text-outlined-c" input$aria-describedby="helper-text-outlined-c"></Textfield>
    <HelperText id="helper-text-outlined-c">e.g. Meditation</HelperText>

    <Textfield type="number" variant="outlined" bind:value={durationMinutes} label="Duration" input$aria-controls="helper-text-outlined-c" input$aria-describedby="helper-text-outlined-c"></Textfield>
    <HelperText id="helper-text-outlined-c">Minutes</HelperText>

    <Textfield variant="outlined" bind:value={instructorList} label="Instructor" input$aria-controls="helper-text-outlined-c" input$aria-describedby="helper-text-outlined-c"></Textfield>
    <HelperText id="helper-text-outlined-c">Name of Instructor</HelperText>

    <FormField align="start">
        <Switch bind:checked={isEnrollmentOpen}></Switch>
        <span slot="label">Open for enrollment</span>
    </FormField>
    
    <button style="margin-top: 8px;" on:click={add}>Add Session</button>
</div>

<style>
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