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

export type SearchUser = {
  id: string
  displayName: string
  photoURL: string
}
