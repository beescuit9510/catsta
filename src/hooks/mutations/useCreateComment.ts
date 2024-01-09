import { InfiniteData, useMutation } from '@tanstack/react-query'
import { addDoc, getDoc, increment, updateDoc } from 'firebase/firestore'
import { queryClient } from '../../main'
import { PostKeys, UserKeys } from '../../utils/query-key'
import { Collections, Docs, Post } from '../../utils/firestore-collections-docs'
import { InfiniteQuery } from '../queries/common/useCustomInfiniteQuery'
import { UserComment } from '../queries/infinite/useInfiniteComments'

type CreateComment = {
  postId: string
  userId: string
  content: string
}

async function createComment({
  postId,
  userId,
  content,
}: CreateComment): Promise<UserComment> {
  const comment = {
    userId,
    postId,
    content,
    createdAt: Date.now(),
  }

  const [user, docRef] = await Promise.all([
    getDoc(Docs.USER(userId)),
    addDoc(Collections.COMMENTS(postId), comment),
    updateDoc(Docs.POST(postId), {
      comments: increment(1),
    }),
  ])

  await updateDoc(docRef, {
    id: docRef.id,
  })

  return { user: user.data()!, comment: { ...comment, id: docRef.id } }
}

export default function useCreateComment({
  postId,
  userId,
  content,
}: CreateComment) {
  return useMutation({
    mutationFn: () => createComment({ postId, userId, content }),

    onSuccess: (comment) => {
      queryClient.setQueryData<InfiniteData<InfiniteQuery<Post[]>>>(
        UserKeys.POSTS(userId),
        (oldQueryData) => {
          if (!oldQueryData) return oldQueryData
          return {
            ...oldQueryData,
            pages: oldQueryData?.pages.map((page) => {
              return {
                ...page,
                data: page.data.map((post) => {
                  if (post.id === postId)
                    return { ...post, comments: post.comments + 1 }
                  else return { ...post }
                }),
              }
            }),
          }
        }
      )

      queryClient.setQueryData<InfiniteData<InfiniteQuery<UserComment[]>>>(
        PostKeys.COMMENTS(postId),
        (oldQueryData) => {
          if (!oldQueryData) return oldQueryData
          return {
            ...oldQueryData,
            pages: oldQueryData?.pages.map((page, index) => {
              if (index === 0) return { ...page, data: [comment, ...page.data] }
              else return { ...page }
            }),
          }
        }
      )
    },
  })
}
