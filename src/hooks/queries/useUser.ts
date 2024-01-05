import { getDoc } from 'firebase/firestore'
import { useQuery } from '@tanstack/react-query'
import { queryClient } from '../../main'
import { UserKeys } from '../../utils/query-key'
import { Docs, User } from '../../utils/firestore-collections-docs'

async function user(userId: string) {
  const snapshot = await getDoc(Docs.USER(userId))

  if (!snapshot.exists()) throw new Error('User not found')

  return snapshot.data()
}

// TODO: return undefined, find out why it returns undefined
export function useUser(userId: string) {
  return useQuery({
    queryKey: UserKeys.USER(userId),
    queryFn: () => user(userId),
  })
}

export function useCachedUser(userId: string) {
  const currentUser = queryClient.getQueryData<User>(UserKeys.USER(userId))

  return currentUser
}
