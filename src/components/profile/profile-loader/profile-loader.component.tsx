import {
  Center,
  Container,
  Flex,
  Grid,
  Skeleton,
  SkeletonCircle,
  Stack,
  VStack,
} from '@chakra-ui/react'

// FIXME: the media query styling to be replaced with Show/Hide componenet.

export default function ProfileLoader() {
  return (
    <Center marginTop={10}>
      <Container maxW='container.lg'>
        <Flex
          gap={{ base: 4, sm: 10 }}
          py={10}
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
        <Stack spacing={10}>
          <Grid templateColumns='repeat(3, 1fr)' gap={3}>
            {Array(11)
              .fill(1)
              .map((v, idx) => (
                <Skeleton
                  key={v + idx}
                  height={{ base: '7rem', md: '250px' }}
                />
              ))}
          </Grid>
        </Stack>
      </Container>
    </Center>
  )
}
