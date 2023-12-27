import { Grid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ProfileGridItem, {
  ProfileGridItemProps,
} from '../profile-grid-item/profile-grid-item.component'

export default function ProfileGrid() {
  const [posts, setPosts] = useState<ProfileGridItemProps[]>([])

  useEffect(() => {
    setPosts([
      {
        imageURL:
          'https://images.unsplash.com/photo-1682687982141-0143020ed57a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 20,
        comments: 20,
      },
      {
        imageURL:
          'https://images.unsplash.com/photo-1682687219573-3fd75f982217?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 20,
        comments: 20,
      },
      {
        imageURL:
          'https://images.unsplash.com/photo-1682687982141-0143020ed57a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 20,
        comments: 20,
      },
      {
        imageURL:
          'https://images.unsplash.com/photo-1682687982141-0143020ed57a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 20,
        comments: 20,
      },
      {
        imageURL:
          'https://images.unsplash.com/photo-1682687219573-3fd75f982217?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 20,
        comments: 20,
      },
      {
        imageURL:
          'https://images.unsplash.com/photo-1682687219573-3fd75f982217?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 20,
        comments: 20,
      },
      {
        imageURL:
          'https://images.unsplash.com/photo-1682687219573-3fd75f982217?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 20,
        comments: 20,
      },
      {
        imageURL:
          'https://images.unsplash.com/photo-1682687219573-3fd75f982217?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 20,
        comments: 20,
      },
      {
        imageURL:
          'https://images.unsplash.com/photo-1682687219573-3fd75f982217?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 20,
        comments: 20,
      },
      {
        imageURL:
          'https://images.unsplash.com/photo-1682687219573-3fd75f982217?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 20,
        comments: 20,
      },
      {
        imageURL:
          'https://images.unsplash.com/photo-1682687219573-3fd75f982217?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 20,
        comments: 20,
      },
      {
        imageURL:
          'https://images.unsplash.com/photo-1682687219573-3fd75f982217?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 20,
        comments: 20,
      },
      {
        imageURL:
          'https://images.unsplash.com/photo-1682687219573-3fd75f982217?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        likes: 20,
        comments: 20,
      },
    ])
  }, [])

  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={3}>
      {posts.map((post) => (
        <ProfileGridItem
          imageURL={post.imageURL}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </Grid>
  )
}
