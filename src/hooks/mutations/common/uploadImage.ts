import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../../utils/firebase'

export async function uploadImage({
  file,
  path,
  type,
}: {
  file: File
  path: string
  type: 'users' | 'posts'
}) {
  const snapshot = await uploadBytesResumable(
    ref(storage, `${type}/${path}`),
    file,
    {
      contentType: file.type,
    }
  )

  const photoURL = await getDownloadURL(snapshot.ref)
  return photoURL
}
