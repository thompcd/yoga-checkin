<script>
    import { auth, googleProvider } from './firebase';
    import { authState } from 'rxfire/auth';
    import MenuSurface, {Anchor} from '@smui/menu-surface';
    import List, {Item, Separator, Text} from '@smui/list';
    import ImageList, {Item as ImageListItem, ImageAspectContainer, Image} from '@smui/image-list';
    import Button from '@smui/button';
    import IconButton from '@smui/icon-button';
//   import './MenuSurface.scss';

    let user;
    export let displayName;
    export let photoURL;
    export let uid;
    export let email;
    export let phoneNumber;
     let formSurface;
     let name = '';
    // TODO: functional updates
    export let updateEmail;
    export let updatePhoneNumber;
    export let updatePassword;
    export let updateProfile;
    let menuIconAnchor;

    const unsubscribe = authState(auth).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>

<div use:Anchor bind:this={menuIconAnchor} style="display: flex; align-items: center; z-index:10005; position:relative;">
    <IconButton class="material-icons" on:click={() => formSurface.setOpen(true)}>menu</IconButton>
</div>
<div style="min-width: 100px; max-width:200px; overflow: hidden; ">
    <MenuSurface bind:this={formSurface} anchor={false} bind:anchorElement={menuIconAnchor}>
    <div class="surface-content">
        <div style="height:34px;"></div>
        <div class="profile-img-wrapper">
            <img class="profile-img" src="{ photoURL }" alt="user { uid }" />
            <h4>Hi, { displayName }!</h4>
        </div>
        <Text>Email: {email}</Text>
        <Text>Phone: {phoneNumber === null ? "None" : phoneNumber}</Text>
        <div class="separator"></div>
        <Item on:SMUI:action={() => updateEmail}><Text>Update Email</Text></Item>
        <Item on:SMUI:action={() => updatePhoneNumber}><Text>Update Phone</Text></Item>
        <Item on:SMUI:action={() => updatePassword}><Text>Update Password</Text></Item>
        <div class="separator"></div>
        <Button style="margin-top: 1em;" on:click={ () => auth.signOut() }>Logout</Button>
    </div>
    </MenuSurface>
</div>

<style>
    .surface-content{
        margin: 1em;
        display: flex; 
        flex-direction: column; 
        align-items: flex-start;
        max-width: 200px;
        text-overflow: ellipsis;
    }
    .separator{
        height: 1px;
        padding: 4px;
        width: 100%;
        border-bottom: 1px solid black;
        }
    .profile-img-wrapper{
        display: inline-flex;
    }

    .profile-img-wrapper h4{
        padding-left: 8px;
        padding-bottom: 8px;
    }

    .profile{
        display: flex;
        flex-direction: column;
        z-index: 10000;
        padding: 16px;
    }

    .profile-img{
        width: 50px;
        height: 50px;
        border-radius:25px;
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
