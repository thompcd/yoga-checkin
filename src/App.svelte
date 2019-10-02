<script>
    import 'bulma/css/bulma.css'

    import Profile from './Profile.svelte';
    import Sessions from './Sessions/Sessions.svelte';
    import AddSessionForm from './Sessions/AddSessionForm.svelte';
    import TextAnimation from './TextAnimation.svelte';
    import Datepicker from './Calendar/Datepicker.svelte';
    import MenuSurface, {Anchor} from '@smui/menu-surface';
    import Calendar from './InfiniteScroll/ScrollCalendar.svelte';

    import { auth, googleProvider } from './firebase';
    import { authState } from 'rxfire/auth';
    import { lightAColor } from './style-constants';
    import { formatDate } from 'timeUtils'
    import { onMount } from 'svelte';
    import Snackbar, {Actions, Label} from '@smui/snackbar';
    import IconButton, {Icon} from '@smui/icon-button';
  
    let user;
    let w;
    let h;
    let visible = false;
    let startText = "REBEL";
    let mySnackbar;

    const today = new Date();
	let start = new Date();
	let dateFormat = '#{l}, #{F} #{j}, #{Y}';
	let noWeekendsSelectableCallback = (date) => date.getDay() !== 0 && date.getDay() !== 6;
	let formattedSelected;
    let dateChosen = false;
	let exampleFormatted = false;
    let exampleChosen = false;
    let selected = new Date();
    $: snackbarMessage = '';
	
	$: end = new Date(start.getTime() + 1000 * 3600 * 24 * 720);
  
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
	  date.setDate(date.getDate() + 30);
	  inThirtyDays = date;
	}

    function login() {
        visible = false;
        auth.signInWithPopup(googleProvider);
    }
    const unsubscribe = authState(auth).subscribe(u => user = u);

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function handleMenuClick(){
        formSurface.setOpen(true)
    }

    function displayStatus(event) {
        console.log(`received event:`,event.detail)
        const { status, position } = event.detail;
        snackbarMessage = status;
        console.log(snackbarMessage);
        mySnackbar.open();
    }

</script>
<svelte:window bind:innerHeight={h} bind:innerWidth={w}/>
<section style="background-color:#676778;">

{#if user}
<nav id="main-nav">
    <Profile {...user} />
</nav>
<div class="container">
        <div class="calendar-section" style="height:{h}px">
            <AddSessionForm creatorUid={user.uid}
                bind:lowerDateRange={selected}
                bind:upperDateRange={selected}
                on:notify={displayStatus}
            />
            <div class="calendar">
            <Calendar 
                boundsHeight = "100%"
                boundsWidth = "340px"
                />      
            </div>
        </div>
        <div class="sessions-section">

            <div class="sessions">
                <Sessions
                    bind:lowerDateRange={selected}
                    bind:upperDateRange={selected}
                    on:notify={displayStatus}
                     />
            </div>
        </div>
        <div>
            <Snackbar bind:this={mySnackbar}>
                <Label>{snackbarMessage}</Label>
                    <Actions>
                        <IconButton class="material-icons" title="Dismiss">close</IconButton>
                    </Actions>
            </Snackbar>
        </div>
</div>
{:else}
<div class="container">
    <!-- TODO: wait for auto login -->
    <div class="bounds-logged-out">
        <div id="login-animation" style="top:24px; left:24px; height:{h/4}px;">
            <TextAnimation visible=true drawText={startText}/>
        </div>
        <div class="login box" style="position:absolute; top:{h/3}px; left:{(w/2)-150}px;">
            <div id="login-image-wrapper">
                <img class="login-img" src='./img/rebelYoga.jpeg' alt="rebel yoga">
                <button class="login-btn" on:click={login}>
                Login
                </button>
            </div>
        </div>
    </div>
</div>
{/if}
</section>

<style>
.bounds-logged-out{
    display: flex;
    flex-direction: column;
}

#main-nav{
    overflow: hidden;
    height: 50px;
    width: 100% !important;
    border-bottom: 2px solid #c93756;
    -webkit-box-shadow: 0px 15px 10px -20px rgba(0,0,0,1);
    -moz-box-shadow: 0px 15px 10px -20px rgba(0,0,0,1);
    box-shadow: 0px 15px 10px -20px rgba(0,0,0,1);
    background-color: white;
}
.box{
-webkit-box-shadow: 16px 16px 10px -19px rgba(0,0,0,1);
-moz-box-shadow: 16px 16px 10px -19px rgba(0,0,0,1);
box-shadow: 16px 16px 10px -19px rgba(0,0,0,1);
}
.container{
    display:flex;
    justify-content: stretch;
    padding-top: 8px;
}

.sessions-section{
    display: flex;
    max-width: 300px;
    flex: 1;
    padding: 16px;
}
 .calendar-section{
     border-right: dashed 1px black;
     padding: 16px;
     height: 100%;
     width: 360px;
 }

.login{
    position: absolute;
    left: 50%;
    top: 30%;
    z-index: 10001;
    background-color: white;
    padding: 32px;
}

.login-img{    
    max-height: 300px;
    max-width: 300px;
    padding-bottom: 24px;
}

#login-image-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
/* #login-image-wrapper{
    position: relative; 
    left: -50%;
    top: -30%;
 } */

 .login-btn{
    /* position: absolute; 
    top: 50%; */
    width: 100px;
    height: 50px;
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

.calendar{
    display: flex;
    width: 400px;
}

.sessions{
    display: flex;
    flex-direction: column;
}
</style>