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
