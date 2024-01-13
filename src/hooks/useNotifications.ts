import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Collections, Notification } from '../utils/firestore-collections-docs'
import { auth } from '../utils/firebase'
import { queryClient } from '../main'
import { InfiniteData } from '@tanstack/react-query'
import { InfiniteQuery } from './queries/common/useCustomInfiniteQuery'
import { UserKeys } from '../utils/query-key'

export default function useNotifications() {
  const [notifications, setNotifications] = useState(0)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      Collections.NOTIFICATIONS(auth.currentUser!.uid),
      (doc) => {
        // Set a count of unread notifications
        const count = doc.docs
          .map((v) => v.data())
          .filter((v) => v.readAt === null).length

        setNotifications(count)

        // Add newly created notifications to query
        const docChanges = doc.docChanges()
        const added = docChanges
          .filter((docChange) => docChange.type === 'added')
          .map(({ doc }) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .filter((v) => v.readAt === null)

        queryClient.setQueryData<InfiniteData<InfiniteQuery<unknown[]>>>(
          UserKeys.NOTIFICATIONS(),
          (oldQueryData) => {
            if (!oldQueryData) return oldQueryData
            return {
              ...oldQueryData,
              pages: oldQueryData.pages.map((page, index) => {
                if (index === 0) {
                  return {
                    ...page,
                    data: [...added, ...page.data],
                  }
                }
                return { ...page }
              }),
            }
          }
        )

        // Replace modified notifications
        const modified = docChanges
          .filter((docChange) => docChange.type === 'modified')
          .map(({ doc }) => ({
            ...doc.data(),
            id: doc.id,
          }))

        queryClient.setQueryData<InfiniteData<InfiniteQuery<Notification[]>>>(
          UserKeys.NOTIFICATIONS(),
          (oldQueryData) => {
            if (!oldQueryData) return oldQueryData
            return {
              ...oldQueryData,
              pages: oldQueryData.pages.map((page) => {
                return {
                  ...page,
                  data: page.data.map((data) => {
                    const newValue = modified.find((m) => m.id === data.id)
                    if (newValue) return newValue
                    return { ...data }
                  }),
                }
              }),
            }
          }
        )
      }
    )

    return () => unsubscribe()
  }, [])

  return notifications
}
