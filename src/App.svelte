<script>
    import Profile from './Profile.svelte';
    import Todos from './Todos.svelte';

    import { auth, googleProvider } from './firebase';
    import { authState } from 'rxfire/auth';

    let user;

    const unsubscribe = authState(auth).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>

<style>
.container{
	width: 100% !important;
	height: 100% !important;
	display:flex;
	align-content: center;
	justify-content: center;
	align-items: center;
}

.padlock{
	padding: 20px;
}

button{
	max-height: 36px;
}
</style>

<section>
<div class="container">
{#if user}
    <Profile {...user} />
    <button on:click={ () => auth.signOut() }>Logout</button>
    <hr>
    <Todos uid={user.uid} />
{:else}
	<img src={ "./img/padlock.png" } class="padlock" height="100" alt="login image">
	<button on:click={login}>
		Signin with Google
	</button>
{/if}
</div>

</section>