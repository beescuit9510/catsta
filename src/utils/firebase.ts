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
//Uncaught (in promise) Error: User is already in the firestore (google)

onAuthStateChanged(auth, async (user) => {
  if (user) {
    localStorage.setItem('auth', user.uid)
    const myConnectionsRef = ref(database, `users/${user.uid}/connections`)
    const lastOnlineRef = ref(database, `users/${user.uid}/lastOnline`)
    const connectedRef = ref(database, '.info/connected')
    onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        const con = push(myConnectionsRef)

        onDisconnect(con).remove()

        set(con, true)

        onDisconnect(lastOnlineRef).set(serverTimestamp())
      }
    })
  }
})
beforeAuthStateChanged(auth, async (user) => {
  if (!user) {
    const auth = localStorage.getItem('auth')
    const myConnectionsRef = ref(database, `users/${auth}/connections`)
    const lastOnlineRef = ref(database, `users/${auth}/lastOnline`)
    remove(myConnectionsRef)
    set(lastOnlineRef, serverTimestamp())
  }
})
