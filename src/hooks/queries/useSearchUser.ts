import { firestore } from '../../utils/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useQuery } from '@tanstack/react-query'
import { SearchUser } from '../../utils/types'

async function searchUser(searchKeyword: string): Promise<SearchUser[]> {
  const usersRef = collection(firestore, 'users')
  const q = query(
    usersRef,
    where('displayName', '>=', searchKeyword),
    where('displayName', '<=', `${searchKeyword}~`)
  )

  return getDocs(q).then((snapshots) => {
    if (snapshots.empty) return []
    else return snapshots.docs.map((doc) => doc.data() as SearchUser)
  })
}

export function useSearchUser(searchKeyword: string) {
  // TODO: pagination or infinite search
  const query = useQuery({
    queryKey: ['search', 'users', searchKeyword],
    queryFn: () => searchUser(searchKeyword),
  })
  return query
}
