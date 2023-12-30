import { useMutation } from '@tanstack/react-query'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { firestore, storage } from '../../utils/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { queryClient } from '../../main'

const uploadImage = async ({ file, path }: { file: File; path: string }) => {
  const snapshot = await uploadBytesResumable(ref(storage, path), file, {
    contentType: file.type,
  })
  const photoURL = await getDownloadURL(snapshot.ref)
  return photoURL
}

type UpdateUser = {
  userId: string
  photoURL: string
  file: File
  displayName: string
  bio: string
}

export async function updateUser(
  updateUser: Omit<UpdateUser, 'file'> | Omit<UpdateUser, 'photoURL'>
) {
  // TODO: fix this type error; without casing UpdateUser;
  const { userId, photoURL, file, displayName, bio } = updateUser as UpdateUser

  const userRef = doc(firestore, `users/${updateUser.userId}`)

  if (file) {
    await uploadImage({ file, path: `users/${userId}` }).then((photoURL) => {
      updateDoc(userRef, {
        photoURL: photoURL,
        displayName,
        bio,
      })
    })
  } else {
    await updateDoc(userRef, {
      photoURL,
      displayName,
      bio,
    })
  }

  return userRef
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
    onSuccess: (userRef) => {
      queryClient.invalidateQueries({
        queryKey: ['users', userRef.id],
      })
      onSuccess(userRef.id)
    },
    onError: (error: Error) => {
      onError(error)
    },
  })
}
