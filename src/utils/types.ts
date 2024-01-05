import { QueryDocumentSnapshot } from 'firebase/firestore'
export interface InfiniteQuery<T> {
  perPage: number
  count: number
  lastDoc?: QueryDocumentSnapshot
  data: T
}

export type CreateComment = {
  postId: string
  userId: string
  content: string
}

export type CreatePost = {
  userId: string
  content: string
  file: File
}
