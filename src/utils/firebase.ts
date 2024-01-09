import { initializeApp } from 'firebase/app'
import {
  beforeAuthStateChanged,
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  getDatabase,
  onDisconnect,
  onValue,
  push,
  ref,
  set,
  serverTimestamp,
  remove,
  Unsubscribe,
} from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAEQko6Z55Nsvk_IDjJNkj2cHOIFQmPlC4',
  authDomain: 'catsta-be684.firebaseapp.com',
  projectId: 'catsta-be684',
  storageBucket: 'catsta-be684.appspot.com',
  messagingSenderId: '8263399201',
  appId: '1:8263399201:web:13ea2753342625b9357060',
  measurementId: 'G-GGJHCP16GH',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)
const database = getDatabase(
  app,
  'https://catsta-be684-default-rtdb.firebaseio.com/'
)

export { app, auth, firestore, storage, database }

let unsubscribe: Unsubscribe
onAuthStateChanged(auth, async (user) => {
  if (!user) return
  localStorage.setItem('auth', user.uid)
  const myConnectionsRef = ref(database, `users/${user.uid}/connections`)
  const lastOnlineRef = ref(database, `users/${user.uid}/lastOnline`)
  const connectedRef = ref(database, '.info/connected')
  unsubscribe = onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      const con = push(myConnectionsRef)

      onDisconnect(con).remove()

      set(con, true)

      onDisconnect(lastOnlineRef).set(serverTimestamp())
    }
  })
})

beforeAuthStateChanged(auth, async (user) => {
  if (user) return
  const auth = localStorage.getItem('auth')
  const myConnectionsRef = ref(database, `users/${auth}/connections`)
  const lastOnlineRef = ref(database, `users/${auth}/lastOnline`)
  remove(myConnectionsRef)
  set(lastOnlineRef, serverTimestamp())
  if (unsubscribe) {
    unsubscribe()
  }
})

// Firestore Database rules
// rules_version = '2';
// service cloud.firestore {
// 	match /databases/{database}/documents {
//     match /{document=**} {
//    		allow read: if request.auth != null;
// 		}
//     match /posts/{post_id} {
//     	allow write: if request.auth != null;
//       allow delete, update:
// 				if request.auth.uid == resource.data.userId;
//     }
//     match /posts/{post_id}/comments/{comment_id} {
//     	allow write: if request.auth != null;
//       allow delete, update:
// 				if request.auth.uid == resource.data.userId;
//     }
//     match /users/{user_id} {
// 	    allow write, delete, update:
//       	if request.auth.uid == user_id;
// 			allow update:
// 				if request.resource.data.diff(resource.data).affectedKeys().hasOnly(["followers"]);
//     }
//     match /users/{user_id}/likes/{like_id} {
//       allow write, delete, update:
//       	if request.auth.uid == user_id;
//     }
//   }
// }

// Realtime Database rules
// {
//   /* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */
//   "rules": {
//     "users": {
//       "$uid": {
//         ".read": "$uid === auth.uid",
//         ".write": "$uid === auth.uid"
//       }
//     }
//   }
// }

// Storage rules
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read: if true;
//       allow write: if request.auth != null;
//       allow delete: if false;
//     }
//   }
// }
