import { QueryDocumentSnapshot } from 'firebase/firestore'

// posts/:postsId
export type Post = {
  id: string
  userId: string
  photoURL: string
  content: string
  createdAt: number
  likes: []
  comments: []
}

export type Comment = {
  id: string
  postId: string
  userId: string
  content: string
  createdAt: number
}

export type UserComment = {
  id: string
  postId: string
  userId: string
  content: string
  createdAt: number
  user: User
}

export type CreateComment = {
  postId: string
  userId: string
  content: string
}

export type InfiniteComment = {
  limit: number
  lastDoc?: QueryDocumentSnapshot
  total: number
  comments: UserComment[]
}

export type CreatePost = {
  userId: string
  content: string
  file: File
}

export type InfinitePost = {
  limit: number
  lastDoc?: QueryDocumentSnapshot
  total: number
  posts: Post[]
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
  createdAt: number
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
