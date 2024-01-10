import { Stack } from '@chakra-ui/react'
import PostGridItem from './post-grid-item.component'
import { useParams } from 'react-router-dom'
import { auth } from '../../../../utils/firebase'
import ProfileTabLoader from '../../profile-tab/profile-tab-loader.component'
import MyPostGridPlaceholder from '../../../common/placeholder/grid/post-grid/my-post-grid-placeholder.component'
import PostGridPlaceholder from '../../../common/placeholder/grid/post-grid/post-grid-placeholder.component'
import useInfinitePosts from '../../../../hooks/queries/infinite/useInfinitePosts'
import LoadMoreBtn from '../../../common/load-more-btn/load-more-btn.component'
import ProfileGrid from '../profile-grid/profile-grid.component'

export default function PostGrid() {
  const { userId } = useParams()
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfinitePosts(userId!)
  const isEmpty = data?.pages!.at(0)!.data.length === 0

  return (
    <Stack spacing={5}>
      {isEmpty &&
        (userId === auth.currentUser!.uid ? (
          <MyPostGridPlaceholder />
        ) : (
          <PostGridPlaceholder />
        ))}

      <ProfileGrid>
        {data?.pages
          .flatMap((page) => page.data)
          .map((post) => (
            <PostGridItem
              key={post.id}
              postId={post.id}
              imageURL={post.photoURL}
              likes={post.likes.length}
              comments={post.comments}
            />
          ))}
      </ProfileGrid>
      <LoadMoreBtn
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
      {isFetchingNextPage && <ProfileTabLoader />}
    </Stack>
  )
}
