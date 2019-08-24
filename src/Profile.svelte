<script>
    export let displayName;
    export let photoURL;
    export let uid;
</script>

<style>

    .profile h3{
        padding-right: 4px;
    }
    .profile{
        display: flex;
    }

    .profile-img{
        width: 50px;
        height: 50px; 
        padding: 10px;
    }
</style>

<div class="profile">
    <img class="profile-img" src={ photoURL } alt="user { uid }">
    <h3>Hi, { displayName }!</h3>
</div>