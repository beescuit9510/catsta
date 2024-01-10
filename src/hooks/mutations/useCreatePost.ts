import { useMutation } from '@tanstack/react-query'
import { addDoc, increment, updateDoc } from 'firebase/firestore'
import { Collections, Docs } from '../../utils/firestore-collections-docs'
import { uploadImage } from './common/uploadImage'

type CreatePost = {
  userId: string
  content: string
  file: File
}

async function createPost({ userId, content, file }: CreatePost) {
  const doc = await addDoc(Collections.POSTS(), {
    id: '',
    photoURL: '',
    userId,
    content,
    createdAt: Date.now(),
    likes: [],
    comments: 0,
  })

  const photoURL = await uploadImage({ file, path: doc.id, type: 'posts' })

  await Promise.all([
    updateDoc(doc, {
      id: doc.id,
      photoURL,
    }),
    updateDoc(Docs.USER(userId), {
      posts: increment(1),
    }),
  ])

  return doc.id
}

export default function useCreatePost({
  post,
  onSuccess,
  onError,
}: {
  post: CreatePost
  onSuccess: (postId: string) => void
  onError: (error: Error) => void
}) {
  return useMutation({
    mutationFn: () => createPost(post),
    onSuccess: (postId) => {
      // TODO: invalidate stale posts or at least setDate
      onSuccess(postId)
    },
    onError: (error: Error) => {
      onError(error)
    },
  })
}
