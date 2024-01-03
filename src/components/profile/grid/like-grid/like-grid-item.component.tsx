import { Text } from '@chakra-ui/react'
import { formatDistance, formatRelative } from 'date-fns'
import GridItemHover from '../grid-item-hover/grid-item-hover.component'

export default function LikeGridItem({
  postId,
  imageURL,
  likedAt,
}: {
  postId: string
  imageURL: string
  likedAt: number
}) {
  const twoDays = 86400000
  const twoDayyAgo = Date.now() - twoDays

  return (
    <GridItemHover to={`/posts/${postId}`} src={imageURL}>
      <Text fontWeight={'700'}>
        Liked at{' '}
        {twoDayyAgo >= likedAt
          ? formatRelative(likedAt, Date.now())
          : formatDistance(likedAt, Date.now(), {
              addSuffix: true,
            })}
      </Text>
    </GridItemHover>
  )
}
