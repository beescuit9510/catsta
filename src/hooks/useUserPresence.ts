import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { database } from '../utils/firebase'

type UserPresence = {
  connections?: { [id: string]: boolean }
  lastOnline: number
}

export default function useUserPresence(userId: string) {
  const [presence, setPresence] = useState<UserPresence | null>(null)

  useEffect(() => {
    const usersRef = ref(database, `users/${userId}`)
    const unsunscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        setPresence(snapshot.val())
        console.log(snapshot.val())
      }
    })
    return () => unsunscribe()
  }, [])

  return presence
}
