import {
  Center,
  Container,
  Grid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from '@chakra-ui/react'

export default function UserLoader() {
  return (
    <Center marginTop={20}>
      <Container maxW='container.lg'>
        <Stack spacing={10}>
          <SkeletonCircle
            display={{ base: 'none', md: 'block' }}
            size={'7rem'}
          />
          <Center>
            <SkeletonCircle
              display={{ base: 'block', md: 'none' }}
              size={'7rem'}
            />
          </Center>
          <SkeletonText noOfLines={2} spacing='4' skeletonHeight='2' />
          <Grid templateColumns='repeat(3, 1fr)' gap={3}>
            {Array(11).fill(
              <Skeleton height={{ base: '7rem', md: '250px' }} />
            )}
          </Grid>
        </Stack>
      </Container>
    </Center>
  )
}
