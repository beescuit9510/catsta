import { QueryDocumentSnapshot } from 'firebase/firestore'

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
