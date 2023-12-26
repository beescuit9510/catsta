import { Stack } from '@chakra-ui/react'
import Post, { PostProps } from '../post/post.component'
import { useEffect, useState } from 'react'

export default function Feed() {
  const [posts, setPosts] = useState<PostProps[]>([])

  useEffect(() => {
    setPosts([
      {
        postRef: '1ASDFGQ45EV2V15X1',
        imageURL:
          'https://images.unsplash.com/photo-1682687982141-0143020ed57a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        photoURL:
          'https://images.unsplash.com/photo-1682687982141-0143020ed57a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        displayName: 'Byunduck',
        caption: 'GOOD DAY!',
        likes: 20,
        liked: true,
      },
    ])
  }, [])

  return (
    <Stack spacing={10}>
      {posts.map((post) => {
        return (
          <Post
            key={post.postRef}
            postRef={post.postRef}
            imageURL={post.imageURL}
            photoURL={post.photoURL}
            displayName={post.displayName}
            caption={post.caption}
            likes={post.likes}
            liked={post.liked}
          />
        )
      })}
    </Stack>
  )
}
