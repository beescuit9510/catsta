import { firestore } from '../../utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useQuery } from '@tanstack/react-query'
import { queryClient } from '../../main'
import { User } from '../../utils/types'
import { UserKeys } from '../../utils/query-key'

async function user(userId: string): Promise<User> {
  const snapshot = await getDoc(doc(firestore, 'users', userId))

  if (!snapshot.exists()) throw new Error('User not found')

  return snapshot.data() as User
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
