import { firestore } from '../../utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useQuery } from '@tanstack/react-query'
import { queryClient } from '../../main'
import { User } from '../../utils/types'

// TODO find firebase + typescript example
async function user(userId: string): Promise<User> {
  return getDoc(doc(firestore, 'users', userId))
    .then((snap) => {
      if (!snap.exists()) throw new Error('User not found')
      else return snap
    })
    .then((snap) => snap.data() as User)
}

// TODO: return undefined, find out why it returns undefined
export function useUser(userId: string) {
  const query = useQuery({
    queryKey: ['users', userId],
    queryFn: ({ queryKey }) => user(queryKey[1]),
  })
  return query
}

export function useCachedUser(userId: string) {
  const currentUser = queryClient.getQueryData<User>(['users', userId])

  return currentUser
}
