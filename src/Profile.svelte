<script>
    export let displayName;
    export let photoURL;
    export let uid;
    export let email;
    export let phoneNumber;
    // TODO: functional updates
    export let updateEmail;
    export let updatePhoneNumber;
    export let updatePassword;
    export let updateProfile;
</script>

<div class="profile">
    <div class="profile-img-wrapper">
        <img class="profile-img" src={ photoURL } alt="user { uid }"> 
        <h4>Hi, { displayName }!</h4>
    </div>
    <ul class="account-info"><h4>Account Information</h4>
        <li>Email: {email}</li>
        <li>Phone: {phoneNumber === null ? "None" : phoneNumber}</li>
        <div class="separator"></div>
        <li><a href={updateEmail}>Update Email</a></li>
        <li><a href={updatePhoneNumber}>Update Phone</a></li>
        <li><a href={updatePassword}>Update Password</a></li>
        <li><a href={updateProfile}>Update Profile</a></li>
        
    </ul>
</div>

<style>

    .separator{
        height: 1px;
        padding: 4px;
        width: 100%;
        border-bottom: 1px solid black;}
    .profile-img-wrapper{
        display: inline-flex;
    }

    .profile-img-wrapper h4{
        padding-left: 8px;
    }

    .profile{
        display: flex;
        flex-direction: column;
    }

    .profile li{
        list-style: none;
    }

    .profile-img{
        width: 50px;
        height: 50px;
    }

    .account-info{
        padding-left: inherit;
    }
</style>
