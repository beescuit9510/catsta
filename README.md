<!-- TODO: create korean version -->

# Catstagram

Instagram Clone Project

1. create post
2. create comments for a post
3. follow users that interest you and users can follow you back
4. online status, check who is online and offline now
5. dark mode & light mode

## Demo

[Catstagram](https://casta2.web.app)

## Videos

https://github.com/beescuit9510/test1/assets/79363424/062541ab-f0ff-4a66-8279-29c45a8139a6

## Table of Contents

- [Catstagram: Features and Intro](#catstagram)
- [Catstagram: Demo](#demo)
- [Videos](#videos)
- [Table of Contents](#table-of-contents)
- [Tech Stack](#tech-stack)
- [Usage](#usage)

## Tech Stack

1. Typescript
1. React
1. React Query
1. Firebase
   1. Authentication
   1. Storage
   1. Firestore
   1. Realtime Database
1. Chakra UI

## Usage

### 1. Install dependencies

```
npm install
```

### 2. Replace firebase config file(./src/firebase) with your firebase app configuration

1. Go to [Firebase](https://firebase.google.com/)
2. Get started, Create a project,
3. Enable Authenication(Email/Password Provider, Google provider), Storage, Firestore, and Realtime Database

```
const firebaseConfig = {
  apiKey: 'Your API Key',
  authDomain: 'Your authDomain',
  projectId: 'Your projectId',
  storageBucket: 'Your storageBucket',
  messagingSenderId: 'Your messagingSenderId',
  appId: 'Your appId',
  measurementId: 'Your measurementId',
}
```

### 3. Run the application

```
npm run dev
```

### 4. Firebase Rules

Do not have to for demos. (basic security rules that firebase provides you with in the very begining are enough for demo as well.)
But it is always a great idea to **set security rules for each firebase service**! and the following is security rules that I use for _Catstagram_

##### Firestore Database rules

```
rules_version = '2';
service cloud.firestore {
	match /databases/{database}/documents {
    match /{document=**} {
   		allow read: if request.auth != null;
		}
    match /posts/{post_id} {
    	allow write: if request.auth != null;
      allow delete, update:
				if request.auth.uid == resource.data.userId;
    }
    match /posts/{post_id}/comments/{comment_id} {
    	allow write: if request.auth != null;
      allow delete, update:
				if request.auth.uid == resource.data.userId;
    }
    match /users/{user_id} {
	    allow write, delete, update:
      	if request.auth.uid == user_id;
			allow update:
				if request.resource.data.diff(resource.data).affectedKeys().hasOnly(["followers"]);
    }
    match /users/{user_id}/likes/{like_id} {
      allow write, delete, update:
      	if request.auth.uid == user_id;
    }
  }
}

```

##### Realtime Database

```
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

##### Storage

```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
      allow delete: if false;
    }
  }
}
```
