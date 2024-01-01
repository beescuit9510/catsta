import { Flex, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'

// FIXME: the media query styling to be replaced with Show/Hide componenet.

export default function ProfileHeaderLoader() {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      direction={{ base: 'column', md: 'row' }}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <SkeletonCircle size={{ base: '6rem', md: '8rem' }} />

      <VStack
        alignItems={{ base: 'center', md: 'flex-start' }}
        gap={2}
        mx={'auto'}
        flex={1}
      >
        <Skeleton height='12px' width='150px' />
        <Skeleton height='12px' width='100px' />
      </VStack>
    </Flex>
  )
}
