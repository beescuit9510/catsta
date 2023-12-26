import { Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'

export default function PostSkeleton() {
  return (
    <Stack spacing={3}>
      <SkeletonCircle size='10' />
      <Skeleton h={'450'} />
      <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
    </Stack>
  )
}
