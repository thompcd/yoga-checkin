<script>
    import Profile from './Profile.svelte';
    import Todos from './Todos.svelte';
    import TextAnimation from './TextAnimation.svelte';

    import { auth, googleProvider } from './firebase';
    import { authState } from 'rxfire/auth';

    let user;
    let startText = "REBEL";

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
            <div class="calendar"></div>
        </div>
        <div class="todo-section">
            <Todos uid={user.uid} />
        </div>
{:else}
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