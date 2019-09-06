<script>
    import { auth, googleProvider } from './firebase';
    import { authState } from 'rxfire/auth';

    let user;
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

    const unsubscribe = authState(auth).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>

<div class="profile box">
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
    <button on:click={ () => auth.signOut() }>Logout</button>
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
        z-index: 10000;
        padding: 16px;
    }

    .profile li{
        list-style: none;
    }

    .profile-img{
        width: 50px;
        height: 50px;
        border-radius:25px;
    }

    .account-info{
        padding-left: inherit;
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
