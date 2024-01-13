import { useMutation } from '@tanstack/react-query'
import { updateDoc } from 'firebase/firestore'
import { Docs } from '../../utils/firestore-collections-docs'

async function readNotification(userId: string, notificationIds: string[]) {
  const readAt = Date.now()
  return Promise.all([
    notificationIds.map((id) =>
      updateDoc(Docs.NOTIFICATION(userId, id), {
        readAt,
      })
    ),
  ])
}

export default function useReadNotification() {
  return useMutation({
    mutationFn: ({
      userId,
      notificationIds,
    }: {
      userId: string
      notificationIds: string[]
    }) => readNotification(userId, notificationIds),
  })
}
