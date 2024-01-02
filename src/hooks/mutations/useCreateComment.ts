import { useMutation } from '@tanstack/react-query'
import {
  addDoc,
  collection,
  doc,
  increment,
  updateDoc,
} from 'firebase/firestore'
import { firestore } from '../../utils/firebase'
import { CreateComment } from '../../utils/types'
import { queryClient } from '../../main'

async function createComment({ postId, userId, content }: CreateComment) {
  const comment = {
    userId,
    postId,
    content,
    createdAt: Date.now(),
  }

  const [docRef] = await Promise.all([
    addDoc(collection(firestore, `/posts/${postId}/comments`), comment),
    updateDoc(doc(firestore, `/posts/${postId}`), {
      comments: increment(1),
    }),
  ])

  await updateDoc(docRef, {
    id: docRef.id,
  })

  return { ...comment, id: docRef.id }
}

// onSuccess,
// onError,
// onSuccess: (postId: string) => void
// onError: (error: Error) => void

export default function useCreateComment({
  postId,
  userId,
  content,
}: CreateComment) {
  return useMutation({
    mutationFn: () => createComment({ postId, userId, content }),
    onSuccess: (comment) => {
      // TODO:setQuery instead of invalidating
      queryClient.invalidateQueries({
        queryKey: ['posts', comment.postId, 'comments'],
        exact: true,
      })

      queryClient.invalidateQueries({
        queryKey: ['users', 'QkM9xKIn0TZwHj6FUeMo2sc911o1', 'posts'],
        exact: true,
      })
    },
  })
}
