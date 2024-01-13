import { addDoc, getDoc, updateDoc } from 'firebase/firestore'
import {
  Collections,
  Docs,
  NotificationAction,
} from '../../../utils/firestore-collections-docs'

export async function addNotificationDoc({
  userId,
  action,

  sender,

  postId,
  comment = null,
}: {
  userId?: string
  action: NotificationAction

  sender: {
    userId: string
    photoURL: string
    displayName: string
  }
  postId?: string
  comment?: string | null
}) {
  const post = postId
    ? await getDoc(Docs.POST(postId))
        .then((doc) => doc.data())
        .then((post) => {
          return {
            userId: post!.userId,
            postId: post!.id,

            photoURL: post!.photoURL,
            content: post!.content,
            comment,
          }
        })
    : null

  userId = userId ? userId : post!.userId

  return addDoc(Collections.NOTIFICATIONS(userId), {
    id: '',
    userId,
    createdAt: Date.now(),
    readAt: null,
    action,

    sender,
    post,
  }).then((doc) => updateDoc(doc, { id: doc.id }))
}
