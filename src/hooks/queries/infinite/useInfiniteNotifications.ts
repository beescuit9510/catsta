import { query } from 'firebase/firestore'
import {
  Collections,
  Notification,
} from '../../../utils/firestore-collections-docs'
import { UserKeys } from '../../../utils/query-key'
import { useCustomInfiniteQuery } from '../common/useCustomInfiniteQuery'
import { auth } from '../../../utils/firebase'

export default function useInfiniteNotifications() {
  const userId = auth.currentUser!.uid

  return useCustomInfiniteQuery<Notification[], Notification>({
    queryKey: UserKeys.NOTIFICATIONS(),

    queryFn: async (fn) => {
      const queryResult = await fn({
        perPage: 6,
        countQuery: query(Collections.NOTIFICATIONS(userId)),
        dataQuery: query(Collections.NOTIFICATIONS(userId)),
      })

      const notifications = queryResult.docs.map((doc) => doc.data())

      return {
        ...queryResult,
        data: notifications,
      }
    },
  })
}
