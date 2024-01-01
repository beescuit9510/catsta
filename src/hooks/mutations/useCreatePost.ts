import { useMutation } from '@tanstack/react-query'
import { addDoc, collection, updateDoc } from 'firebase/firestore'
import { firestore, storage } from '../../utils/firebase'
import { CreatePost } from '../../utils/types'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

// TODO: shared code
const uploadImage = async ({ file, path }: { file: File; path: string }) => {
  const snapshot = await uploadBytesResumable(ref(storage, path), file, {
    contentType: file.type,
  })
  const photoURL = await getDownloadURL(snapshot.ref)
  return photoURL
}

async function createPost({ userId, content, file }: CreatePost) {
  const doc = await addDoc(collection(firestore, 'posts'), {
    userId,
    content,
    createdAt: Date.now(),
    likes: [],
    comments: [],
  })

  const photoURL = await uploadImage({ file, path: `posts/${doc.id}` })

  await updateDoc(doc, {
    id: doc.id,
    photoURL,
  })

  return doc.id
}

export default function useCreatePost({
  post,
  onSuccess,
  onError,
}: {
  post: CreatePost
  onSuccess: (postId: string) => void
  onError: (error: Error) => void
}) {
  return useMutation({
    mutationFn: () => createPost(post),
    onSuccess: (postId) => {
      // TODO: invalidate stale posts or at least setDate
      onSuccess(postId)
    },
    onError: (error: Error) => {
      onError(error)
    },
  })
}
