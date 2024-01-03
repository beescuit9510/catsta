import { useMutation } from '@tanstack/react-query'
import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { auth, firestore } from '../../utils/firebase'
import { queryClient } from '../../main'
import { Post, User } from '../../utils/types'
import { PostKeys, UserKeys } from '../../utils/query-key'

async function unlike(postId: string, userId: string) {
  return updateDoc(doc(firestore, `/posts/${postId}`), {
    likes: arrayRemove(userId),
  })
}

export default function useUnlike({
  userId,
  postId,
  onSuccess,
  onError,
}: {
  userId: string
  postId: string
  onSuccess?: () => void
  onError?: () => void
}) {
  return useMutation({
    mutationFn: () => unlike(postId, userId),
    onSuccess: () => {
      // TODO: clean up code and re-define shared code

      queryClient.setQueryData(UserKeys.FEED, (oldQueryData) => {
        if (!oldQueryData) return

        return {
          ...oldQueryData,
          pages: oldQueryData!.pages!.map((page) => {
            return {
              ...page,
              posts: page.posts.map((data) => {
                if (postId !== data.post.id) return data
                const newPost = {
                  ...data.post,
                  likes: data.post.likes.filter(
                    (userId) => userId !== auth.currentUser!.uid
                  ),
                }
                return { ...data, post: newPost }
              }),
            }
          }),
        }
      })

      queryClient.setQueryData(
        PostKeys.POST(postId),
        (oldQueryData: { post: Post; user: User }) => {
          if (!oldQueryData) return

          const updatedPost = {
            ...oldQueryData.post,
            likes: oldQueryData.post.likes.filter((user) => user !== userId),
          }
          return {
            ...oldQueryData,
            post: updatedPost,
          }
        }
      )

      onSuccess && onSuccess()
    },
    onError: (erorr) => {
      console.error(erorr)
      onError && onError()
    },
  })
}
