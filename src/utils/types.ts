import { QueryDocumentSnapshot } from 'firebase/firestore'

// posts/:postsId
export type Post = {
  id: string
  userId: string
  photoURL: string
  content: string
  createdAt: string
}
export type CreatePost = {
  userId: string
  content: string
  file: File
}
// user/:userid
export type User = {
  id: string
  displayName: string
  photoURL: string
  bio: string
  posts: number
  followers: string[]
  followings: string[]
  createdAt: string
}

export type InfiniteSearchUser = {
  limit: number
  lastDoc?: QueryDocumentSnapshot
  total: number
  users: SearchUser[]
}

export type SearchUser = {
  id: string
  displayName: string
  photoURL: string
}
