import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  doc,
} from 'firebase/firestore'
import { firestore } from './firebase'

export type User = {
  id: string
  displayName: string
  photoURL: string
  bio: string
  posts: number
  followers: string[]
  followings: string[]
  createdAt: number
}

export type Like = {
  userId: string
  postId: string
  createdAt: number
}

export type Post = {
  id: string
  userId: string
  photoURL: string
  content: string
  createdAt: number
  likes: string[]
  comments: number
}

export type Comment = {
  id: string
  postId: string
  userId: string
  content: string
  createdAt: number
}

function assignTypes<T extends object>() {
  return {
    toFirestore(doc: T): DocumentData {
      return doc
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): T {
      return snapshot.data()! as T
    },
  }
}

export const Collections = {
  USERS: () =>
    collection(firestore, 'users').withConverter(assignTypes<User>()),

  LIKES: (userId: string) =>
    collection(firestore, 'users', userId, 'likes').withConverter(
      assignTypes<Like>()
    ),

  POSTS: () =>
    collection(firestore, 'posts').withConverter(assignTypes<Post>()),

  COMMENTS: (postId: string) =>
    collection(firestore, 'posts', postId, 'comments').withConverter(
      assignTypes<Comment>()
    ),
}

export const Docs = {
  USER: (userId: string) =>
    doc(firestore, 'users', userId).withConverter(assignTypes<User>()),

  LIKE: (userId: string, postId: string) =>
    doc(firestore, 'users', userId, 'likes', postId).withConverter(
      assignTypes<Like>()
    ),

  POST: (postId: string) =>
    doc(firestore, 'posts', postId).withConverter(assignTypes<Post>()),

  COMMENT: (postId: string, commentId: string) =>
    doc(firestore, 'posts', postId, 'comments', commentId).withConverter(
      assignTypes<Comment>()
    ),
}
