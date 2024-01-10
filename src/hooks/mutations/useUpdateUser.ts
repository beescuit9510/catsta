import { useMutation } from '@tanstack/react-query'
import { updateDoc } from 'firebase/firestore'
import { queryClient } from '../../main'
import { UserKeys } from '../../utils/query-key'
import { Docs, User } from '../../utils/firestore-collections-docs'
import { uploadImage } from './common/uploadImage'

type UpdateUser = {
  userId: string
  displayName: string
  bio: string
}

type UpdateUserWithFile = {
  photoURL: string
  file?: never
} & UpdateUser

type UpdateUserWithURL = {
  photoURL?: never
  file: File
} & UpdateUser

export async function updateUser(
  updateUser: UpdateUserWithFile | UpdateUserWithURL
) {
  const { userId, displayName, bio, file } = updateUser
  const userRef = Docs.USER(updateUser.userId)

  let { photoURL } = updateUser
  if (file) photoURL = await uploadImage({ file, path: userId, type: 'users' })

  await updateDoc(userRef, {
    displayName,
    bio,
    photoURL: photoURL!,
  })

  return { userId, displayName, bio, photoURL: photoURL! }
}

export function useUpdateUser({
  onSuccess,
  onError,
}: {
  onSuccess: (userId: string) => void
  onError: (error: Error) => void
}) {
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (user) => {
      queryClient.setQueryData<User>(
        UserKeys.USER(user.userId),
        (oldQueryData) => {
          if (!oldQueryData) return oldQueryData
          return { ...oldQueryData, ...user }
        }
      )
      onSuccess(user.userId)
    },
    onError: (error: Error) => {
      onError(error)
    },
  })
}
