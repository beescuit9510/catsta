import { useMutation } from '@tanstack/react-query'
import { addDoc, collection, updateDoc } from 'firebase/firestore'
import { firestore } from '../../utils/firebase'
import { CreateComment } from '../../utils/types'

async function createComment({ postId, userId, content }: CreateComment) {
  const comment = {
    userId,
    postId,
    content,
    createdAt: Date.now(),
  }

  const docRef = await addDoc(
    collection(firestore, `/posts/${postId}/comments`),
    comment
  )

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
    // onSuccess: (comment) => {
    // queryClient.setQueryData(
    //   ['users', comment.postId, 'comments', comment],
    //   (oldQueryData: Comment) => {
    //     return {
    //       ...oldQueryData,
    //       comments: [...oldQueryData.comments, post],
    //     }
    //   }
    // )
    // onSuccess(postId)
    // },
    // onError: (error: Error) => {
    // onError(error)
    // },
  })
}
