import {
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  VStack,
} from '@chakra-ui/react'

export default function PostDetailLoader() {
  return (
    <Stack spacing={3}>
      <Flex>
        <Flex gap={4} justifyContent={'center'} alignItems={'center'}>
          <SkeletonCircle size={'3.25rem'} />
          <VStack alignItems={'flex-start'} gap={2} mx={'auto'} flex={1}>
            <Skeleton height='12px' width='150px' />
            <Skeleton height='12px' width='100px' />
          </VStack>
        </Flex>
      </Flex>
      <Skeleton h={'450'} />
      <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
    </Stack>
  )
}
