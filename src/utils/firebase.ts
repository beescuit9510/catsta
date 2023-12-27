// import { getAnalytics } from 'firebase/analytics'
// const analytics = getAnalytics(app)

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
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

export { app, auth, firestore, storage }
