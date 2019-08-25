<script>
    import Profile from './Profile.svelte';
    import Todos from './Todos.svelte';
    import TextAnimation from './TextAnimation.svelte';
    import Datepicker from './Calendar/Datepicker.svelte';

    import { auth, googleProvider } from './firebase';
    import { authState } from 'rxfire/auth';
    import { formatDate } from 'timeUtils'
    import { onMount } from 'svelte';

    let user;
    let startText = "REBEL";

    const today = new Date();
	let start = new Date();
	let dateFormat = '#{l}, #{F} #{j}, #{Y}';
	let noWeekendsSelectableCallback = (date) => date.getDay() !== 0 && date.getDay() !== 6;
	let formattedSelected;
	let dateChosen = false;
	let exampleFormatted = false;
	let exampleChosen = false;
	
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

	function logChoice(date) {
	  // eslint-disable-next-line
	  console.log(`User chose ${date}.`);
	}

	// onMount(() => {
	//   // eslint-disable-next-line
	//   hljs.initHighlightingOnLoad();
	// });

//     var today = new Date();
//     console.log(formatDate(today,'Your appointment is on #{l}, #{F} #{m}, #{Y} at #{g}:#{i} #{A}.'));

//     function addDays(date, days) {
//         var result = new Date(date);
//         result.setDate(result.getDate() + days);
//         return result;
//     }

//     function subtractDays(date, days) {
//         var result = new Date(date);
//         result.setDate(result.getDate() - days);
//         return result;
// }
//     var threeDaysInPast = subtractDays(today, 3);
//     var inThirtyDays = addDays(today, 30);
//     var noWeekendsSelectableCallback = function(date) {
//         return true;
//}


    let w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    let height = "height:" + (y) + "px;";

    const unsubscribe = authState(auth).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>

<style>


.container{
    display:flex;
    justify-content: space-around;
}

button{
	max-height: 36px;
    background-color: #ff1d8e;
    margin: auto;
}

.profile-section{
    border: 1px solid #888;
    border-radius: 1px;
    box-shadow: 5px 10px #888888;
    padding: 16px;
}

.todo-section{
    display: flex;
    flex: 1;
    background-color: white;
}

.login{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 250px;
    margin: auto;
}

.login-img{
    max-height: 300px;
    max-width: 300px;
    margin: auto;
    padding-right: 24px;
    padding-top: 50px;
 }

 .calendar-section{
     background-color: white;
     border-right: dashed 1px black;
     min-width: 400px;
 }

</style>

<section>
<div class="container" style={height};>
{#if user}
        <div class="profile-section">
            <Profile {...user} />
            <button on:click={ () => auth.signOut() }>Logout</button>
        </div>
        <div class="calendar-section">
            <div class="calendar">
                <Datepicker
                    format="{dateFormat}"
                    start={threeDaysInPast}
                    end={inThirtyDays}
                    selectableCallback={noWeekendsSelectableCallback}
                />
            </div>
        </div>
        <div class="todo-section">
            <Todos uid={user.uid} />
        </div>
{:else}
    <!-- TODO: wait for auto login -->
    <div class="bounds-logged-out">
        <div>
            <TextAnimation visible=true drawText={startText}/>
        </div>
        <div class="login">
            <img class="login-img" src='./img/rebelYoga.jpeg' alt="rebel yoga">
            <button on:click={login}>
            Login
            </button>
        </div>
    </div>
{/if}
</div>

</section>