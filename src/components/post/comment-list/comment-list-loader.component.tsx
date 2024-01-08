import { Flex, Skeleton, SkeletonCircle, Stack, VStack } from '@chakra-ui/react'

export default function CommentLisLoader({ length = 1 }: { length?: number }) {
  return (
    <Stack spacing={6} marginTop={'1rem'}>
      {Array(length)
        .fill(1)
        .map((v, idx) => (
          <Flex
            key={v + idx}
            gap={4}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <SkeletonCircle size={'3.25rem'} />
            <VStack alignItems={'flex-start'} gap={2} mx={'auto'} flex={1}>
              <Skeleton height='12px' width='150px' />
              <Skeleton height='12px' width='180px' />
            </VStack>
          </Flex>
        ))}
    </Stack>
  )
}
