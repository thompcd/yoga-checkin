# Yoga Scheduler App

*Note that you will need to have [Node.js](https://nodejs.org) installed.*

## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

## Provision a Firebase Project

[Firebase Demo App](https://fireship.io/lessons/svelte-v3-overview-firebase/)
[Dev Database](https://console.firebase.google.com/u/0/project/yoga-checkin/database/firestore/data~2Ftodos~2F9i3XrrAUXgPSI5TGME6D)

## Create Config Files

Create a blank file - `/src/firebase.js`

Use the following content as a template for this file:
```
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: ***your api key***,
    authDomain: "yoga-checkin.firebaseapp.com",
    databaseURL: "https://yoga-checkin.firebaseio.com",
    projectId: "yoga-checkin",
    storageBucket: "",
    messagingSenderId: "602737132367",
    appId: "[***your firebase app id***]"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();
```

## Enjoy
...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.
