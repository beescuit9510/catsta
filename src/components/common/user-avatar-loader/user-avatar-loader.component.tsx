import { Flex, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'

export default function UserAvatarLoader({ length }: { length: number }) {
  return (
    <>
      {Array(length)
        .fill(0)
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
              <Skeleton height='12px' width='100px' />
            </VStack>
          </Flex>
        ))}
    </>
  )
}
