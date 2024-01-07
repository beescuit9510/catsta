import { Text } from '@chakra-ui/react'
import GridItemHover from '../grid-item-hover/grid-item-hover.component'
import BasicDate from '../../../common/basic-date/basic-date.component'

export default function LikeGridItem({
  postId,
  imageURL,
  likedAt,
}: {
  postId: string
  imageURL: string
  likedAt: number
}) {
  return (
    <GridItemHover to={`/posts/${postId}`} src={imageURL}>
      <Text fontWeight={'500'}>
        Liked at <BasicDate date={likedAt} />
      </Text>
    </GridItemHover>
  )
}
