import { Stack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import LikeGridItem from './like-grid-item.component'
import { auth } from '../../../../utils/firebase'
import ProfileTabLoader from '../../profile-tab/profile-tab-loader.component'
import MyLikeGridPlaceholder from '../../../common/placeholder/grid/like-grid/my-like-grid-placeholder.component'
import LikeGridPlaceholder from '../../../common/placeholder/grid/like-grid/like-grid-placeholder.component copy'
import useInfiniteLikes from '../../../../hooks/queries/infinite/useInfiniteLikes'
import LoadMoreBtn from '../../../common/load-more-btn/load-more-btn.component'
import ProfileGrid from '../profile-grid/profile-grid.component'

export default function LikeGrid() {
  const { userId } = useParams()
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteLikes(userId!)
  const isEmpty = data?.pages!.at(0)!.data.length === 0

  return (
    <Stack spacing={5}>
      {isEmpty &&
        (userId === auth.currentUser!.uid ? (
          <MyLikeGridPlaceholder />
        ) : (
          <LikeGridPlaceholder />
        ))}

      <ProfileGrid>
        {data?.pages
          .flatMap((page) => page.data)
          .map(({ post, like }) => (
            <LikeGridItem
              key={post.id}
              postId={post.id}
              imageURL={post.photoURL}
              likedAt={like.createdAt}
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
